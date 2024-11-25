"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const sanitizeInput = (input) => {
        const element = document.createElement('div');
        element.innerText = input;
        return element.innerHTML;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sanitizedUsername = sanitizeInput(username);
        const sanitizedPassword = sanitizeInput(password);

        // Mock login logic
        if (sanitizedUsername === "admin" && sanitizedPassword === "123") {
            router.push("/pages/admin/dashboard/admin_publish");
        } else {
            alert("Invalid username or password");
        }
    };

    return (
        <section className="flex flex-col justify-center items-center w-full h-screen">
            <div className="flex flex-col justify-center items-center w-full">
                <h1 className="text-4xl font-bold">Admin Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="w-1/3 p-2 my-4 border border-gray-400 rounded" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-1/3 p-2 my-4 border border-gray-400 rounded" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-1/3 p-2 my-4 bg-blue-500 text-white text-center font-bold rounded">
                        Login
                    </button>
                </form>
            </div>
        </section>
    );
}