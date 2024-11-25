"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import CarouselAnimal from "./components/CarouselAnimal";
import Footer from "./components/Footer";
import StickyHeader from "./components/StickyHeader";

export default function Home() {

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Education Programs",
      description: "Learn about wildlife conservation through our interactive programs."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ),
      title: "Conservation Efforts",
      description: "Supporting wildlife preservation and habitat restoration."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community Engagement",
      description: "Involving local communities in wildlife protection initiatives."
    }
  ];

  const benefits = [
    "Protected habitat for endangered species",
    "Sustainable eco-tourism practices",
    "Local community development",
    "Research and conservation programs"
  ];

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:4000/events");
        const data = await res.json();
        const formattedData = data.map(event => ({
          ...event,
          date: new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }));
        setEvents(formattedData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center scroll-smooth">
      <StickyHeader />
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-screen">
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          src="https://cdn.strateticsxp.com/wildlife/index.mp4"
          autoPlay loop muted 
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="text-sm md:text-md uppercase font-extrabold text-yellow-300 mb-4">
                Discover the Wonders of the Borneo Kingdom
              </h1>
              <p className="text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-tight mb-8">
                New Wildlife Experience of Joy
              </p>
              <a 
                href="#event" 
                className="inline-block px-8 py-4 text-white font-semibold bg-orange-600 rounded-md
                         hover:bg-orange-700 transition-colors duration-300 transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start p-6 rounded-lg bg-gray-700/50 hover:bg-gray-700 
                         transition-all duration-300 transform hover:-translate-y-2"
              >
                {feature.icon}
                <div className="ml-4">
                  <h3 className="text-xl font-bold uppercase mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="w-20 border-2 border-red-500" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Orangutan Oasis: Protecting Wildlife, Empowering Communities
            </h2>
            <p className="text-xl text-gray-600">
              Orangutan Oasis is a groundbreaking project focused on protecting Bornean orangutans,
              restoring habitats, and promoting sustainable tourism at Semenggoh Nature Reserve.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 rounded-full p-2 bg-red-500">
                    <svg className="w-6 h-6 text-white" /* ... */ />
                  </div>
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1678365924276-f02b29287859"
              alt="Orangutan"
              className="rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Animals Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="w-20 border-2 border-gray-800 mx-auto mb-8" />
            <h2 className="text-5xl md:text-6xl font-bold">Borneo Amazing Animals</h2>
          </div>
          <CarouselAnimal />
        </div>
      </section>

      {/* Events Section */}
      <section id="event" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Latest Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-[626px] overflow-hidden rounded-2xl">
              {/* Events Banner */}
              <img 
                src="https://images.unsplash.com/photo-1500463959177-e0869687df26"
                alt="Events Banner"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-8">
                <div className="text-white text-center">
                  <div className="w-20 border-2 border-green-400 mx-auto mb-6" />
                  <h3 className="text-4xl md:text-6xl font-bold mb-8">
                    CHECK OUR UPCOMING EVENTS
                  </h3>
                  <a 
                    href="/pages/event"
                    className="inline-block px-6 py-3 bg-green-400 rounded-md hover:bg-green-600 
                             transition-colors duration-300"
                  >
                    View Event
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-green-100 rounded-2xl p-8">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent" />
                </div>
              ) : (
                <div className="space-y-8">
                  {events
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 2)
                    .map((event) => (
                      <div 
                        key={event.id}
                        className="flex flex-col md:flex-row gap-6 p-4 bg-white rounded-lg shadow-md
                                 hover:shadow-xl transition-shadow duration-300"
                      >
                        <img 
                          src={event.img_url} 
                          alt={event.title}
                          className="w-full md:w-48 h-48 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center">
                              <svg className="w-5 h-5 mr-1" /* ... */ />
                              {event.date}
                            </span>
                            <span className="flex items-center">
                              <svg className="w-5 h-5 mr-1" /* ... */ />
                              New
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <p className="text-gray-600">{event.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}