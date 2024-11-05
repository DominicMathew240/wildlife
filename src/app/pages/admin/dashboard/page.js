"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Sidebar from "../components/sidebar";

export default function Dashboard() {
    const [mapCenter, setMapCenter] = useState([1.496, 113.619]); // Center of Borneo
    const [zoomLevel, setZoomLevel] = useState(7);
    const [pinpoints, setPinpoints] = useState([]);

    // Sample wildlife data
    const wildlifeLocations = [
        { id: 1, name: "Orangutan", position: [1.5, 113.6] },
        { id: 2, name: "Proboscis Monkey", position: [1.7, 114.0] },
        { id: 3, name: "Pygmy Elephant", position: [1.3, 113.2] },
    ];

    // Sample region data
    const regions = [
        { id: 1, name: "Region 1", positions: [[1.4, 113.5], [1.6, 113.5], [1.6, 113.7], [1.4, 113.7]] },
        { id: 2, name: "Region 2", positions: [[1.6, 113.8], [1.8, 113.8], [1.8, 114.0], [1.6, 114.0]] },
    ];

    function MapEvents() {
        useMapEvents({
            click: (event) => {
                const newPinpoint = {
                    id: pinpoints.length + 1,
                    position: [event.latlng.lat, event.latlng.lng],
                };
                setPinpoints([...pinpoints, newPinpoint]);
            },
            moveend: (event) => {
                setMapCenter(event.target.getCenter());
            },
            zoomend: (event) => {
                setZoomLevel(event.target.getZoom());
            }
        });
        return null;
    }

    return (
        <div className="">
            {/* Interactive map for visualization of wildlife in Borneo */}
            <div className="flex flex-row h-screen bg-gray-100">
                <Sidebar />
                <div className="w-full p-4 flex justify-center items-center">
                    <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: "90%", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {wildlifeLocations.map(location => (
                            <Marker key={location.id} position={location.position}>
                                <Popup>{location.name}</Popup>
                            </Marker>
                        ))}
                        {regions.map(region => (
                            <Polygon key={region.id} positions={region.positions}>
                                <Popup>{region.name}</Popup>
                            </Polygon>
                        ))}
                        {pinpoints.map(pinpoint => (
                            <Marker key={pinpoint.id} position={pinpoint.position}>
                                <Popup>Pinpoint {pinpoint.id}</Popup>
                            </Marker>
                        ))}
                        <MapEvents />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}