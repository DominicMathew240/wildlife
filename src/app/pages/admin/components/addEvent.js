"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddEvent({ onEventAdded, closeModal }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    const [formData, setFormData] = useState({
        title: "",
        image: "http://placehold.it/770x420",
        img_url: "http://placehold.it/770x420",
        date: new Date().toISOString().split('T')[0],
        location: "",
        description: "",
        article: [""], 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleArticleChange = (index, value) => {
        setFormData(prev => ({
            ...prev,
            article: prev.article.map((p, i) => i === index ? value : p)
        }));
    };

    const addParagraph = () => {
        setFormData(prev => ({
            ...prev,
            article: [...prev.article, ""]
        }));
    };

    const removeParagraph = (index) => {
        setFormData(prev => ({
            ...prev,
            article: prev.article.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:4000/events/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                onEventAdded();
                closeModal();
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const sections = ["Basic Info", "Media", "Content"];
    
    return (
        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto">
            {/* Progress Bar */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 border-b">
                <div className="flex justify-between mb-4">
                    {sections.map((section, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveSection(idx)}
                            className={`flex-1 py-2 px-4 ${
                                activeSection === idx 
                                    ? "border-b-2 border-blue-500 text-blue-600"
                                    : "text-gray-500"
                            }`}
                        >
                            {section}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 space-y-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {activeSection === 0 && (
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Event Title</label>
                                        <input
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                                                     focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter event title"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                                                     focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Location</label>
                                        <input
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                                                     focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter location"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Description
                                            <span className="text-gray-400 text-xs ml-2">
                                                ({formData.description.length}/500)
                                            </span>
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            maxLength={500}
                                            rows={4}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                                                     focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter event description"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 1 && (
                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <input
                                        type="url"
                                        name="img_url"
                                        value={formData.img_url}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                                                 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter image URL"
                                    />
                                    {formData.img_url && (
                                        <img
                                            src={formData.img_url}
                                            alt="Preview"
                                            className="mt-4 max-h-48 mx-auto rounded-lg shadow-md"
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {activeSection === 2 && (
                            <div className="space-y-4">
                                {formData.article.map((paragraph, index) => (
                                    <div key={index} className="relative group">
                                        <div className="absolute -left-8 top-2 text-sm text-gray-400">
                                            ¶{index + 1}
                                        </div>
                                        <textarea
                                            value={paragraph}
                                            onChange={(e) => handleArticleChange(index, e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                                                     focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            rows="4"
                                            placeholder={`Paragraph ${index + 1}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeParagraph(index)}
                                            className="absolute -right-12 top-2 opacity-0 group-hover:opacity-100 
                                                     transition-opacity duration-200 text-red-500 hover:text-red-600"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addParagraph}
                                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg 
                                             text-gray-500 hover:text-gray-700 hover:border-gray-400 
                                             transition-all duration-200"
                                >
                                    Add Paragraph
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm p-4 border-t mt-8">
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg 
                                     hover:bg-gray-50 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 
                                      text-white rounded-lg hover:from-blue-600 hover:to-blue-700 
                                      transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Publishing...' : 'Publish Event'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}