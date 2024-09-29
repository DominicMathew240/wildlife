import React from "react";
import Link from "next/link";

export default function Login(){
    return (
        <section className="flex flex-col justify-center items-center w-full h-screen">
            <div className="flex flex-col justify-center items-center w-full">
                <h1 className="text-4xl font-bold">Admin Login</h1>
                <form className="flex flex-col justify-center items-center w-full">
                    <input type="text" placeholder="Username" className="w-1/3 p-2 my-4 border border-gray-400 rounded" />
                    <input type="password" placeholder="Password" className="w-1/3 p-2 my-4 border border-gray-400 rounded" />
                    <Link href="/pages/admin/dashboard" className="w-1/3 p-2 my-4 bg-blue-500 text-white text-center font-bold rounded">
                        Login
                    </Link>
                </form>
            </div>
        </section>
    );
}