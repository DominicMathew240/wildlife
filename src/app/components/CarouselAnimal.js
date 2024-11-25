"use client";

import React, { useEffect, useState } from "react";

export default function CarouselAnimal() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        {
            url: "https://images.unsplash.com/photo-1484406566174-9da000fda645",
            title: "Borneo Deer",
            description: "The unique Bornean Yellow Muntjac in its natural habitat",
            alt: "A deer standing in the lush Borneo rainforest"
        },
        {
            url: "https://plus.unsplash.com/premium_photo-1661816511883-d53e6e9e106f?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.0.3",
            title: "Orangutan Family",
            description: "Experience the incredible bond between orangutan mother and child",
            alt: "Orangutan mother with baby in the trees"
        },
        {
            url: "https://images.unsplash.com/photo-1673232578361-03149a3817c3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
            title: "Rhinoceros Hornbill",
            description: "Borneo's majestic Rhinoceros Hornbill, a sacred bird of the rainforest",
            alt: "A large Rhinoceros Hornbill perched on a branch in Borneo's rainforest"
        },
        {
            url: "https://plus.unsplash.com/premium_photo-1724434797114-d77e22823699?q=80&w=3139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Proboscis Monkey",
            description: "Borneo's unique long-nosed monkey, found nowhere else in the world",
            alt: "A proboscis monkey sitting in a tree displaying its distinctive long nose"
        },
        {
            url: "https://images.unsplash.com/photo-1697638465076-8d94e89680e8?q=80&w=2720&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Silvered Leaf Monkey",
            description: "The elegant Silvered Leaf Monkey, known for its distinctive silver-tipped fur",
            alt: "A Silvered Leaf Monkey with its characteristic silver-grey coat in a tree"
        },
        {
            url: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Clouded Leopard",
            description: "The elusive clouded leopard of Borneo, master of the rainforest canopy",
            alt: "A clouded leopard moving gracefully through the trees of Borneo"
        },
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    const displayedImages = [];
    for (let i = 0; i < 3; i++) {
        displayedImages.push(images[(currentIndex + i) % images.length]);
    }

    return (
        <div className="relative w-full overflow-hidden" aria-label="image carousel">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {displayedImages.map((image, index) => (
                    <div 
                        className="relative aspect-[4/3] overflow-hidden rounded-xl group cursor-pointer"
                        key={index}
                        onClick={() => goToSlide(index)}
                        role="button"
                        tabIndex={0}
                    >
                        <img
                            src={image.url}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            alt={image.title}
                            loading="lazy"
                        />
                        
                        {/* Gradient overlay for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500" />

                        {/* Default visible content */}
                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-0 transition-all duration-500">
                            <h2 className="text-white text-lg md:text-xl font-bold mb-2 drop-shadow-lg">
                                {image.title}
                            </h2>
                            <p className="text-gray-200 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                {image.description}
                            </p>
                            <button 
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg opacity-0 group-hover:opacity-100 
                                         transform translate-y-4 group-hover:translate-y-0 transition-all duration-500
                                         hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation dots */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
                                 ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}