import React from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Donation() {
    return (
        <div className="flex flex-col justify-center items-center">
            {/* Header */}
            <Header />

            {/* Event List Content */}
            <section className="flex flex-col justify-center items-center w-full p-10 bg-gray-800 text-white">
                <h2 className="mb-4 font-bold text-4xl">Event</h2>
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="flex flex-col items-center w-full">
                        <img src="https://placehold.co/400x400" alt="Logo" width={200} height={200} />
                        <h3>Event 1</h3>
                        <p>Event 1 description</p>
                    </div>
                    <div className="flex flex-col items-center w-full">
                        <img src="https://placehold.co/400x400" alt="Logo" width={200} height={200} />
                        <h3>Event 2</h3>
                        <p>Event 2 description</p>
                    </div>
                    <div className="flex flex-col items-center w-full">
                        <img src="https://placehold.co/400x400" alt="Logo" width={200} height={200} />
                        <h3>Event 3</h3>
                        <p>Event 3 description</p>
                    </div>
                </div>
            </section>
            

            {/* Footer */}
            <Footer />
        </div>
    );
}