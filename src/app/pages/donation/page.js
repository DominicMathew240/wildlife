"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ThankYouModal from "../../components/ThankYouModal";
import StickyHeader from "../../components/StickyHeader";

export default function Donation() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const amounts = [5, 10, 20, 50, 100, 'Custom'];

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!name) newErrors.name = "Name is required";
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!selectedAmount) newErrors.amount = "Please select an amount";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setErrors({ ...errors, amount: undefined });
    };

    const handleDonateClick = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const result = await sendCertificate(email, name);
            if (result.success) {
                setIsModalOpen(true);
            } else {
                setErrors({ ...errors, submit: "Failed to process donation. Please try again." });
            }
        } catch (error) {
            setErrors({ ...errors, submit: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAmount(null);
        setEmail("");
        setName("");
    };

    const sendCertificate = async (email, name) => {
        try {
            const response = await fetch('http://localhost:4000/send-certificate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, amount: selectedAmount })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Clone response before attempting to read
            const responseClone = response.clone();

            try {
                // Try to parse as JSON first
                const jsonData = await response.json();
                return { success: true, data: jsonData };
            } catch (jsonError) {
                try {
                    // If JSON parsing fails, try text with cloned response
                    const textData = await responseClone.text();
                    if (textData.includes("Email sent")) {
                        return { 
                            success: true, 
                            data: { message: "Email sent successfully" } 
                        };
                    }
                    throw new Error("Invalid response format");
                } catch (textError) {
                    throw new Error("Failed to read server response");
                }
            }
        } catch (error) {
            console.error('Certificate sending error:', error);
            throw new Error(
                error.message || "Failed to send certificate. Please try again later."
            );
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <StickyHeader />
            <Header />
            <section className="flex flex-col justify-center items-center w-full p-10 text-black">
                <div className="flex flex-col items-center w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
                    {errors.submit && (
                        <div className="w-full p-4 mb-4 bg-red-100 text-red-700 rounded-lg">
                            {errors.submit}
                        </div>
                    )}
                    <h2 className="mb-4 font-bold text-4xl w-full text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                        Make a Donation
                    </h2>
                    <p className="mb-8 w-full text-center text-gray-600">Choose an amount to support our cause</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full mb-8">
                        {amounts.map((amount, index) => (
                            <button
                                key={index}
                                onClick={() => handleAmountSelect(amount)}
                                className={`
                                    relative overflow-hidden p-6 rounded-xl transition-all duration-300
                                    ${selectedAmount === amount 
                                        ? 'bg-blue-500 text-white transform scale-105' 
                                        : 'bg-white hover:bg-blue-50 border-2 border-gray-200'}
                                `}
                            >
                                <span className="font-bold text-lg">
                                    {amount === 'Custom' ? 'Custom' : `RM ${amount}`}
                                </span>
                            </button>
                        ))}
                    </div>

                    <form className="flex flex-col w-full space-y-4">
                        <div>
                            <input 
                                type="text"
                                placeholder="Full Name"
                                className={`w-full p-4 rounded-lg border-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500 outline-none
                                    ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <input 
                                type="email"
                                placeholder="Email"
                                className={`w-full p-4 rounded-lg border-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500 outline-none
                                    ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) {
                                        setErrors({ ...errors, email: undefined });
                                    }
                                }}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <input 
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full p-4 rounded-lg border-2 border-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <textarea 
                            placeholder="Your Message (Optional)"
                            className="w-full p-4 rounded-lg border-2 border-gray-200 transition-all duration-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-32"
                        />

                        <button
                            onClick={handleDonateClick}
                            disabled={isLoading}
                            className="w-full p-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg
                                     transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : 'Donate Now'}
                        </button>
                    </form>
                </div>
            </section>
            
            {isModalOpen && (
                <ThankYouModal 
                    closeModal={closeModal} 
                    amount={selectedAmount} 
                    name={name}
                />
            )}
            <Footer />
        </div>
    );
}