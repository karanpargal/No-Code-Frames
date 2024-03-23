import React from 'react';
import Link from 'next/link';
import home from '@/app/home/page';

const Landingpage = (): JSX.Element => {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-pink-700 to-white h-screen">
      <div className="flex justify-around py-6 items-center ">
        <h1 className="text-4xl">logo</h1>
        <Link href="/home">
          <button className="relative px-6 py-4 overflow-hidden font-medium text-gray-900 bg-gray-100/80 rounded-full shadow-inner group">
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 group-hover:w-full ease"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-400  group-hover:w-full ease"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-400 delay-400 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-400 delay-400 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute inset-0 w-full h-full duration-400 delay-400 bg-white opacity-0 group-hover:opacity-100"></span>
            <span className="relative transition-colors duration-400 delay-400 group-hover:text-pink-700 ease text-lg font-semibold">
              Launch Button
            </span>
          </button>
        </Link>
      </div>

      <div className="flex flex-col items-center mt-16 gap-y-4 text-gray-100 font-Caudex">
        <h1 className="text-5xl  ">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
        <p className="text-3xl font-normal text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elite</p>
        <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elite</p>
      </div>
    </div>
  );
};

export default Landingpage;
