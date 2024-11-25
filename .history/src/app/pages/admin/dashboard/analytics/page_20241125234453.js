"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import Sidebar from "../../components/sidebar";

export default function Analytics() {
  const detectionData = [
    { site_id: '0002-A', species: 'sun bear', confidence: 0.89, timestamp: '2024-11-25 14:23:15' },
    { site_id: '0002-A', species: 'bearded pig', confidence: 0.95, timestamp: '2024-11-25 15:45:32' },
    { site_id: '0002-B', species: 'marbled cat', confidence: 0.88, timestamp: '2024-11-25 16:12:45' }
  ];

  const speciesCount = detectionData.reduce((acc, det) => {
    acc[det.species] = (acc[det.species] || 0) + 1;
    return acc;
  }, {});

  const speciesData = Object.entries(speciesCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="flex flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="w-full p-6">
        <h1 className="text-2xl font-bold mb-6">Detection Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Top Species Detected</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={speciesData}
                cx={200}
                cy={150}
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {speciesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Recent Detections</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2">Species</th>
                    <th className="p-2">Site</th>
                    <th className="p-2">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {detectionData.slice(0, 5).map((det, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{det.species}</td>
                      <td className="p-2">{det.site_id}</td>
                      <td className="p-2">{(det.confidence * 100).toFixed(1)}%</td>
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