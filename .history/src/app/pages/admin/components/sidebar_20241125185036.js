import React from "react";
import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="flex flex-col justify-start items-center w-64 h-screen bg-gray-800 text-white">
            <h1 className="text-2xl font-bold mt-4">Admin</h1>
            <ul className="flex flex-col justify-start items-center w-full mt-4">
                <Link href="/pages/admin/dashboard" className="w-full p-2 my-2 border-b border-gray-700">Dashboard</Link>
                <Link href="/pages/admin/dashboard/admin_publish" className="w-full p-2 my-2 border-b border-gray-700">Publish</Link>
                <Link href="/pages/admin/dashboard/camera_traps" className="w-full p-2 my-2 border-b border-gray-700">Camera Traps</Link>
                <Link href="/pages/admin/dashboard/admin_roles" className="w-full p-2 my-2 border-b border-gray-700">Settings</Link>
                <a href="/" className="w-full p-2 my-2 border-b border-gray-700">Logout</a>
            </ul>
        </aside>
    );
}