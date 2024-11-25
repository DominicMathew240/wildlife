"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter } from 'recharts';
import Sidebar from "../components/sidebar";
import { createClient } from '@vercel/postgres';

export default function Analytics() {
  const [detectionData, setDetectionData] = useState([]);
  const [siteData, setSiteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = createClient();
        await client.connect();

        // Fetch detections
        const detectionsResult = await client.query(`
          SELECT * FROM detections 
          ORDER BY timestamp DESC
        `);

        // Fetch sites
        const sitesResult = await client.query(`
          SELECT * FROM sites
          ORDER BY site_id
        `);

        setDetectionData(detectionsResult.rows);
        setSiteData(sitesResult.rows);
        setLoading(false);

        await client.end();
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) {
    return (
      <div className="flex flex-row h-screen bg-gray-100">
        <Sidebar />
        <div className="w-full flex items-center justify-center">
          <div className="text-xl">Loading analytics data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-row h-screen bg-gray-100">
        <Sidebar />
        <div className="w-full flex items-center justify-center">
          <div className="text-xl text-red-500">Error loading data: {error}</div>
        </div>
      </div>
    );
  }

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