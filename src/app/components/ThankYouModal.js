import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function ThankYouModal({ closeModal }) {
    const { width, height } = useWindowSize();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <Confetti
                width={width}
                height={height}
                numberOfPieces={200}
                recycle={false}
            />
            <div className="bg-white p-8 rounded-lg shadow-lg text-center relative z-30">
                <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                <p className="mb-4">Your donation is greatly appreciated.</p>
                <div className="thank-you-animation mb-4">
                    🎉
                </div>
                <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 font-bold rounded hover:bg-blue-600 transition duration-300">Close</button>
            </div>
        </div>
    );
}