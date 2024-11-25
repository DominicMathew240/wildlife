"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import StickyHeader from "../../../components/StickyHeader";

export default function EventContent() {
    const searchParams = useSearchParams();
    const event_id = searchParams.get('event_id');
    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (event_id) {
            axios.get(`http://localhost:4000/events/event_content/${event_id}`)
                .then((response) => {
                    const data = response.data;
                    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                    setEvent({ ...data, date: formattedDate });
                })
                .catch((error) => console.error('Error fetching event:', error));
        }
    }, [event_id]);

    if (!event) {
        return <p>Loading event details...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <StickyHeader />
            <Header />

            {/* Event Banner */}
            <section className="relative w-full h-[340px]">
                <img
                    className="object-cover h-full w-full brightness-50"
                    src="https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=3087&auto=format&fit=crop"
                    alt="Event Banner"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                    <h1 className="text-5xl font-bold mb-4">Event</h1>
                    <p className="text-xl">Join our event and make a difference</p>
                </div>
            </section>

            {/* Event Content */}
            <section className="max-w-4xl mx-auto px-4 py-8 w-full">
                <Link 
                    href="/pages/event" 
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Events
                </Link>

                <div className="flex flex-col">
                    <div className="w-full flex justify-center mb-12">
                        <img 
                            src={event.img_url} 
                            alt={event.title} 
                            className="w-[500px] h-[500px] rounded-lg shadow-xl object-cover transition-transform hover:scale-[1.02]" 
                        />
                    </div>

                    <div className="flex items-center space-x-6 text-gray-600 mb-6">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{event.location}</span>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold mb-6 text-gray-900">{event.title}</h2>
                    <p className="text-lg mb-8 text-gray-700 leading-relaxed">{event.description}</p>
                    <div className="prose max-w-none">
                        {event.article.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}