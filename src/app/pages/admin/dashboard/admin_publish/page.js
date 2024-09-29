// Display all the content of the publish story
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// Components
import Sidebar from "../../components/sidebar";
import AddEvent from "../../components/addEvent";

export default function PublishStory() {
    const [events, setEvents] = useState([]);
    const [eventCount, setEventCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchEvents(); // Refresh events after closing the modal
    };

    return (
        <div className="flex flex-row h-screen">
            <div className="w-1/5">
                <Sidebar />
            </div>
        
            <div className="gap-4 w-full max-h-screen overflow-y-auto text-black flex flex-col justify-evenly items-center p-4 mt-4">
                
                {/* 2 row box, display number of publish story and likes */}
                <div className="flex flex-row justify-evenly items-center gap-4 w-full">
                    <div className="flex bg-gray-200 p-4 rounded-md flex-col items-center">
                        <p className="text-xl">Total Event:  <span className="font-bold">{eventCount}</span></p>
                    </div>
                    <div className="flex bg-gray-200 p-4 rounded-md flex-col items-center">
                        <p className="text-xl">Likes: <span className="font-bold">120</span></p>
                    </div>
                    <div className="flex bg-gray-200 p-4 rounded-md flex-col items-center">
                        <p className="text-xl">Comments: <span className="font-bold">20</span></p>
                    </div>
                    <div className="flex bg-gray-200 p-4 rounded-md flex-col items-center">
                        <p className="text-xl">Shares: <span className="font-bold">10</span></p>
                    </div>
                </div>

                
                <div className="flex flex-row justify-between w-full mt-4">
                    <h1 className="text-2xl font-bold">Publish Event</h1>
                    <button onClick={openModal} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Add Event
                    </button>
                </div>

                {events.map((event) => (
                    <div key={event.event_id} className="flex flex-row justify-evenly items-center w-full my-4 pt-6">
                        <img className="object-cover" src="https://placehold.co/200x200" alt="Logo" width={200} height={200} />
                        <div className="flex flex-col justify-center items-start w-1/2 ml-4">

                            {/* Event Header */}
                            <div className="flex flex-row mb-2">
                                <p className="text-md text-center mr-4 flex flex-row">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    {event.date}
                                </p>
                                <p className="text-md text-center flex flex-row">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    New
                                </p>
                            </div>

                            <h3 className="mb-4 font-extrabold text-xl text-center">{event.title}</h3>
                            <p className="text-sm">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for publishing new event */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="w-4/5 h-4/5 bg-white rounded-lg shadow-lg">
                        <button onClick={closeModal} className="p-2 text-black rounded-md hover:text-red-600">
                            X
                        </button>
                        <AddEvent onEventAdded={fetchEvents} closeModal={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
}