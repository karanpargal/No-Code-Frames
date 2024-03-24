import Link from 'next/link';
import Image from 'next/image';
import LandingImage from '../../assets/LandingImage.png';

const Landingpage = (): JSX.Element => {
  const features = [
    {
      title: 'No Code Frames',
      description: 'You can create your own frames without writing a single line of code.',
    },
    {
      title: 'Video frame creation using Livepeer',
      description: 'You can create video frames using Livepeer and store them on IPFS.',
    },
    {
      title: 'Custom POST URL',
      description: 'You can create custom POST URL for your frames and expand their usecases.',
    },
  ];

  return (
    <div className="bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100">
      <section className="h-screen">
        <div className="flex py-6 px-24 justify-between ">
          <h1 className="text-4xl text-gray-900 font-bold">No Code Frames</h1>
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
            <h1 className="text-5xl font-bold">Empower Your Creativity with Customizable Frames on Warpcaster.</h1>
            <p className="text-3xl font-normal text-emrald-600">
              Craft Engaging Experiences with Images, Videos, Buttons, and More!
            </p>
            <p className="text-xl font-semibold">Start Building Your Unique Frame Now</p>
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
      </section>

      <section className="">
        <div className="flex flex-col gap-4 justify-center items-center pb-20">
          <p className="text-4xl font-bold text-black mb-8">FEATURES</p>
          <div className="grid grid-cols-3 gap-8 justify-center items-center px-20 m-auto h-max ">
            {features.map(feature => (
              <div
                className="flex flex-col gap-x-6 justify-center items-center border-2 border-black py-6 mx-4 h-full shadow-[5px_5px_0px_0px_rgba(0,0,0)]"
                key={Math.random()}
              >
                <h1 className="text-2xl font-bold text-black text-center text-balance ">{feature.title}</h1>
                <p className="text-md text-center text-zinc-700 mt-2 text-balance">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landingpage;
