"use client";

import { React, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StickyHeader from "../../components/StickyHeader";

export default function Event() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/events")
            .then((response) => {
                const data = response.data;
                const formattedData = data.map(event => {
                    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    return { ...event, date: formattedDate };
                });
                setEvents(formattedData);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <StickyHeader />
            <Header />

            {/* Hero Section */}
            <section className="relative w-full h-[400px] mb-12">
                <img 
                    className="object-cover h-full w-full brightness-75 transition-all duration-300"
                    src="https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=3087&auto=format&fit=crop"
                    alt="Event Banner"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center bg-black bg-opacity-40">
                    <h1 className="text-5xl font-bold mb-4 tracking-tight">Event</h1>
                    <p className="text-xl font-light">Join our event and make a difference</p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Event List */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold mb-2 text-gray-900">Event List</h2>
                        <p className="text-gray-600 mb-8">Join our event and make a difference</p>

                        <div className="space-y-12">
                            {events
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .slice(0, 5)
                                .map((event) => (
                                    <Link 
                                        href={`/pages/event/event_content?event_id=${event.event_id}`} 
                                        key={event.event_id}
                                        className="block group"
                                    >
                                        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                                            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                                                <img 
                                                    src={event.img_url} 
                                                    alt={event.title} 
                                                    className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {event.date}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                        {event.location}
                                                    </div>
                                                </div>
                                                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                                                    {event.title}
                                                </h3>
                                                <p className="text-gray-600 line-clamp-2">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>

                    {/* Past Events Sidebar */}
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Past Events</h2>
                        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                            {[
                                {
                                    id: 1,
                                    title: "Charity Run for Education",
                                    date: "December 15, 2023",
                                    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497",
                                    link: "/pages/event/event_content?event_id=1"
                                },
                                {
                                    id: 2,
                                    title: "Food Drive Campaign",
                                    date: "November 28, 2023",
                                    image: "https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                    link: "/pages/event/event_content?event_id=2"
                                },
                                {
                                    id: 3,
                                    title: "Community Clean-up Day",
                                    date: "October 10, 2023",
                                    image: "https://images.unsplash.com/photo-1679161837515-aa234d3a1fff?q=80&w=3108&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                    link: "/pages/event/event_content?event_id=3"
                                }
                            ].map((event) => (
                                <div 
                                    href={event.link}
                                    key={event.id} 
                                    className="group block hover:bg-gray-50 rounded-lg transition-all duration-300 p-2 cursor-pointer"
                                >
                                    <div className="flex space-x-4 items-start">
                                        <img 
                                            src={event.image} 
                                            alt={event.title} 
                                            className="w-24 h-24 rounded-lg object-cover group-hover:opacity-90 transition-opacity"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-500 mb-1">{event.date}</p>
                                            <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors truncate">
                                                {event.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
}