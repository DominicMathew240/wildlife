import Image from "next/image";
import { React } from "react";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Header */}
      <Header />

      {/* Hero Banner with carousel and text on the carousel */}
      <section className="flex flex-col justify-center items-center w-full bg-gray-800 text-white">
        <img src="https://placehold.co/4000x2000" alt="Logo" width={2000} height={1000} />
      </section>

      {/* Features */}
      <section className="flex flex-col justify-center items-center w-full p-4 bg-gray-800 text-white">
        <h2 className="mb-10 font-bold text-4xl">Features</h2>
        <div className="flex flex-row gap-10 justify-around items-center w-full">
          <div className="flex flex-col items-center">
            <img src="https://placehold.co/400x400" alt="Logo" width={200} height={200} />
            <h3>Feature 1</h3>
            <p>Feature 1 description</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://placehold.co/400x400" alt="Logo" width={200} height={200} />
            <h3>Feature 2</h3>
            <p>Feature 2 description</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://placehold.co/400x400" alt="Logo" width={200} height={200} />
            <h3>Feature 3</h3>
            <p>Feature 3 description</p>
          </div>
        </div>
      </section>

      {/* Hero Description */}
      <section className="flex flex-row justify-center items-center w-full h-screen p-2 text-black">
        <div className="flex flex-col justify-center ml-10 w-1/2">
          <h2 className="mb-10 font-bold text-4xl">Hero Description</h2>
          <p className="text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget luctus lacinia, nisi metus aliquet nunc, nec lacinia turpis turpis nec tortor. Donec auctor, ligula a tincidunt tincidunt, mi turpis ultricies tortor, ac lacinia odio libero et odio. Nullam in nunc eget nunc aliquam tincidunt. Nulla facilisi. Donec nec metus id lorem tincidunt dapibus. Nulla facilisi. Donec nec metus id lorem tincidunt dapibus.</p>
        </div>

        <div className="flex justify-center items-center w-1/2">
          <img src="https://placehold.co/600x600" alt="Logo" width={500} height={500} />
        </div>
      </section>
    </div>  
  );
}