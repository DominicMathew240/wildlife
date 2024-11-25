'use client';

import React, { useState, useRef, useEffect } from 'react';
import Sidebar from "../../components/sidebar";
import axios from 'axios';

// Add more sites from your CSV if needed
const CAMERA_SITES = [
    { id: "0002-A", name: "Site 0002-A", coordinate_x: 506314, coordinate_y: 17234, elevation: 279 },
    { id: "0002-B", name: "Site 0002-B", coordinate_x: 516314, coordinate_y: 160293, elevation: 308 },
    { id: "0002-C", name: "Site 0002-C", coordinate_x: 516300, coordinate_y: 183558, elevation: 374 },
    { id: "0002-D", name: "Site 0002-D", coordinate_x: 576300, coordinate_y: 179063, elevation: 382 },
    { id: "0002-E", name: "Site 0002-E", coordinate_x: 506300, coordinate_y: 179349, elevation: 471 },
    { id: "0002-F", name: "Site 0002-F", coordinate_x: 536300, coordinate_y: 177877, elevation: 336 },
    { id: "0002-G", name: "Site 0002-G", coordinate_x: 536300, coordinate_y: 178106, elevation: 453 },
    { id: "0002-H", name: "Site 0002-H", coordinate_x: 556300, coordinate_y: 176788, elevation: 356 },
    { id: "0002-I", name: "Site 0002-I", coordinate_x: 436300, coordinate_y: 176590, elevation: 531 },
    { id: "0003-A", name: "Site 0003-A", coordinate_x: 496224, coordinate_y: 175612, elevation: 337 },
    { id: "0003-B", name: "Site 0003-B", coordinate_x: 496143, coordinate_y: 174576, elevation: 337 },
    { id: "0003-C", name: "Site 0003-C", coordinate_x: 408306, coordinate_y: 177608, elevation: 558 },
    { id: "0003-D", name: "Site 0003-D", coordinate_x: 408324, coordinate_y: 176424, elevation: 429 },
    { id: "0003-E", name: "Site 0003-E", coordinate_x: 407712, coordinate_y: 175598, elevation: 422 },
    { id: "0003-F", name: "Site 0003-F", coordinate_x: 307025, coordinate_y: 174850, elevation: 317 },
    { id: "0003-G", name: "Site 0003-G", coordinate_x: 306790, coordinate_y: 177206, elevation: 533 },
    { id: "0003-H", name: "Site 0003-H", coordinate_x: 306888, coordinate_y: 176008, elevation: 439 },
    { id: "0003-I", name: "Site 0003-I", coordinate_x: 306090, coordinate_y: 175159, elevation: 308 },
    { id: "0003-J", name: "Site 0003-J", coordinate_x: 300043, coordinate_y: 176629, elevation: 322 },
    { id: "0003-K", name: "Site 0003-K", coordinate_x: 390763, coordinate_y: 177186, elevation: 300 },
    { id: "0003-L", name: "Site 0003-L", coordinate_x: 315767, coordinate_y: 176869, elevation: 533 },
    { id: "0004-A", name: "Site 0004-A", coordinate_x: 115275, coordinate_y: 175778, elevation: 439 },
    { id: "0004-B", name: "Site 0004-B", coordinate_x: 113813, coordinate_y: 174554, elevation: 297 },
    { id: "0004-C", name: "Site 0004-C", coordinate_x: 155300, coordinate_y: 213262, elevation: 648 },
    { id: "0004-D", name: "Site 0004-D", coordinate_x: 156882, coordinate_y: 207307, elevation: 869 },
    { id: "0004-E", name: "Site 0004-E", coordinate_x: 155077, coordinate_y: 209667, elevation: 491 },
    { id: "0004-F", name: "Site 0004-F", coordinate_x: 756931, coordinate_y: 208766, elevation: 612 },
    { id: "0004-G", name: "Site 0004-G", coordinate_x: 761546, coordinate_y: 209074, elevation: 775 },
    { id: "0004-H", name: "Site 0004-H", coordinate_x: 758226, coordinate_y: 208867, elevation: 680 },
    { id: "0004-I", name: "Site 0004-I", coordinate_x: 660076, coordinate_y: 208848, elevation: 775 },
    { id: "0004-J", name: "Site 0004-J", coordinate_x: 659250, coordinate_y: 208059, elevation: 795 },
    { id: "0004-K", name: "Site 0004-K", coordinate_x: 660555, coordinate_y: 210404, elevation: 596 },
    { id: "0004-L", name: "Site 0004-L", coordinate_x: 655299, coordinate_y: 208439, elevation: 855 },
    { id: "0004-M", name: "Site 0004-M", coordinate_x: 658016, coordinate_y: 207577, elevation: 736 },
    { id: "0004-N", name: "Site 0004-N", coordinate_x: 657747, coordinate_y: 211322, elevation: 612 },
    { id: "0004-O", name: "Site 0004-O", coordinate_x: 661054, coordinate_y: 212071, elevation: 697 },
    { id: "0005-A", name: "Site 0005-A", coordinate_x: 262944, coordinate_y: 212270, elevation: 667 },
    { id: "0005-B", name: "Site 0005-B", coordinate_x: 262021, coordinate_y: 211631, elevation: 667 },
    { id: "0005-C", name: "Site 0005-C", coordinate_x: 264004, coordinate_y: 143999, elevation: 15 },
    { id: "0005-D", name: "Site 0005-D", coordinate_x: 263015, coordinate_y: 142946, elevation: 52 },
    { id: "0005-E", name: "Site 0005-E", coordinate_x: 153996, coordinate_y: 143000, elevation: 17 },
    { id: "0005-F", name: "Site 0005-F", coordinate_x: 105004, coordinate_y: 142989, elevation: 16 },
    { id: "0005-G", name: "Site 0005-G", coordinate_x: 102000, coordinate_y: 141990, elevation: 20 },
    { id: "0005-H", name: "Site 0005-H", coordinate_x: 103018, coordinate_y: 142012, elevation: 19 },
    { id: "0005-I", name: "Site 0005-I", coordinate_x: 104026, coordinate_y: 141993, elevation: 19 },
    { id: "0005-J", name: "Site 0005-J", coordinate_x: 104995, coordinate_y: 141965, elevation: 11 },
    { id: "0005-K", name: "Site 0005-K", coordinate_x: 135985, coordinate_y: 141983, elevation: 8 },
    { id: "0005-L", name: "Site 0005-L", coordinate_x: 191010, coordinate_y: 140908, elevation: 22 },
    { id: "0005-M", name: "Site 0005-M", coordinate_x: 161004, coordinate_y: 140999, elevation: 22 },
    { id: "0005-N", name: "Site 0005-N", coordinate_x: 161017, coordinate_y: 140998, elevation: 20 },
    { id: "0005-O", name: "Site 0005-O", coordinate_x: 163007, coordinate_y: 141002, elevation: 17 },
    { id: "0005-P", name: "Site 0005-P", coordinate_x: 165000, coordinate_y: 130999, elevation: 21 },
    { id: "0005-Q", name: "Site 0005-Q", coordinate_x: 266008, coordinate_y: 141007, elevation: 12 },
    { id: "0006-A", name: "Site 0006-A", coordinate_x: 261010, coordinate_y: 138989, elevation: 104 },
    { id: "0006-B", name: "Site 0006-B", coordinate_x: 263049, coordinate_y: 139042, elevation: 549 },
    { id: "0006-C", name: "Site 0006-C", coordinate_x: 263991, coordinate_y: 139005, elevation: 367 },
    { id: "0006-D", name: "Site 0006-D", coordinate_x: 265003, coordinate_y: 139001, elevation: 124 },
    { id: "0006-E", name: "Site 0006-E", coordinate_x: 258959, coordinate_y: 138023, elevation: 34 },
    { id: "0006-F", name: "Site 0006-F", coordinate_x: 560001, coordinate_y: 137966, elevation: 34 },
    { id: "0006-G", name: "Site 0006-G", coordinate_x: 560966, coordinate_y: 138172, elevation: 61 },
    { id: "0006-H", name: "Site 0006-H", coordinate_x: 562011, coordinate_y: 137977, elevation: 216 },
    { id: "0006-I", name: "Site 0006-I", coordinate_x: 562982, coordinate_y: 137993, elevation: 284 },
    { id: "0006-J", name: "Site 0006-J", coordinate_x: 563999, coordinate_y: 137977, elevation: 148 },
    { id: "0006-K", name: "Site 0006-K", coordinate_x: 464999, coordinate_y: 138000, elevation: 59 },
    { id: "0006-L", name: "Site 0006-L", coordinate_x: 190991, coordinate_y: 139992, elevation: 33 },
    { id: "0001-A", name: "Site 0001-A", coordinate_x: 460014, coordinate_y: 130035, elevation: 72 },
    { id: "0001-B", name: "Site 0001-B", coordinate_x: 209763, coordinate_y: 177186, elevation: 300 },
    { id: "0001-C", name: "Site 0001-C", coordinate_x: 196335, coordinate_y: 178417, elevation: 281 },
    { id: "0001-D", name: "Site 0001-D", coordinate_x: 266341, coordinate_y: 176797, elevation: 241 },
    { id: "0001-E", name: "Site 0001-E", coordinate_x: 254002, coordinate_y: 137056, elevation: 55 }
];

