"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";  // Import Axios

// Components
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import StickyHeader from "../../../components/StickyHeader";

export default function EventContent() {
    const searchParams = useSearchParams();
    const event_id = searchParams.get('event_id');  // Get event_id from query parameters
    const [event, setEvent] = useState(null);  // State to store event details

    useEffect(() => {
        // Only fetch if the `event_id` is present in the URL
        if (event_id) {
            axios.get(`http://localhost:4000/events/event_content/${event_id}`)  // Use Axios to get event data
                .then((response) => {
                    const data = response.data;
                    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                    setEvent({ ...data, date: formattedDate });  // Format and set the event data
                })
                .catch((error) => console.error('Error fetching event:', error));
        }
    }, [event_id]);  // Dependency on `event_id`

    // Display a loading message while the event data is being fetched
    if (!event) {
        return <p>Loading event details... | event_id { event_id }</p>;
    }

    return (
        <div className="flex flex-col justify-center items-center">

            {/* Sticky Header - with login details */}
            <StickyHeader />

            {/* Header */}
            <Header />

            {/* Event Banner */}
            <section className="relative flex justify-center items-center w-full h-[340px] text-black">
                <img
                    className="object-cover h-full w-full"
                    src="https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Event Banner"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                    <h1 className="text-4xl font-bold">Event</h1>
                    <p className="text-lg">Join our event and make a difference</p>
                </div>
            </section>

            {/* Event Content */}
            <section className="flex flex-col w-full p-10 text-black">
                <div className="flex flex-col justify-center items-start w-full">
                    <img src="http://placehold.it/770x420" alt={event.title} className="mb-4 w-full" />
                    <div className="flex flex-row">
                        <p className="text-sm mb-4 mr-4">{event.date}</p>
                        <p className="text-sm mb-4">{event.location}</p>
                    </div>

                    <h2 className="mb-4 font-bold text-4xl">{event.title}</h2>
                    <p className="mb-6">{event.description}</p>
                    <p className="mb-6">{event.article}</p>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}