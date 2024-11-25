'use client';

import React, { useState, useRef, useEffect } from 'react';
import Sidebar from "../../../../components/sidebar";
import axios from 'axios';

// Add more sites from your CSV if needed
const CAMERA_SITES = [
    { id: "0002-A", name: "Site 0002-A", coordinate_x: 506314, coordinate_y: 17234, elevation: 279 },
    { id: "0002-B", name: "Site 0002-B", coordinate_x: 516314, coordinate_y: 160293, elevation: 308 },
];

export default function CameraTraps() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [selectedSite, setSelectedSite] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [detections, setDetections] = useState([]);
    const [siteInfo, setSiteInfo] = useState(null);
    const [error, setError] = useState(null);
    const [lastProcessedTime, setLastProcessedTime] = useState(0);
    const [lastDetectionTime, setLastDetectionTime] = useState(0);
    const DETECTION_COOLDOWN = 5000; // 5 seconds cooldown

    const processFrames = async () => {
        if (!videoRef.current || !canvasRef.current || !isRecording) return;

        const currentTime = Date.now();
        const timePassedSinceLastDetection = currentTime - lastDetectionTime;
        
        if (currentTime - lastProcessedTime < 500) {
            requestAnimationFrame(processFrames);
            return;
        }
        setLastProcessedTime(currentTime);

        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        
        const frame = canvasRef.current.toDataURL('image/jpeg', 0.8);

        try {
            if (timePassedSinceLastDetection >= DETECTION_COOLDOWN) {
                const response = await axios.post('http://localhost:8000/api/detect', { 
                    frame,
                    site_id: selectedSite
                });
                
                if (response.data.detections?.length > 0) {
                    const detection = response.data.detections[0];
                    if (detection.confidence >= 0.7) {
                        const newDetection = {
                            id: Date.now(),
                            site_id: selectedSite,
                            species: detection.species,
                            confidence: detection.confidence,
                            timestamp: new Date().toISOString(),
                            image_path: detection.image_path
                        };
                        
                        setDetections(prev => [newDetection, ...prev]);
                        setLastDetectionTime(currentTime);
                        
                        // Show cooldown notification
                        const cooldownMessage = document.getElementById('cooldownMessage');
                        if (cooldownMessage) {
                            cooldownMessage.style.display = 'block';
                            setTimeout(() => {
                                cooldownMessage.style.display = 'none';
                            }, DETECTION_COOLDOWN);
                        }
                    }
                }
            }
        } catch (err) {
            console.error('Detection error:', err);
        }

        if (isRecording) {
            requestAnimationFrame(processFrames);
        }
    };

    const startCamera = async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480 }
            });
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                
                await new Promise((resolve) => {
                    videoRef.current.onloadedmetadata = () => resolve();
                });

                await videoRef.current.play();

                if (canvasRef.current) {
                    const context = canvasRef.current.getContext('2d');
                    context.fillStyle = '#000000';
                    context.fillRect(0, 0, 640, 480);
                }

                await new Promise(resolve => {
                    setIsRecording(true);
                    setTimeout(resolve, 100);
                });

                processFrames();
            }
        } catch (err) {
            setError('Failed to access camera: ' + err.message);
        }
    };

    const stopCamera = () => {
        setIsRecording(false);
        if (videoRef.current?.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <div className="flex flex-row h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">Camera Trap Monitoring</h1>
                
                {/* Site Selection */}
                <div className="mb-6">
                    <select 
                        value={selectedSite} 
                        onChange={(e) => {
                            setSelectedSite(e.target.value);
                            const site = CAMERA_SITES.find(site => site.id === e.target.value);
                            setSiteInfo(site);
                        }}
                        className="p-2 border rounded"
                        disabled={isRecording}
                    >
                        <option value="">Select a camera site</option>
                        {CAMERA_SITES.map(site => (
                            <option key={site.id} value={site.id}>
                                {site.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Site Info */}
                {siteInfo && (
                    <div className="mb-6 p-4 bg-white rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Site Information</h2>
                        <p>Location: ({siteInfo.coordinate_x}, {siteInfo.coordinate_y})</p>
                        <p>Elevation: {siteInfo.elevation}m</p>
                    </div>
                )}

                <div className="flex gap-6">
                    {/* Camera Feed */}
                    <div className="w-1/2">
                        <div className="relative bg-black rounded overflow-hidden" style={{ minHeight: '480px' }}>
                            <video
                                ref={videoRef}
                                width={640}
                                height={480}
                                className="w-full"
                                style={{ display: isRecording ? 'block' : 'none' }}
                            />
                            <canvas
                                ref={canvasRef}
                                width={640}
                                height={480}
                                style={{ display: 'none' }}
                            />
                            {!isRecording && (
                                <div className="absolute inset-0 flex items-center justify-center text-white">
                                    Camera Off
                                </div>
                            )}
                        </div>
                        <div className="mt-4 flex gap-4">
                            <button
                                onClick={startCamera}
                                disabled={!selectedSite || isRecording}
                                className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
                            >
                                Start Camera
                            </button>
                            <button
                                onClick={stopCamera}
                                disabled={!isRecording}
                                className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-400"
                            >
                                Stop Camera
                            </button>
                        </div>
                    </div>

                    {/* Recent Detections */}
                    <div className="w-1/2">
                        <h2 className="text-xl font-semibold mb-4">Recent Detections</h2>
                        <div className="bg-white rounded shadow overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2">Time</th>
                                        <th className="px-4 py-2">Species</th>
                                        <th className="px-4 py-2">Confidence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detections.map(detection => (
                                        <tr key={detection.id} className="border-t">
                                            <td className="px-4 py-2">
                                                {new Date(detection.timestamp).toLocaleTimeString()}
                                            </td>
                                            <td className="px-4 py-2">{detection.species}</td>
                                            <td className="px-4 py-2">
                                                {(detection.confidence * 100).toFixed(1)}%
                                            </td>
                                        </tr>
                                    ))}
                                    {detections.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                                                No detections yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Cooldown Message */}
                <div 
                    id="cooldownMessage"
                    className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg hidden"
                >
                    Detection recorded! Waiting 5 seconds before next detection...
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}