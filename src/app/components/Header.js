import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between items-center w-full p-4 bg-white text-gray-500 h-28 relative z-10">
            <div className="flex items-center">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
                <h1 className="ml-2">Next.js</h1>
            </div>
            <nav>
                <ul className="flex font-bold">
                    <li className="ml-4 font-bold hover:underline hover:underline-offset-4 hover:text-black duration-100 ease-in-out">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="ml-4 font-bold hover:underline hover:underline-offset-4 hover:text-black duration-100 ease-in-out">
                        <Link href="/pages/event">Event</Link>
                    </li>
                    <li className="ml-4 font-bold hover:underline hover:underline-offset-4 hover:text-black duration-100 ease-in-out">
                        <Link href="/pages/donation">Donation</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}