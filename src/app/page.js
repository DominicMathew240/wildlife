import Image from "next/image";
import { React } from "react";
import Header from "./components/Header";
import CarouselAnimal from "./components/CarouselAnimal";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Header */}
      <Header />

      {/* Hero Banner with carousel and text on the carousel */}
      <section className="flex flex-col justify-center items-center w-full bg-gray-800 text-white">
        <img className="object-cover h-screen" src="https://plus.unsplash.com/premium_photo-1674864875568-374ab9e9dcbc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" width={2000} height={1000} />
        <div className="absolute flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold">Hero Banner</h1>
          <p className="text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget luctus lacinia, nisi metus aliquet nunc, nec lacinia turpis turpis nec tortor.</p>
        </div>
      </section>

      {/* Features */}
      <section className="flex flex-col justify-center items-center w-full p-10 bg-gray-800 text-white">
        <h2 className="mb-4 font-bold text-4xl">Features</h2>
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
      <section className="flex flex-row justify-center items-center w-full h-screen p-2 text-black my-10">
        <div className="flex flex-col justify-center ml-10 w-1/2">
          <h2 className="mb-10 font-bold text-4xl">Hero Description</h2>
          <p className="text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget luctus lacinia, nisi metus aliquet nunc, nec lacinia turpis turpis nec tortor. Donec auctor, ligula a tincidunt tincidunt, mi turpis ultricies tortor, ac lacinia odio libero et odio. Nullam in nunc eget nunc aliquam tincidunt. Nulla facilisi. Donec nec metus id lorem tincidunt dapibus. Nulla facilisi. Donec nec metus id lorem tincidunt dapibus.</p>
        </div>

        <div className="flex justify-center items-center w-1/2">
          <img className="object-cover h-full rounded-full hover:bg-white hover:opacity-80" src="https://images.unsplash.com/photo-1678365924276-f02b29287859?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" width={500} height={500} />
        </div>
      </section>

      {/* Animal Carousel */}
      <section>
        <hr className="w-[80px] mx-auto my-10 border-2 border-gray-800" />
        <div className="flex justify-center items-center w-[600px] mx-auto">
          <h2 className="mb-10 font-extrabold text-6xl text-center">Borneo Amazing Animals</h2>
        </div>
        <CarouselAnimal />
      </section>

      {/* Latest Events */}
      <section className="flex flex-col items-center w-full my-10">
        <h2 className="mb-8 font-bold text-black text-4xl pt-4">Latest Events</h2>
        <div className="flex flex-row justify-evenly items-center gap-6 w-full h-full ">
          <div className="w-1/2 flex justify-center relative">
            <img className="object-cover w-full" src="https://images.unsplash.com/photo-1500463959177-e0869687df26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" width={800} height={400} />
            <div className="absolute ml-20 top-1/2 left-2/3 transform -translate-y-1/2 -translate-x-1/2 w-[300px] flex flex-col justify-center text-white items-start">
              <hr className="w-[80px] my-4 border-2 border-green-400" />
              <h3 className="mb-4 font-extrabold text-6xl">CHECK OUR UPCOMING EVENTS</h3>
              <a href="#" className="text-white font-semibold bg-green-400 p-2 hover:bg-green-600 inline-block">View Event</a>
            </div>
          </div>

          {/* List of all the event */}
          <div className="w-1/2 h-[626px] text-black bg-green-100 flex flex-col justify-evenly items-center p-4">
            {/* First Event */}
            <div className="flex flex-row justify-evenly items-center w-full">
              <img className="object-cover" src="https://placehold.co/200x200" alt="Logo" width={200} height={200} />
              <div className="flex flex-col justify-center items-start w-1/2 ml-4">

                {/* Event Header */}
                <div className="flex flex-row mb-2">
                  <p className="text-md text-center mr-4 flex flex-row">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                    2:00 am
                  </p>
                  <p className="text-md text-center flex flex-row">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                    New
                  </p>
                </div>

                <h3 className="mb-4 font-extrabold text-xl text-center">A New Orangutan Home</h3>
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget luctus lacinia, nisi metus aliquet nunc, nec lacinia turpis turpis nec tortor. Donec auctor, ligula a tincidunt tincidunt, mi turpis ultricies tortor, ac lacinia odio libero et odio. Nullam in nunc eget nunc aliquam tincidunt. Nulla facilisi. Donec nec metus id lorem tincidunt dapibus. Nulla facilisi. Donec nec metus id lorem tincidunt dapibus.</p>
              </div>
            </div>

            {/* Second Event */}
            <div className="flex flex-row justify-evenly items-center w-full">
              <img className="object-cover" src="https://placehold.co/200x200" alt="Logo" width={200} height={200} />
              <div className="flex flex-col justify-center items-start w-1/2 ml-4">
                {/* Event Header */}
                <div className="flex flex-row mb-2">
                  <p className="text-md text-center mr-4 flex flex-row">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                    2:00 am
                  </p>
                  <p className="text-md text-center flex flex-row">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                    New
                  </p>
                </div>
                <h3 className="mb-2 font-extrabold text-xl text-center">Welcome Rhinoceros Hornbill</h3>
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget luctus lacinia, nisi metus aliquet nunc, nec lacinia turpis turpis nec tortor. Donec auctor, ligula a tincidunt tincidunt, mi turpis ultricies tortor, ac lacinia odio libero et odio. Nullam in nunc eget nunc aliquam tincidunt. Nulla facilisi. Donec nec metus id lorem tincidunt dapibus. Nulla facilisi. Donec nec metus id lorem tincidunt dapibus.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      {/* Footer */}
      <Footer />
    </div>  
  );
}