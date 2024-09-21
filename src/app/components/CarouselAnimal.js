"use client"; // This makes the component a Client Component

import React, { useEffect, useState, style } from "react";

export default function CarouselAnimal() {
    // State to track the current index of images
    const [currentIndex, setCurrentIndex] = useState(0);

    // Array of images to display in the carousel
    const images = [
        {
        url: "https://images.unsplash.com/photo-1726510114046-b7938cdc1bd1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Beautiful Nature",
        },
        {
        url: "https://plus.unsplash.com/premium_photo-1661816511883-d53e6e9e106f?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Wildlife Adventure",
        },
        {
        url: "https://images.unsplash.com/photo-1673232578361-03149a3817c3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Majestic Mountains",
        },
        {
        url: "https://images.unsplash.com/photo-1522598312049-70ccda16fe43?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Serene Beach",
        },
        {
        url: "https://plus.unsplash.com/premium_photo-1667667846123-26ce04aa3271?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Enchanted Forest",
        },
    ];

    // Function to move to the next image
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Function to move to the previous image
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // UseEffect to automatically move to the next image every 3 seconds
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, []);

    // Create an array of 5 images to display
    const displayedImages = [];
    for (let i = 0; i < 5; i++) {
        displayedImages.push(images[(currentIndex + i) % images.length]);
    }

    return (
        <div id="controls-carousel" className="relative w-full overflow-hidden" data-carousel="slide">
            {/* <!-- Carousel wrapper --> */}
            <div className="grid grid-cols-5">
                {displayedImages.map((image, index) => (
                <div className="relative block w-full h-full group" key={index}>
                    <img
                        src={image.url}
                        className="block w-full h-full object-cover transition-transform duration-500"
                        alt={`Carousel image ${index + 1}`}
                        style={{ width: "600px", height: "400px" }}
                    />

                    {/* Overlay for text and learn more button */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end">
                        <div className="p-4">
                            <h2 className="text-white text-2xl font-bold mb-2 opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                                {image.title}
                            </h2>
                            <a href="#" className="text-white bg-blue-500 px-4 py-2 inline-block rounded opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}