"use client";

import React, { useState } from "react";
import Sidebar from "../components/sidebar";

export default function Dashboard() {
    const [formData, setFormData] = useState({
        title: "Event Title",
        image: "http://placehold.it/770x420",
        date: "2024-10-1",
        location: "Event Location",
        description: "Event Description",
        article: ["Paragraph 1", "Paragraph 2"] // Initialize with example paragraphs
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleArticleChange = (index, value) => {
        const newArticle = [...formData.article];
        newArticle[index] = value;
        setFormData({
            ...formData,
            article: newArticle
        });
    };

    const addParagraph = () => {
        setFormData({
            ...formData,
            article: [...formData.article, ""]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/events/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Event is Published");
            } else {
                alert("Error creating event");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error creating event");
        }
    };

    return (
        <section className="flex flex-row h-screen">
            <div className="w-1/5">
                <Sidebar />
            </div>
            <div className="w-4/5 p-4 overflow-y-auto">
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <p className="text-xl font-semibold">Welcome back, Admin!</p>

                {/* Publish content to database so that the frontend can see */}
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">Title:</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">Image URL:</label>
                        <input
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">Location:</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">Description:</label>
                        <input
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700">Article:</label>
                        {formData.article.map((paragraph, index) => (
                            <textarea
                                key={index}
                                value={paragraph}
                                onChange={(e) => handleArticleChange(index, e.target.value)}
                                className="p-2 border border-gray-300 rounded-md mb-2"
                                rows="4"
                            />
                        ))}
                        <button type="button" onClick={addParagraph} className="mt-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                            Add Paragraph
                        </button>
                    </div>
                    <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Create Event</button>
                </form>
            </div>
        </section>
    );
}