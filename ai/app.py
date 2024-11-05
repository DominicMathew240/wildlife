from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from torchvision import transforms
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model_path = 'best_model.pth'

try:
    model = torch.load(model_path, map_location=device)
    if isinstance(model, torch.nn.Module):
        print("Model loaded successfully")
    else:
        print("Loaded object is not a torch.nn.Module. It might be a state dictionary.")
        # If it's a state dictionary, you need to load it into a model architecture
        # Example for ResNet18:
        from torchvision import models
        model = models.resnet18()
        model.load_state_dict(model)
        model.to(device)
        print("State dictionary loaded into model architecture successfully")
except FileNotFoundError:
    print(f"Model file not found at path: {model_path}")
except Exception as e:
    print(f"An error occurred while loading the model: {e}")

current_file_path = os.path.abspath(__file__)
print(f"Current file path: {current_file_path}")

# Define the image transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Frontend to test the model with input image
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        img_bytes = file.read()
        image = Image.open(io.BytesIO(img_bytes))
        image = transform(image).unsqueeze(0).to(device)

        with torch.no_grad():
            output = model(image)
            _, predicted = torch.max(output, 1)

        # Map the prediction to the class name
        # class_names = ['bearded_pig', 'malaysian_civet']  # Replace with your class names
        # 112 is the index of the class name in the bearded_pig

        # 638 is the index of the class name in the bearded_pig

        prediction = predicted.item()

        print(prediction)

        return jsonify({'prediction': prediction})

    return '''
    <!doctype html>
    <title>Animal Classifier</title>
    <h1>Upload an image</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''

# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    img_bytes = file.read()
    image = Image.open(io.BytesIO(img_bytes))
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(image)
        _, predicted = torch.max(output, 1)

    # Map the prediction to the class name
    class_names = ['bearded_pig', 'malaysian_civet']  # Replace with your class names
    prediction = class_names[predicted.item()]

    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)