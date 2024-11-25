"use client";

import Image from "next/image";
import { React, useEffect, useState } from "react";

// Components
import Header from "./components/Header";
import CarouselAnimal from "./components/CarouselAnimal";
import Footer from "./components/Footer";
import CarouselHero from "./components/CarouselHero";
import StickyHeader from "./components/StickyHeader";

export default function Home() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/events")
      .then((res) => res.json())
      .then((data) => {
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
    <div className="flex flex-col justify-center items-center">

      {/* Sticky Header - Login Details */}
      <StickyHeader />

      {/* Header */}
      <Header />

      {/* Hero Banner with carousel and text on the carousel */}
      <section className="relative flex flex-col justify-center items-center w-full text-white">
        {/* <img className="object-cover h-screen" src="https://plus.unsplash.com/premium_photo-1674864875568-374ab9e9dcbc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" width={2000} height={1000} /> */}
        {/* <video className="object-cover h-screen" 
          src="https://ik.imagekit.io/ikmedia/example_video.mp4"
          autoPlay loop muted 
        /> */}

        <video className="object-cover h-screen" 
          src="https://cdn.strateticsxp.com/wildlife/index.mp4"
          height="100%"
          width="100%"
          autoPlay loop muted 
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="absolute w-4/5 flex flex-row justify-between items-center">
              {/* First column - Carousel Text */}
              <div className="w-1/2">
                <h1 className="text-md uppercase font-extrabold text-yellow-300">Discover the Wonders of the Borneo Kingdom</h1>
                <p className="text-8xl font-bold">New Wildlife Experience of Joy</p>
                <a href="#event" className="text-white mt-10 font-semibold bg-orange-600 p-4 rounded-md hover:bg-orange-700 inline-block">Learn More</a>
              </div>

              {/* Second column - Carousel Button*/}
              <div className="flex flex-col justify-center items-end text-right ml-10">
                
              </div>
            </div>
      </section>

      {/* Test CarouselHero */}
      {/* <CarouselHero /> */}

      {/* Features */}
      <section className="flex flex-col justify-center items-center w-full p-10 bg-gray-800 text-white">
        <h2 className="mb-10 font-bold text-4xl">Features</h2>
        <div className="flex flex-row gap-10 justify-around items-center w-full">

          {/* Features 1 */}
          <div className="flex flex-row justify-center items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-20 mr-2 text-yellow-300">
              <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
              <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clip-rule="evenodd" />
              <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
            </svg>

            <div className="flex flex-col items-start w-1/2">
              <h3 className="text-2xl font-bold uppercase">Donations</h3>
              <p className="text-lg">Support our conservation efforts by making a donation today.</p>
            </div>
          </div>

          {/* Features 2 */}
          <div className="flex flex-row justify-center items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-20 mr-2 text-yellow-300">
              <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
              <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
            </svg>
            <div className="flex flex-col items-start w-1/2">
              <h3 className="text-2xl font-bold uppercase">New Events</h3>
              <p className="text-lg">Check out our latest events and join us in our conservation efforts.</p>
            </div>
          </div>

          {/* Features 3 */}
          <div className="flex flex-row justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-20 mr-2 text-yellow-300">
              <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
              <path fill-rule="evenodd" d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z" clip-rule="evenodd" />
            </svg>
            
            <div className="flex flex-col items-start w-1/2">
              <h3 className="text-2xl font-bold uppercase">Interactive Map</h3>
              <p className="text-lg">Explore our interactive map and learn more about the wildlife in Borneo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Description */}
      <section className="flex flex-row justify-center items-center w-full h-screen p-2 text-black my-10">
        <div className="flex flex-col justify-center ml-20 w-1/2">
          <hr className="w-[80px] border-2 border-red-500 mb-6" />
          <h2 className="mb-10 font-bold text-4xl">Orangutan Oasis: Protecting Wildlife, Empowering Communities</h2>
          <p className="text-2xl">
            Orangutan Oasis is a groundbreaking project focused on protecting Bornean orangutans, restoring 
            habitats, and promoting sustainable tourism at Semenggoh Nature Reserve. Combining advanced technology, community 
            engagement, and responsible tourism, the project creates a balanced ecosystem where wildlife thrives, tourists learn, 
            and local communities contribute to conservation.
          </p>
          {/* Hero 3 List info */}
          <div className="flex flex-col text-xl mt-10">
            {/* Hero List 1 */}
            <div className="flex flex-row items-center mt-4">
              <div className="rounded-full p-2 bg-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <p className="ml-4">Real-Time Wildlife Monitoring: AI-powered tools track orangutans and detect threats for better protection.</p>
            </div>

            {/* Hero List 2  */}
            <div className="flex flex-row items-center mt-4">
              <div className="rounded-full p-2 bg-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <p className="ml-4">Eco-Friendly Tourism: Mobile apps offer live wildlife updates, conservation tips, and education for visitors.</p>
            </div>

            {/* Hero List 3 */}
            <div className="flex flex-row items-center mt-4">
              <div className="rounded-full p-2 bg-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <p className="ml-4">Community Involvement: Local communities participate in eco-tourism and conservation efforts.</p>
            </div>

          </div>
        </div>

        <div className="flex justify-center items-center w-1/2">
          <img className="object-cover h-4/5 rounded-full hover:bg-white hover:opacity-80" src="https://images.unsplash.com/photo-1678365924276-f02b29287859?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" width={500} height={500} />
        </div>
      </section>

      {/* Animal Carousel */}
      <section>
        <hr className="w-[80px] mx-auto my-10 border-2 border-gray-800" />
        <div className="flex justify-center items-center w-[600px] mx-auto">
          <h2 className="mb-10 font-extrabold text-6xl text-center">Borneo Amazing Animals</h2>
        </div>
        <CarouselAnimal />
      </section>

      {/* Latest Events  -  Have not add logic, push the latest event and limit to 2 content view at a time*/}
      <section className="flex flex-col items-center w-full my-10">
        <h2 id="event" className="mb-8 font-bold text-black text-4xl pt-4">Latest Events</h2>
        <div className="flex flex-row justify-evenly items-center gap-6 w-full h-full ">
          <div className="w-1/2 flex justify-center relative">
            <img className="object-cover w-full h-[626px]" src="https://images.unsplash.com/photo-1500463959177-e0869687df26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" width={800} height={400} />
            <div className="absolute ml-20 top-1/2 left-2/3 transform -translate-y-1/2 -translate-x-1/2 w-[300px] flex flex-col justify-center text-white items-start">
              <hr className="w-[80px] my-4 border-2 border-green-400" />
              <h3 className="mb-4 font-extrabold text-6xl">CHECK OUR UPCOMING EVENTS</h3>
              <a href="/pages/event" className="text-white font-semibold bg-green-400 p-2 rounded-md hover:bg-green-600 inline-block">View Event</a>
            </div>
          </div>

          {/* List of all the event */}
          <div className="w-1/2 h-[626px] text-black bg-green-100 flex flex-col justify-evenly items-center p-4">
            {events
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort events by date in descending order
              .slice(0, 2) // Get the latest 2 events
              .map((event) => (
                <div key={event.id} className="flex flex-row justify-evenly items-center w-full">
                  {/* <img className="object-cover" src="https://placehold.co/200x200" alt="Logo" width={200} height={200} /> */}
                  {/* <p>{event.img_url}</p> */}
                  <img className="object-cover w-[200px] h-[200px]" src={event.img_url} alt="Logo" width={200} height={200} />
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
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>  
  );
}