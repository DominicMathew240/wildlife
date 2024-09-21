import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between items-center w-full p-4 bg-green-700 text-white relative z-10">
            <div className="flex items-center">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
                <h1 className="ml-2">Next.js</h1>
            </div>
            <nav>
                <ul className="flex font-bold">
                    <li className="ml-4">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="ml-4">
                        <Link href="/pages/event">Event</Link>
                    </li>
                    <li className="ml-4">
                        <Link href="/pages/donation">Donation</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}