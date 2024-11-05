"use client";

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import Header from "../../components/Header";

export default function Interactive() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    // Replace with your local Flask server URL
    const backendUrl = 'http://localhost:5000/predict';

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      {/* Interactive map for visualization of wildlife in Borneo */}
      <div className="flex-grow flex justify-center items-center mt-2">
        <MapContainer center={[1.496, 113.619]} zoom={7} style={{ height: "90vh", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[1.5, 113.6]}>
            <Popup>Orangutan</Popup>
          </Marker>
          <Marker position={[1.7, 114.0]}>
            <Popup>Proboscis Monkey</Popup>
          </Marker>
          <Marker position={[1.3, 113.2]}>
            <Popup>Pygmy Elephant</Popup>
          </Marker>
          <Polygon positions={[[1.4, 113.5], [1.6, 113.5], [1.6, 113.7], [1.4, 113.7]]} />
          <Polygon positions={[[1.6, 113.8], [1.8, 113.8], [1.8, 114.0], [1.6, 114.0]]} />
        </MapContainer>
      </div>

      {/* Image input for classifying species */}
      <div className="flex justify-center items-center py-10 bg-gray-200">
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Upload Image for Classification</h2>
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" className="w-full p-2 border border-gray-300 rounded-md mb-4" onChange={handleFileChange} />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">Classify</button>
          </form>
          {prediction && (
            <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md">
              <p>Prediction: {prediction}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}