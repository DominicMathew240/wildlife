import React from "react";
import Image from "next/image";

import logo from "../images/logo.jpg";

export default function Footer() {
    return (
        <footer className="flex flex-row justify-center items-center w-full h-52 mt-4 p-10 bg-gray-800 text-white">
            <div className="grid grid-cols-3 justify-center items-center w-full">
                {/* Company Logo */}
                <div className="flex justify-start items-center flex-row gap-4">
                    <a href="/" className="flex flex-row justify-center items-center">
                        <Image src={logo} alt="Logo" width={100} height={100} />
                        <p className="ml-2 font-bold text-2xl w-[240px]">Sarawak Forestry Corporation</p>
                    </a>
                </div>
                {/* Website Link */}
                <div className="flex flex-row justify-around items-start">
                    <div className="flex flex-col justify-center items-start">
                        <h2 className="font-bold text-2xl mb-4">LINKS</h2>
                        <a href="/pages/donation" className="text-white mt-2 font-semibold hover:underline hover:underline-offset-4">Make A Donation</a>
                        <a href="/pages/event" className="text-white mt-2 font-semibold hover:underline hover:underline-offset-4">Wildlife Events</a>
                        <a href="#" className="text-white mt-2 font-semibold hover:underline hover:underline-offset-4">Contact Us</a>
                    </div>

                    <div className="flex flex-col justify-center items-start">
                        <h2 className="font-bold text-2xl mb-4">CONTACT</h2>
                        <p className="text-white mt-2 flex flex-row">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                            +60 123 456789
                        </p>
                        <p className="text-white mt-2 flex flex-row">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            info@sarawakforestry.com
                        </p>
                        <p className="text-white mt-2 flex flex-row">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            Lot 391, Jalan Perbananan
                        </p>

                    </div>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <a href="#" className="text-white bg-blue-500 px-4 py-2 inline-block rounded">Learn More</a>
                </div>
            </div>
        </footer>
    );
}