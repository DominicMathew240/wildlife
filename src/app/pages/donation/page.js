"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ThankYouModal from "../../components/ThankYouModal";
import StickyHeader from "../../components/StickyHeader";

export default function Donation() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState(""); // Added state for name
    const [selectedAmount, setSelectedAmount] = useState(null); // Added state for selected amount

    const handleDonateClick = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
        sendCertificate(email, name); // Pass name to sendCertificate
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const sendCertificate = async (email, name) => {
        try {
            const response = await fetch('http://localhost:4000/send-certificate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, name }) // Include name in the request body
            });

            if (response.ok) {
                console.log(`Certificate sent to ${email}`);
            } else {
                console.error('Failed to send certificate');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const amounts = [5, 10, 20, 50, 100, 'Custom'];

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <StickyHeader />
        <Header />
        <section className="flex flex-col justify-center items-center w-full p-10 text-black">
            <div className="flex flex-col items-center w-full max-w-2xl bg-green-100 p-8 rounded-lg shadow-lg">
                <h2 className="mb-4 font-bold text-4xl w-full text-center">Donation</h2>
                <p className="mb-6 w-full text-center">Please fill the form below to donate</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-evenly items-center w-full mb-6">
                    {amounts.map((amount, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center border border-gray-200 bg-white p-4 rounded-lg shadow-md hover:border-orange-400 hover:text-orange-400 ${selectedAmount === amount ? 'border border-orange-400 text-orange-400' : ''}`}
                            onClick={() => setSelectedAmount(amount)}
                        >
                            <p className="font-bold">{amount === 'Custom' ? 'Custom' : `RM ${amount}`}</p>
                        </div>
                    ))}
                </div>
                <form className="flex flex-col justify-center items-start w-full">
                    <p className="mb-4 font-bold">Enter your details:</p>
                    <input type="text" placeholder="Full Name" className="border-2 border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:border-blue-500" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Email" className="border-2 border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="tel" placeholder="Phone Number" className="border-2 border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:border-blue-500" />
                    <textarea placeholder="Message" className="border-2 border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:border-blue-500" />
                    <button onClick={handleDonateClick} className="bg-blue-500 font-bold text-white p-3 w-1/2 rounded-lg hover:bg-blue-600 transition duration-300">Donate</button>
                </form>
            </div>
        </section>
        {isModalOpen && <ThankYouModal closeModal={closeModal} amount={selectedAmount} />}
        <Footer />
    </div>
    );
}