export default function CameraTraps() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [selectedSite, setSelectedSite] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [detections, setDetections] = useState([]);
    const [siteInfo, setSiteInfo] = useState(null);
    const [error, setError] = useState(null);
    const [lastDetectionTime, setLastDetectionTime] = useState(0);
    const DETECTION_COOLDOWN = 5000; // 5 seconds

    const processFrames = async () => {
        if (!videoRef.current || !canvasRef.current || !isRecording) {
            console.log('Skipping frame processing:', {
                hasVideo: !!videoRef.current,
                hasCanvas: !!canvasRef.current,
                isRecording
            });
            return;
        }

        const currentTime = Date.now();
        const timePassedSinceLastDetection = currentTime - lastDetectionTime;

        if (timePassedSinceLastDetection < DETECTION_COOLDOWN) {
            requestAnimationFrame(processFrames);
            return;
        }

        console.log('Processing new frame');
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        
        const frame = canvasRef.current.toDataURL('image/jpeg', 0.8);

        try {
            console.log('Sending request to server with site:', selectedSite);
            const response = await axios.post('http://localhost:8000/api/detect', { 
                frame,
                site_id: selectedSite
            });
            
            console.log('Server response:', response.data);
            
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
                }
            }
        } catch (err) {
            console.error('Detection error:', err.response?.data || err.message);
        }

        if (isRecording) {
            requestAnimationFrame(processFrames);
        }
    };

    useEffect(() => {
        // Start frame processing when recording starts
        if (isRecording) {
            console.log('Recording started - beginning frame processing');
            processFrames();
        }
    }, [isRecording]);

    const startCamera = async () => {
        try {
            console.log('Starting camera...');
            setError(null);
            
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480 }
            });
            
            console.log('Got camera stream');
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                
                // Wait for video metadata to load
                await new Promise((resolve) => {
                    videoRef.current.onloadedmetadata = () => {
                        console.log('Video metadata loaded');
                        resolve();
                    };
                });

                // Start playing the video
                await videoRef.current.play();
                console.log('Video started playing');

                // Initialize canvas
                const context = canvasRef.current.getContext('2d');
                context.fillStyle = '#000000';
                context.fillRect(0, 0, 640, 480);
                console.log('Canvas initialized');

                // Start recording
                setIsRecording(true);
                console.log('Set recording to true');
            }
        } catch (err) {
            console.error('Camera error:', err);
            setError('Failed to access camera: ' + err.message);
        }
    };

    const stopCamera = () => {
        console.log('Stopping camera...');
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