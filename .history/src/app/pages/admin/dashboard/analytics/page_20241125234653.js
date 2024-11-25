"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter } from 'recharts';
import Sidebar from "../../components/Sidebar";

export default function Analytics() {
  // Using our database detection data
  const detectionData = [
    { site_id: '0002-A', species: 'sun bear', confidence: 0.89, timestamp: '2024-11-25 14:23:15' },
    { site_id: '0002-A', species: 'bearded pig', confidence: 0.95, timestamp: '2024-11-25 15:45:32' },
    { site_id: '0002-B', species: 'marbled cat', confidence: 0.88, timestamp: '2024-11-25 16:12:45' },
    { site_id: '0002-C', species: 'sambar deer', confidence: 0.92, timestamp: '2024-11-25 17:30:21' },
    { site_id: '0002-D', species: 'binturong', confidence: 0.87, timestamp: '2024-11-25 18:45:33' },
    { site_id: '0002-E', species: 'pangolin', confidence: 0.91, timestamp: '2024-11-25 19:20:11' },
    // Add all detection data here
  ];

  const siteData = [
    { site_id: '0002-A', elevation_m: 279, forest_cover: 95, canopy_height: 35, water_occurrence: 12, distance_to_road: 0, human_population: 0 },
    { site_id: '0002-B', elevation_m: 308, forest_cover: 97, canopy_height: 43, water_occurrence: 0, distance_to_road: 0, human_population: 0 },
    // Add all site data here
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Data processing functions
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
    }));
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

  return (
    <div className="flex flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="w-full p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Wildlife Detection Analytics</h1>
        
        {/* Species Analytics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Species Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <h3 className="text-lg font-medium mb-4">Site Performance</h3>
              <BarChart width={400} height={300} data={getSiteStats()}>
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
              <h3 className="text-lg font-medium mb-4">Habitat Correlation</h3>
              <ScatterChart width={400} height={300}>
                <CartesianGrid />
                <XAxis type="number" dataKey="elevation_m" name="Elevation (m)" />
                <YAxis type="number" dataKey="detectionCount" name="Detection Count" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Sites" data={getSiteStats()} fill="#8884d8" />
              </ScatterChart>
            </div>
          </div>
        </div>

        {/* Detailed Tables */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Species Performance Metrics</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2">Species</th>
                    <th className="p-2">Total Detections</th>
                    <th className="p-2">Avg Confidence</th>
                    <th className="p-2">Sites Present</th>
                  </tr>
                </thead>
                <tbody>
                  {getSpeciesStats().map((stat, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{stat.species}</td>
                      <td className="p-2">{stat.count}</td>
                      <td className="p-2">{stat.avgConfidence}%</td>
                      <td className="p-2">{stat.siteCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Site Environment Analysis</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2">Site ID</th>
                    <th className="p-2">Elevation (m)</th>
                    <th className="p-2">Forest Cover (%)</th>
                    <th className="p-2">Canopy Height (m)</th>
                    <th className="p-2">Water Occurrence (%)</th>
                    <th className="p-2">Distance to Road (m)</th>
                    <th className="p-2">Detections</th>
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
                      <td className="p-2">{site.water_occurrence}</td>
                      <td className="p-2">{site.distance_to_road}</td>
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