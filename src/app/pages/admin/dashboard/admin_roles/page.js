"use client";

import React, { useEffect, useState } from "react";

// Components
import Sidebar from "../../components/sidebar";
import axios from "axios";

export default function AdminRoles() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        // Fetch all the content of the event
        axios.get("http://localhost:4000/list-users")
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    };

    return (
        <div className="flex flex-row h-screen bg-gray-100">
            <Sidebar />

            <div className="w-4/5 p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Roles</h1>

                {/* Display the list of users in the table from user id, username, and roles */}
                <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left border-b border-gray-300">User ID</th>
                                <th className="py-3 px-6 text-left border-b border-gray-300">Username</th>
                                <th className="py-3 px-6 text-left border-b border-gray-300">Roles</th>
                                <th className="py-3 px-6 text-center border-b border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-gray-300 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap border-r border-gray-300">{user.user_id}</td>
                                    <td className="py-3 px-6 text-left border-r border-gray-300">{user.username}</td>
                                    <td className="py-3 px-6 text-left border-r border-gray-300">
                                        {Array.isArray(user.roles) ? user.roles.join(', ') : user.roles}
                                    </td>
                                    <td className="py-3 px-6 flex justify-evenly items-center">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}