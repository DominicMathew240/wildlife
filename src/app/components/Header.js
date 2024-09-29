import Image from "next/image";
import Link from "next/link";
import logo from "../images/logo.jpg";

export default function Header() {
    return (
        <header className="sticky top-0 flex justify-between items-center w-full p-4 bg-white text-gray-500 h-24 z-20">
            <div className="flex items-center">
                <a href="/" className="flex flex-row items-center">
                    <Image src={logo} alt="Logo" width={60} height={60} />
                    <h1 className=" ml-2 font-bold text-xl">Sarawak Forestry Corporation</h1>
                </a>
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