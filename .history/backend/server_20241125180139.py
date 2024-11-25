# Add these imports at the top
import os
from datetime import datetime
import shutil

# Add this after your FastAPI app initialization
DETECTIONS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'detections')
os.makedirs(DETECTIONS_DIR, exist_ok=True)

# Modify your detect_species endpoint to save images
@app.post("/api/detect")
async def detect_species(frame_data: Frame):
    try:
        # Decode frame
        frame = decode_frame(frame_data.frame)
        if frame is None:
            raise HTTPException(status_code=400, detail="Invalid frame data")
        
        # Convert to PIL Image
        image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        
        print("Running species classification...")
        # Get prediction
        prediction = model.predict_image(image)
        
        # Use a higher confidence threshold
        CONFIDENCE_THRESHOLD = 0.7
        
        if prediction['confidence'] < CONFIDENCE_THRESHOLD:
            print(f"Confidence {prediction['confidence']:.2f} below threshold {CONFIDENCE_THRESHOLD}")
            return {'detections': []}
        
        # Save the frame if confidence threshold is met
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        image_filename = f"{prediction['species']}_{timestamp}.jpg"
        image_path = os.path.join(DETECTIONS_DIR, image_filename)
        cv2.imwrite(image_path, frame)
        
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
            'image_path': f'/detections/{image_filename}',  # Path relative to public directory
            'yolo_confidence': 1.0
        }
        
        print(f"Detected: {prediction['species']} with confidence {prediction['confidence']:.2f}")
        return {'detections': [detection]}
        
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))