"use client";

import { React, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";  // Import Axios

// Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StickyHeader from "../../components/StickyHeader";

export default function Event() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch the events list using Axios
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
                setEvents(formattedData);  // Set the events with formatted date
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">

            {/* Sticky Header - with login details */}
            <StickyHeader />

            {/* Header */}
            <Header />

            <section className="relative flex justify-center items-center w-full h-[340px] text-black">
                <img className="object-cover h-full w-full" src="https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                    <h1 className="text-4xl font-bold">Event</h1>
                    <p className="text-lg">Join our event and make a difference</p>
                </div>
            </section>

            {/* Event List Content */}
            <section className="flex flex-col w-full p-10 text-black">
                <div className="flex flex-row justify-evenly w-full">
                    {/* List Event */}
                    <div className="flex flex-col justify-center items-start w-1/2">
                        <h2 className="mb-4 font-bold text-4xl w-full">Event List</h2>
                        <p className="mb-6 w-full ">Join our event and make a difference</p>

                        {/* Display list of events */}
                        {events
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .slice(0, 5)
                        .map((event) => (
                            <div className="flex flex-col" key={ event.event_id }>
                                {/* Link to the event content page */}
                                {/* <Link href={`/event/event_content/${event.event_id}`} className="hover:text-orange-500"> */}
                                <Link href={`event/event_content/`} className="hover:text-orange-500">
                                    <input hidden name="event_id" value={event.event_id} />
                                    {/* <img src="http://placehold.it/770x420" alt={event.title} className="mb-4 w-full" /> */}
                                    <img src={event.img_url} alt={event.title} className="mb-4 w-[770px] h-[420px] object-cover" />
                                    <div className="flex flex-row">
                                        <p className="text-sm mb-4 mr-4">{ event.date }</p>
                                        <p className="text-sm mb-4">{ event.location }</p>
                                    </div>

                                    <h2 className="mb-4 font-bold text-2xl ">{ event.title }</h2>
                                    <p className="mb-6">{ event.description }</p>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Past Event */}
                    <div className="flex flex-col w-1/5 h-[600px]">
                        <h2 className="mb-4 font-bold text-2xl">Past Event</h2>
                        <div className="flex flex-col items-start p-4 bg-yellow-100">
                            {/* Past Event 1 */}
                            <div className="flex flex-row">
                                <img src="http://placehold.it/100x100" alt="Event 1" className="" />
                                <div className="flex flex-col ml-6">
                                    <p className="text-sm">Event 1 Date</p>
                                    <h2 className=" font-bold text-2xl ">Event Title</h2>
                                </div>
                            </div>

                            {/* Past Event 2 */}
                            <div className="flex flex-row mt-4">
                                <img src="http://placehold.it/100x100" alt="Event 2" className="" />
                                <div className="flex flex-col ml-6">
                                    <p className="text-sm">Event 2 Date</p>
                                    <h2 className=" font-bold text-2xl ">Event Title</h2>
                                </div>
                            </div>

                            {/* Past Event 3 */}
                            <div className="flex flex-row mt-4">
                                <img src="http://placehold.it/100x100" alt="Event 3" className="" />
                                <div className="flex flex-col ml-6">
                                    <p className="text-sm">Event 3 Date</p>
                                    <h2 className=" font-bold text-2xl ">Event Title</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}