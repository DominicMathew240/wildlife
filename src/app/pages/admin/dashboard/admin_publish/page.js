// Display all the content of the publish story
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// Components
import Sidebar from "../../components/sidebar";
import AddEvent from "../../components/addEvent";
import { motion, AnimatePresence } from "framer-motion";

export default function PublishStory() {
    const [events, setEvents] = useState([]);
    const [eventCount, setEventCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editEventData, setEditEventData] = useState({ title: "", date: "", description: "", location: "", article: "" });
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
      
      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
      };
      
      const modalVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            type: "spring",
            damping: 25,
            stiffness: 300
          }
        },
        exit: {
          scale: 0.8,
          opacity: 0
        }
    };

    const EventCard = ({ event, onClick }) => (
        <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            onClick={() => onClick(event)}
        >
            <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={event.img_url}
                alt={event.title}
                className="w-full h-[200px] object-cover"
            />
            <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
                    >
                        {formatDate(event.date)}
                    </motion.span>
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full"
                    >
                        {event.location}
                    </motion.span>
                </div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 line-clamp-2">{event.description}</p>
            </div>
        </motion.div>
    );

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        // Fetch all the content of the event
        axios.get("http://localhost:4000/events")
            .then(response => {
                const sortedEvents = sortEventsByDate(response.data);
                setEvents(sortedEvents);
                setEventCount(sortedEvents.length);
            })
            .catch(error => {
                console.error("Error fetching events:", error);
            });
    };

    const sortEventsByDate = (events) => {
        return events.sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchEvents(); // Refresh events after closing the modal
    };

    const openEventModal = (event) => {
        setSelectedEvent(event);
    };

    const closeEventModal = () => {
        setSelectedEvent(null);
    };

    const openEditModal = (event) => {
        setEditEventData(event);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditEventData({ ...editEventData, [name]: value });
    };

    const saveEditEvent = () => {
        const { event_id, title, date, location, description, article } = editEventData;
        const updatedEventData = { title, date: date.split('T')[0], location, description, article }; // Exclude image field
        axios.put(`http://localhost:4000/events/edit/${event_id}`, updatedEventData)
            .then(() => {
                fetchEvents();
                closeEditModal();
                window.location.reload(); // Refresh the page to get the new update
            })
            .catch(error => {
                console.error("Error saving edited event:", error);
            });
    };

    const editEvent = (event) => {
        // Implement edit functionality
        console.log("Edit event:", event);
    };

    const deleteEvent = (eventId) => {
        // Implement delete functionality
        axios.delete(`http://localhost:4000/events/delete/${eventId}`)
            .then(() => {
                fetchEvents();
                closeEventModal();
            })
            .catch(error => {
                console.error("Error deleting event:", error);
            });
    };

    const openDeleteConfirmModal = (event) => {
        setSelectedEvent(event);
        setIsDeleteConfirmOpen(true);
    };

    const closeDeleteConfirmModal = () => {
        setIsDeleteConfirmOpen(false);
    };

    const confirmDeleteEvent = () => {
        axios.delete(`http://localhost:4000/events/delete/${selectedEvent.event_id}`)
            .then(() => {
                fetchEvents();
                closeDeleteConfirmModal();
                closeEventModal();
            })
            .catch(error => {
                console.error("Error deleting event:", error);
            });
    };

    return (
        <div className="flex flex-row h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-1/5">
                <Sidebar />
            </div>
        
            <div className="gap-4 w-full max-h-screen overflow-y-auto text-black flex flex-col justify-evenly items-center p-4 mt-4">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4 w-full">
                    {[
                        { label: 'Total Event', value: eventCount },
                        { label: 'Likes', value: '120' },
                        { label: 'Comments', value: '20' },
                        { label: 'Shares', value: '10' }
                    ].map((stat) => (
                        <div className="bg-white backdrop-blur-sm bg-opacity-90 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <p className="text-gray-600">{stat.label}</p>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                
                {/* Events List */}
                <div className="bg-white backdrop-blur-sm bg-opacity-90 rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Publish Event
                        </h1>
                        <button onClick={openModal} 
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg
                                        hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-sm">
                            Add Event
                        </button>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {events.map((event) => (
                            <div key={event.event_id} 
                                className="flex gap-6 py-6 hover:bg-gray-50 transition-colors duration-200 rounded-lg p-4 cursor-pointer" 
                                onClick={() => openEventModal(event)}>
                                <img src={event.img_url} 
                                    alt={event.title} 
                                    className="w-[280px] h-[200px] object-cover rounded-xl shadow-sm" />
                                
                                <div className="flex flex-col flex-1">
                                    <div className="flex gap-4 text-gray-600 mb-3">
                                        <span className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                                strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" 
                                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            {formatDate(event.date)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                                strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" 
                                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                            </svg>
                                            New
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                    <p className="text-gray-600 line-clamp-3">{event.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[60]">
                    <div className="w-4/5 h-4/5 bg-white rounded-2xl shadow-xl p-6 overflow-hidden
                                  animate-[slideUp_0.3s_ease-out]">
                        <div className="flex justify-end">
                            <button onClick={closeModal} 
                                    className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" 
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                          d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <AddEvent onEventAdded={fetchEvents} closeModal={closeModal} />
                    </div>
                </div>
            )}

            {/* Modal for displaying full event write-up */}
            {selectedEvent && (
               <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[50]">
                    <div className="w-4/5 h-4/5 bg-white/95 rounded-2xl shadow-2xl p-8 overflow-y-auto relative">
                        {/* Move close button to top-right */}
                        <button 
                            onClick={closeEventModal} 
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 
                                    transition-colors duration-200 rounded-full hover:bg-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="space-y-8 pt-6">
                            {/* Header with increased button spacing */}
                            <div className="flex justify-between items-start">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 
                                            bg-clip-text text-transparent">
                                    {selectedEvent.title}
                                </h2>
                                
                                <div className="flex gap-6"> {/* Increased gap between buttons */}
                                    <button 
                                        onClick={() => openEditModal(selectedEvent)} 
                                        className="px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-500 
                                                text-white rounded-lg hover:from-amber-500 hover:to-amber-600 
                                                transition-all duration-300 shadow-sm hover:shadow-md 
                                                flex items-center gap-3"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => openDeleteConfirmModal(selectedEvent)} 
                                        className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 
                                                text-white rounded-lg hover:from-red-600 hover:to-red-700 
                                                transition-all duration-300 shadow-sm hover:shadow-md 
                                                flex items-center gap-3"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <img src={selectedEvent.img_url} 
                                        alt={selectedEvent.title} 
                                        className="w-full aspect-video object-cover rounded-xl shadow-md hover:shadow-xl 
                                                transition-all duration-300 cursor-pointer" />
                                    
                                    <div className="flex gap-4 text-gray-600">
                                        <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {formatDate(selectedEvent.date)}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                                        <p className="text-gray-600">{selectedEvent.description}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Details</h3>
                                        <div className="prose prose-gray max-w-none">
                                            {selectedEvent.article.split('\n').map((line, index) => (
                                                <p key={index} className="text-gray-600 leading-relaxed">{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for editing event */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[70]">
                    <div className="w-4/5 h-4/5 bg-white/95 rounded-2xl shadow-2xl p-8 overflow-y-auto relative">
                        {/* Close Button */}
                        <button 
                            onClick={closeEditModal} 
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 
                                    transition-colors duration-200 rounded-full hover:bg-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="space-y-8 pt-6">
                            {/* Header */}
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                Edit Event
                            </h2>

                            {/* Two Column Layout */}
                            <div className="grid grid-cols-2 gap-8">
                                {/* Left Column - Image and Basic Info */}
                                <div className="space-y-6">
                                    <div className="relative group">
                                        <img 
                                            src={editEventData.img_url || "https://placehold.co/200x200"} 
                                            alt="Event" 
                                            className="w-full aspect-video object-cover rounded-xl shadow-md hover:shadow-xl 
                                                    transition-all duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                                                    transition-opacity duration-200 rounded-xl flex items-center justify-center">
                                            <span className="text-white text-sm">Image cannot be changed</span>
                                        </div>
                                    </div>

                                    {/* Basic Info Fields */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={editEventData.title}
                                                onChange={handleEditChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                                                        focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="Enter event title"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={editEventData.date}
                                                    onChange={handleEditChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                                                            focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={editEventData.location}
                                                    onChange={handleEditChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                                                            focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                    placeholder="Enter location"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Description and Article */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                            <span className="text-gray-400 ml-2">
                                                ({editEventData.description.length}/500 characters)
                                            </span>
                                        </label>
                                        <textarea
                                            name="description"
                                            value={editEventData.description}
                                            onChange={handleEditChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                                                    focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter event description"
                                            rows="4"
                                            maxLength={500}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Article Content
                                            <span className="text-gray-400 ml-2">
                                                (Split paragraphs with new lines)
                                            </span>
                                        </label>
                                        <textarea
                                            name="article"
                                            value={editEventData.article}
                                            onChange={handleEditChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                                                    focus:ring-blue-500 focus:border-transparent transition-all duration-200 
                                                    font-mono text-sm"
                                            placeholder="Enter detailed article content..."
                                            rows="12"
                                        />
                                        <div className="mt-2 text-sm text-gray-500">
                                            {editEventData.article.split('\n').length} paragraphs
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end space-x-4">
                                <button 
                                    onClick={closeEditModal}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg 
                                            hover:bg-gray-50 transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={saveEditEvent} 
                                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 
                                            text-white rounded-lg hover:from-blue-600 hover:to-blue-700 
                                            transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for delete confirmation */}
            {isDeleteConfirmOpen && selectedEvent && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[80]">
                    <div className="w-1/3 bg-white rounded-lg shadow-lg p-4">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete the event titled <strong>{selectedEvent?.title}</strong>?</p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button onClick={closeDeleteConfirmModal} className="p-2 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                                Cancel
                            </button>
                            <button onClick={confirmDeleteEvent} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}