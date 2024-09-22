import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Donation() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            {/* Header */}
            <Header />

            {/* Donation Form */}
            <section className="flex flex-col justify-center items-center w-full p-10 text-black">
                <div className="flex flex-col items-center w-full max-w-2xl bg-green-100 p-8 rounded-lg shadow-lg">
                    <h2 className="mb-4 font-bold text-4xl w-full text-center">Donation</h2>
                    <p className="mb-6 w-full text-center">Please fill the form below to donate</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-evenly items-center w-full mb-6">
                        <div className="flex flex-col items-center border border-gray-200 bg-white p-4 rounded-lg shadow-md hover:border-orange-400 hover:text-orange-400">
                            <p className="font-bold">RM 5</p>
                        </div>
                        <div className="flex flex-col items-center border border-gray-200 bg-white  p-4 rounded-lg shadow-md hover:border-orange-400 hover:text-orange-400">
                            <p className="font-bold">RM 10</p>
                        </div>
                        <div className="flex flex-col items-center border border-gray-200 bg-white  p-4 rounded-lg shadow-md hover:border-orange-400 hover:text-orange-400">
                            <p className="font-bold">RM 20</p>
                        </div>
                        <div className="flex flex-col items-center border border-gray-200 bg-white  p-4 rounded-lg shadow-md hover:border-orange-400 hover:text-orange-400">
                            <p className="font-bold">RM 50</p>
                        </div>
                        <div className="flex flex-col items-center border border-gray-200 bg-white  p-4 rounded-lg shadow-md hover:border-orange-400 hover:text-orange-400">
                            <p className="font-bold">RM 100</p>
                        </div>
                        <div className="flex flex-col items-center border border-gray-200 bg-white p-4 rounded-lg shadow-md hover:border-orange-400 hover:text-orange-400">
                            <p className="font-bold">Custom</p>
                        </div>
                    </div>
                    <form className="flex flex-col justify-center items-start w-full">
                        <p className="mb-4 font-bold">Enter your details:</p>
                        <input type="text" placeholder="Full Name" className="border-2 border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:border-blue-500" />
                        <input type="email" placeholder="Email" className="border-2 border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:border-blue-500" />
                        {/* Phone Number */}
                        <input type="tel" placeholder="Phone Number" className="border-2 border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:border-blue-500" />
                        {/* Amount */}
                        {/* Message */}
                        <textarea placeholder="Message" className="border-2 border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:border-blue-500" />
                        <button className="bg-blue-500 font-bold text-white p-3 w-1/2 rounded-lg hover:bg-blue-600 transition duration-300">Donate</button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}