'use client';

import React from 'react';
import Sidebar from "/../../components/sidebar"; 

function CameraTraps() {
    return (
        <div className="flex flex-row h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">Camera Trap Monitoring</h1>
                <p>Test Page</p>
            </div>
        </div>
    );
}

export default CameraTraps;