import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";

export default function ThankYouModal({ closeModal, amount, name }) {
    const { width, height } = useWindowSize();

    const confettiColors = ['#60A5FA', '#34D399', '#FBBF24', '#EC4899'];

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20"
        >
            <Confetti
                width={width}
                height={height}
                numberOfPieces={200}
                recycle={false}
                colors={confettiColors}
                gravity={0.2}
            />
            <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-2xl text-center relative z-30 max-w-md w-full mx-4"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-green-500 text-white text-xl p-4 rounded-full shadow-lg">
                        🌟
                    </div>
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                        Thank You, {name}!
                    </h2>
                    <div className="text-4xl font-bold mb-4 text-gray-800">
                        RM {amount}
                    </div>
                    <p className="text-gray-600 mb-6">
                        Your generous donation will help protect wildlife in Borneo
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="flex flex-col gap-4 mb-6"
                >
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600">
                            Your donation helps us protect endangered species and their habitats
                        </p>
                    </div>
                </motion.div>

                <div className="flex flex-col gap-3">

                    <div className="flex gap-2 justify-center">
                        <button 
                            onClick={closeModal}
                            className="px-6 py-2 border-2 border-gray-200 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition-all duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>

                <div className="mt-6 flex justify-center gap-4">
                    {['🦧', '🐘', '🐅', '🦁'].map((emoji, index) => (
                        <motion.span
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6 + (index * 0.1) }}
                            className="text-2xl"
                        >
                            {emoji}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}