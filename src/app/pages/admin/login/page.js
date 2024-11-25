"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        rememberMe: false
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sanitizeInput = (input) => {
        const element = document.createElement('div');
        element.innerText = input;
        return element.innerHTML;
    };

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rememberMe' ? checked : value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        const sanitizedUsername = sanitizeInput(formData.username);
        const sanitizedPassword = sanitizeInput(formData.password);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (sanitizedUsername === "admin" && sanitizedPassword === "123") {
                // Simulate storing auth token
                localStorage.setItem('isAuthenticated', 'true');
                if (formData.rememberMe) {
                    localStorage.setItem('rememberedUser', sanitizedUsername);
                }
                router.push("/pages/admin/dashboard/admin_publish");
            } else {
                setErrors({ auth: "Invalid username or password" });
            }
        } catch (error) {
            setErrors({ auth: "An error occurred. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4"
        >
            <motion.div 
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
            >
                <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                    Admin Login
                </h1>

                {errors.auth && (
                    <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-center">
                        {errors.auth}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input 
                            type="text" 
                            name="username"
                            placeholder="Enter your username" 
                            className={`w-full p-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} 
                                      rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                                      transition-all duration-300`}
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && (
                            <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password" 
                                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} 
                                          rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                                          transition-all duration-300`}
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            id="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`w-full p-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700
                                  text-white font-semibold text-center transition-all duration-300
                                  transform hover:scale-[1.02] hover:shadow-lg
                                  disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : 'Login'}
                    </button>
                </form>
            </motion.div>
        </motion.section>
    );
}