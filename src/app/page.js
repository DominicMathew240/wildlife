import Image from "next/image";
import { React } from "react";
import Header from "./components/Header";
import CarouselAnimal from "./components/CarouselAnimal";
import Footer from "./components/Footer";
import CarouselHero from "./components/CarouselHero";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* contact detail and login */}
      <section className="cls bg-gray-800 w-full p-4 text-sm">
        <div className="flex flex-row justify-between items-center w-full text-gray-400">
          <div className="flex flex-row items-center gap-4">
            <p>Contact Us: +60 12-345-6789</p>
            <p>Email: info@sarawakforestry.com</p>
            <p>Lot 391, Jalan Perbananan</p>
          </div>

          {/* 3 rows */}
          <div className="flex flex-row items-end gap-4 font-semibold">
            <p className="hover:text-yellow-400">Login</p>
            <p>/</p>
            <p className="hover:text-yellow-400">Register</p>
            <p>/</p>
            <p className="hover:text-yellow-400">Donate</p>
          </div>
        </div>
      </section>


      {/* Header */}
      <Header />

      {/* Hero Banner with carousel and text on the carousel */}
      <section className="relative flex flex-col justify-center items-center w-full text-white">
        <img className="object-cover h-screen" src="https://plus.unsplash.com/premium_photo-1674864875568-374ab9e9dcbc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" width={2000} height={1000} />
        <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="absolute w-4/5 flex flex-row justify-between items-center">
              {/* First column - Carousel Text */}
              <div className="w-1/2">
                <h1 className="text-md uppercase font-extrabold text-yellow-300">Discover the Wonders of the Borneo Kingdom</h1>
                <p className="text-8xl font-bold">New Wildlife Experience of Joy</p>
                <a className="text-white mt-10 font-semibold bg-orange-600 p-4 hover:bg-orange-700 inline-block">Learn More</a>
              </div>

              {/* Second column - Carousel Button*/}
              <div className="flex flex-col justify-center items-end text-right ml-10">
                {/* Left Button */}
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-16 h-16 mb-6">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clip-rule="evenodd" />
                  </svg>
                </div>

                {/* Right Button */}
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-16 h-16">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clip-rule="evenodd" />
                  </svg>
                </div>
                
              </div>
            </div>
      </section>

      {/* Test CarouselHero */}
      <CarouselHero />

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
          <hr className="w-[80px] border-2 border-red-500 mb-6" />
          <h2 className="mb-10 font-bold text-4xl">Orangutan Oasis: Protecting Wildlife, Empowering Communities</h2>
          <p className="text-2xl">
            Orangutan Oasis is a groundbreaking project focused on protecting Bornean orangutans, restoring 
            habitats, and promoting sustainable tourism at Semenggoh Nature Reserve. Combining advanced technology, community 
            engagement, and responsible tourism, the project creates a balanced ecosystem where wildlife thrives, tourists learn, 
            and local communities contribute to conservation.
          </p>
          {/* Hero 3 List info */}
          <div className="flex flex-col text-xl mt-10">
            {/* Hero List 1 */}
            <div className="flex flex-row items-center mt-4">
              <div className="rounded-full p-2 bg-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <p className="ml-4">Real-Time Wildlife Monitoring: AI-powered tools track orangutans and detect threats for better protection.</p>
            </div>

            {/* Hero List 2  */}
            <div className="flex flex-row items-center mt-4">
              <div className="rounded-full p-2 bg-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <p className="ml-4">Eco-Friendly Tourism: Mobile apps offer live wildlife updates, conservation tips, and education for visitors.</p>
            </div>

            {/* Hero List 3 */}
            <div className="flex flex-row items-center mt-4">
              <div className="rounded-full p-2 bg-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <p className="ml-4">Community Involvement: Local communities participate in eco-tourism and conservation efforts.</p>
            </div>

          </div>
        </div>

        <div className="flex justify-center items-center w-1/2">
          <img className="object-cover h-4/5 rounded-full hover:bg-white hover:opacity-80" src="https://images.unsplash.com/photo-1678365924276-f02b29287859?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" width={500} height={500} />
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
            <img className="object-cover w-full h-[626px]" src="https://images.unsplash.com/photo-1500463959177-e0869687df26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" width={800} height={400} />
            <div className="absolute ml-20 top-1/2 left-2/3 transform -translate-y-1/2 -translate-x-1/2 w-[300px] flex flex-col justify-center text-white items-start">
              <hr className="w-[80px] my-4 border-2 border-green-400" />
              <h3 className="mb-4 font-extrabold text-6xl">CHECK OUR UPCOMING EVENTS</h3>
              <a href="/pages/event" className="text-white font-semibold bg-green-400 p-2 hover:bg-green-600 inline-block">View Event</a>
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