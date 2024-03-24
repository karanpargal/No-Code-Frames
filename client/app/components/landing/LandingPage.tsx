import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LandingImage from '../../assets/LandingImage.png';

const Landingpage = (): JSX.Element => {
  return (
    <div className="bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100 h-screen">
      <div className="flex py-6 px-24 justify-between ">
        <h1 className="text-4xl text-gray-900 ">logo</h1>
        <Link href="/dashboard/home">
          <button className="relative inline-block px-8 py-3 font-medium group text-xl">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
            <span className="relative text-black group-hover:text-white">Launch App</span>
          </button>
        </Link>
      </div>

      <div className="flex justify-between px-20 items-center m-auto mt-28 text-gray-900   ">
        <div className="flex flex-col gap-y-6  w-max">
          <h1 className="text-5xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <p className="text-3xl font-normal text-emrald-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elite
          </p>
          <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elite</p>
          <Link href="/dashboard/home">
            <button className="relative inline-block px-4 py-2 font-medium group">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
              <span className="relative text-black group-hover:text-white">Launch App</span>
            </button>
          </Link>
        </div>
        <div className="bg-{L}"></div>

        <div className="w-2/3">
          <Image src={LandingImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
