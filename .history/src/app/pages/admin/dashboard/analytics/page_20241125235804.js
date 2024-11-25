"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter } from 'recharts';
import Sidebar from "../../components/sidebar";
import { createClient } from '@vercel/postgres';


export default function Analytics() {
  // Mock data matching our database schema
  const detectionData = [
    { site_id: '0002-A', species: 'sun bear', confidence: 0.89, timestamp: '2024-11-20 14:23:15' },
    { site_id: '0002-A', species: 'bearded pig', confidence: 0.95, timestamp: '2024-11-25 15:45:32' },
    { site_id: '0002-B', species: 'marbled cat', confidence: 0.88, timestamp: '2024-11-23 16:12:45' },
    { site_id: '0002-C', species: 'sambar deer', confidence: 0.92, timestamp: '2024-11-22 17:30:21' },
    { site_id: '0002-D', species: 'binturong', confidence: 0.87, timestamp: '2024-11-22 18:45:33' },
    { site_id: '0003-A', species: 'sun bear', confidence: 0.91, timestamp: '2024-11-24 19:15:42' },
    { site_id: '0003-B', species: 'pangolin', confidence: 0.86, timestamp: '2024-11-24 20:1:18' },
    { site_id: '0003-C', species: 'leopard cat', confidence: 0.93, timestamp: '2024-11-25 21:35:44' },
    { site_id: '0003-D', species: 'leopard cat', confidence: 0.89, timestamp: '2024-11-25 22:45:12' },
    { site_id: '0004-A', species: 'malayan civet', confidence: 0.90, timestamp: '2024-11-25 23:15:33' },
    { site_id: '0004-B', species: 'pig-tailed macaque', confidence: 0.88, timestamp: '2024-11-26 00:25:42' },
    { site_id: '0004-C', species: 'sun bear', confidence: 0.92, timestamp: '2024-11-26 01:35:18' },
    { site_id: '0004-D', species: 'bearded pig', confidence: 0.94, timestamp: '2024-11-26 02:45:55' },
    { site_id: '0005-A', species: 'marbled cat', confidence: 0.87, timestamp: '2024-11-26 03:15:22' },
    { site_id: '0005-B', species: 'binturong', confidence: 0.89, timestamp: '2024-11-26 04:25:44' },
    { site_id: '0005-C', species: 'sambar deer', confidence: 0.93, timestamp: '2024-11-26 05:35:16' },
    { site_id: '0006-A', species: 'leopard cat', confidence: 0.90, timestamp: '2024-11-26 06:15:33' },
    { site_id: '0006-B', species: 'malayan civet', confidence: 0.88, timestamp: '2024-11-26 07:25:47' },
    { site_id: '0006-C', species: 'sun bear', confidence: 0.91, timestamp: '2024-11-26 08:35:19' },
    { site_id: '0001-A', species: 'bearded pig', confidence: 0.89, timestamp: '2024-11-26 09:15:28' },
    { site_id: '0001-B', species: 'binturong', confidence: 0.92, timestamp: '2024-11-26 10:25:45' },
    { site_id: '0001-C', species: 'marbled cat', confidence: 0.90, timestamp: '2024-11-26 11:35:12' }
];

const siteData = [
    { site_id: '0002-A', elevation_m: 279, forest_cover: 95, canopy_height: 35, water_occurrence: 12, distance_to_road: 0, human_population: 0 },
    { site_id: '0002-B', elevation_m: 308, forest_cover: 97, canopy_height: 43, water_occurrence: 0, distance_to_road: 0, human_population: 0 },
    { site_id: '0002-C', elevation_m: 374, forest_cover: 93, canopy_height: 41, water_occurrence: 0, distance_to_road: 1414.213501, human_population: 0 },
    { site_id: '0002-D', elevation_m: 382, forest_cover: 97, canopy_height: 39, water_occurrence: 0, distance_to_road: 2000, human_population: 0 },
    { site_id: '0002-E', elevation_m: 471, forest_cover: 93, canopy_height: 37, water_occurrence: 0, distance_to_road: 1000, human_population: 0 },
    { site_id: '0003-A', elevation_m: 337, forest_cover: 98, canopy_height: 44, water_occurrence: 0, distance_to_road: 2828.427002, human_population: 0 },
    { site_id: '0003-B', elevation_m: 337, forest_cover: 98, canopy_height: 44, water_occurrence: 0, distance_to_road: 2000, human_population: 0 },
    { site_id: '0003-C', elevation_m: 558, forest_cover: 95, canopy_height: 44, water_occurrence: 0, distance_to_road: 0, human_population: 0 },
    { site_id: '0003-D', elevation_m: 429, forest_cover: 98, canopy_height: 40, water_occurrence: 0, distance_to_road: 0, human_population: 0 },
    { site_id: '0004-A', elevation_m: 439, forest_cover: 98, canopy_height: 41, water_occurrence: 0, distance_to_road: 0, human_population: 0 },
    { site_id: '0004-B', elevation_m: 297, forest_cover: 98, canopy_height: 38, water_occurrence: 0, distance_to_road: 1000, human_population: 0 },
    { site_id: '0004-C', elevation_m: 648, forest_cover: 94, canopy_height: 34, water_occurrence: 0, distance_to_road: 0, human_population: 0 },
    { site_id: '0004-D', elevation_m: 869, forest_cover: 92, canopy_height: 40, water_occurrence: 0, distance_to_road: 2828.427002, human_population: 0 },
    { site_id: '0005-A', elevation_m: 667, forest_cover: 98, canopy_height: 42, water_occurrence: 0, distance_to_road: 0, human_population: 0 },
    { site_id: '0005-B', elevation_m: 667, forest_cover: 98, canopy_height: 42, water_occurrence: 0, distance_to_road: 0, human_population: 0 },
    { site_id: '0005-C', elevation_m: 15, forest_cover: 92, canopy_height: 20, water_occurrence: 0, distance_to_road: 4472.13623, human_population: 0 },
    { site_id: '0006-A', elevation_m: 104, forest_cover: 89, canopy_height: 19, water_occurrence: 0, distance_to_road: 1000, human_population: 0 },
    { site_id: '0006-B', elevation_m: 549, forest_cover: 94, canopy_height: 30, water_occurrence: 0, distance_to_road: 1000, human_population: 0 },
    { site_id: '0006-C', elevation_m: 367, forest_cover: 91, canopy_height: 28, water_occurrence: 0, distance_to_road: 1000, human_population: 7.454078674 },
    { site_id: '0001-A', elevation_m: 72, forest_cover: 93, canopy_height: 23, water_occurrence: 0, distance_to_road: 0, human_population: 3.773095846 },
    { site_id: '0001-B', elevation_m: 300, forest_cover: 92, canopy_height: 37, water_occurrence: 0, distance_to_road: 3605.55127, human_population: 0 },
    { site_id: '0001-C', elevation_m: 281, forest_cover: 95, canopy_height: 31, water_occurrence: 0, distance_to_road: 2236.068115, human_population: 0 }
];

  const getSpeciesStats = () => {
    const stats = {};
    detectionData.forEach(det => {
      if (!stats[det.species]) {
        stats[det.species] = {
          count: 0,
          avgConfidence: 0,
          sites: new Set()
        };
      }
      stats[det.species].count++;
      stats[det.species].avgConfidence += det.confidence;
      stats[det.species].sites.add(det.site_id);
    });

    return Object.entries(stats).map(([species, data]) => ({
      species,
      count: data.count,
      avgConfidence: (data.avgConfidence / data.count * 100).toFixed(1),
      siteCount: data.sites.size
    })).sort((a, b) => b.count - a.count);
  };

  const getSiteStats = () => {
    return siteData.map(site => ({
      ...site,
      detectionCount: detectionData.filter(d => d.site_id === site.site_id).length,
      uniqueSpecies: new Set(detectionData.filter(d => d.site_id === site.site_id).map(d => d.species)).size
    }));
  };

  const getTimeSeriesData = () => {
    const timeData = {};
    detectionData.forEach(det => {
      const date = new Date(det.timestamp).toLocaleDateString();
      timeData[date] = (timeData[date] || 0) + 1;
    });
    return Object.entries(timeData)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="flex flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="w-full p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Wildlife Detection Analytics</h1>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Detections</h3>
            <p className="text-2xl font-bold">{detectionData.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Active Sites</h3>
            <p className="text-2xl font-bold">{siteData.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Unique Species</h3>
            <p className="text-2xl font-bold">{new Set(detectionData.map(d => d.species)).size}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Avg Confidence</h3>
            <p className="text-2xl font-bold">
              {(detectionData.reduce((acc, det) => acc + det.confidence, 0) / detectionData.length * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Species Distribution</h3>
            <PieChart width={400} height={300}>
              <Pie
                data={getSpeciesStats()}
                cx={200}
                cy={150}
                labelLine={false}
                outerRadius={100}
                dataKey="count"
                nameKey="species"
                label={({ species, percent }) => `${species} (${(percent * 100).toFixed(0)}%)`}
              >
                {getSpeciesStats().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Detection Timeline</h3>
            <LineChart width={400} height={300} data={getTimeSeriesData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Site Activity</h3>
            <BarChart width={400} height={300} data={getSiteStats().slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="site_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="detectionCount" fill="#8884d8" name="Detections" />
              <Bar dataKey="uniqueSpecies" fill="#82ca9d" name="Unique Species" />
            </BarChart>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Habitat Analysis</h3>
            <ScatterChart width={400} height={300}>
              <CartesianGrid />
              <XAxis type="number" dataKey="elevation_m" name="Elevation (m)" />
              <YAxis type="number" dataKey="detectionCount" name="Detection Count" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Sites" data={getSiteStats()} fill="#8884d8" />
            </ScatterChart>
          </div>
        </div>

        {/* Detailed Tables */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Latest Detections</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2">Time</th>
                    <th className="p-2">Site</th>
                    <th className="p-2">Species</th>
                    <th className="p-2">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {detectionData.slice(0, 10).map((detection, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{new Date(detection.timestamp).toLocaleString()}</td>
                      <td className="p-2">{detection.site_id}</td>
                      <td className="p-2">{detection.species}</td>
                      <td className="p-2">{(detection.confidence * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Site Performance</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2">Site ID</th>
                    <th className="p-2">Elevation (m)</th>
                    <th className="p-2">Forest Cover (%)</th>
                    <th className="p-2">Canopy Height (m)</th>
                    <th className="p-2">Total Detections</th>
                    <th className="p-2">Unique Species</th>
                  </tr>
                </thead>
                <tbody>
                  {getSiteStats().map((site, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{site.site_id}</td>
                      <td className="p-2">{site.elevation_m}</td>
                      <td className="p-2">{site.forest_cover}</td>
                      <td className="p-2">{site.canopy_height}</td>
                      <td className="p-2">{site.detectionCount}</td>
                      <td className="p-2">{site.uniqueSpecies}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}