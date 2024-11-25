from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import base64
import cv2
import numpy as np
from PIL import Image
import timm
import torchvision.transforms as transforms
import json
import os
from datetime import datetime
import shutil

# Initialize FastAPI app
app = FastAPI()

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup paths
BASE_DIR = os.path.dirname(__file__)
MODELS_DIR = os.path.join(BASE_DIR, 'models')
DETECTIONS_DIR = os.path.join(os.path.dirname(BASE_DIR), 'public', 'detections')

# Create detections directory if it doesn't exist
os.makedirs(DETECTIONS_DIR, exist_ok=True)

class WildlifeClassifier:
    def __init__(self, model_path, config_path):
        """Initialize the EfficientNet-B2 classifier"""
        # Initialize the model architecture for 38 classes
        self.model = timm.create_model('tf_efficientnet_b2', 
                                     pretrained=False, 
                                     num_classes=38)
        
        # Load trained weights
        state_dict = torch.load(model_path, map_location='cpu', weights_only=True)
        state_dict = {k.replace('model.', ''): v for k, v in state_dict.items()}
        self.model.load_state_dict(state_dict)
        self.model.eval()
        
        # Load class mapping
        with open(config_path, 'r') as f:
            self.config = json.load(f)
        self.idx_to_species = {v: k for k, v in self.config['species_to_idx'].items()}
        
        # Setup image transforms
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

    def center_crop_with_scale(self, image, scale=0.8):
        """Crop the central portion of the image"""
        width, height = image.size
        new_width = int(width * scale)
        new_height = int(height * scale)
        
        left = (width - new_width) // 2
        top = (height - new_height) // 2
        right = left + new_width
        bottom = top + new_height
        
        return image.crop((left, top, right, bottom))
    
    def predict_image(self, image):
        """Predict species from a PIL Image"""
        # Center crop the image
        cropped_image = self.center_crop_with_scale(image)
        
        # Transform image
        img_tensor = self.transform(cropped_image).unsqueeze(0)
        
        with torch.no_grad():
            # Get model predictions
            outputs = self.model(img_tensor)
            probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
            
            # Get top predictions
            confidence, class_idx = torch.max(probabilities, dim=0)
            species = self.idx_to_species[int(class_idx)]
            
            # Get top 3 predictions for logging
            top_confidences, top_indices = torch.topk(probabilities, k=3)
            print("\nTop 3 predictions:")
            for conf, idx in zip(top_confidences, top_indices):
                pred_species = self.idx_to_species[int(idx)]
                print(f"{pred_species}: {float(conf):.3f}")
            
            return {
                'species': species,
                'confidence': float(confidence)
            }

def setup_model():
    """Setup the Wildlife classifier model"""
    print("Setting up model...")
    
    model_path = os.path.join(MODELS_DIR, 'final_model.pth')
    config_path = os.path.join(MODELS_DIR, 'model_config.json')
    
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}")
    if not os.path.exists(config_path):
        raise FileNotFoundError(f"Config file not found at {config_path}")
    
    try:
        model = WildlifeClassifier(model_path, config_path)
        print("Wildlife classifier loaded successfully!")
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        raise

print("Loading model...")
try:
    model = setup_model()
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error during initialization: {str(e)}")
    raise

class Frame(BaseModel):
    frame: str
    site_id: str = None  # Optional site ID for tracking camera location

def decode_frame(frame_data: str) -> np.ndarray:
    """Decode base64 frame data to numpy array"""
    try:
        if ',' in frame_data:
            frame_data = frame_data.split(',')[1]
        img_bytes = base64.b64decode(frame_data)
        nparr = np.frombuffer(img_bytes, np.uint8)
        return cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    except Exception as e:
        print(f"Error decoding frame: {str(e)}")
        return None

def save_detection_image(frame: np.ndarray, species: str, confidence: float, site_id: str = None) -> str:
    """Save detection image and return relative path"""
    try:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        site_prefix = f"{site_id}_" if site_id else ""
        filename = f"{site_prefix}{species}_{confidence:.2f}_{timestamp}.jpg"
        filepath = os.path.join(DETECTIONS_DIR, filename)
        
        # Ensure the directory exists
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        # Save the image
        cv2.imwrite(filepath, frame)
        
        # Return the relative path for database storage
        return f'/detections/{filename}'
    except Exception as e:
        print(f"Error saving detection image: {str(e)}")
        return None

@app.post("/api/detect")
async def detect_species(frame_data: Frame):
    """Detect species in frame and save results"""
    try:
        global last_detection_time
        current_time = time.time()
        
        # Check if we're still in cooldown period
        if current_time - last_detection_time < DETECTION_COOLDOWN:
            return {'detections': []}
            
        # Decode frame
        frame = decode_frame(frame_data.frame)
        if frame is None:
            raise HTTPException(status_code=400, detail="Invalid frame data")
        
        # Convert to PIL Image
        image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        
        # Get prediction
        prediction = model.predict_image(image)
        
        # Use a higher confidence threshold
        CONFIDENCE_THRESHOLD = 0.7
        
        if prediction['confidence'] < CONFIDENCE_THRESHOLD:
            return {'detections': []}
        
        # Update last detection time
        last_detection_time = current_time
        
        # Save the detection image
        image_path = save_detection_image(
            frame, 
            prediction['species'], 
            prediction['confidence'],
            frame_data.site_id
        )
        
        # Format response
        frame_height, frame_width = frame.shape[:2]
        detection = {
            'box': {
                'x': int(frame_width * 0.1),
                'y': int(frame_height * 0.1),
                'width': int(frame_width * 0.8),
                'height': int(frame_height * 0.8)
            },
            'species': prediction['species'],
            'confidence': prediction['confidence'],
            'image_path': image_path,
            'site_id': frame_data.site_id,
            'timestamp': datetime.now().isoformat(),
            'yolo_confidence': 1.0
        }
        
        return {'detections': [detection]}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)