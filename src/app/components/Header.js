import Image from "next/image";

export default function Header() {
    return (
        <header className="flex justify-between items-center w-full p-4 bg-green-700 text-white">
            <div className="flex items-center">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
                <h1 className="ml-2">Next.js</h1>
            </div>
            <nav>
                <ul className="flex">
                    <li className="ml-4">Home</li>
                    <li className="ml-4">About</li>
                    <li className="ml-4">Contact</li>
                </ul>
            </nav>
        </header>
    );
}