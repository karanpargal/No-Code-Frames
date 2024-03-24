'use client';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function MyFrames() {
  const [frames, setFrames] = useState<any[]>([]);
  const { address } = useAccount();

  console.log(address);

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/frames/renderUserFrames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress: address }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch frames');
        }

        const data = await response.json();
        if (data && data.data) {
          setFrames(data.data);
        }

        console.log(data.data);
      } catch (error) {
        console.error('Error fetching frames:', error);
      }
    };

    fetchFrames();
  }, [address]);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-pink-700 to-white h-screen p-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mb-4 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => window.history.back()}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>

      <h1 className="text-white text-center text-4xl mb-8">My Frames</h1>
      <div className="grid grid-cols-3 gap-4">
        {frames.map((frame: any) => (
          <div key={frame._id} className="bg-white rounded-lg shadow-md p-4 text-black">
            <h2 className="text-xl font-semibold mb-2">Frame</h2>
            <p className="mb-4">{frame.frame}</p>
            <a
              href={`http://localhost:3010/?url=http://localhost:3000/api/frames/fetchFrame/${frame._id}`}
              target="_blank"
              className="bg-blue-500 px-4 py-2 rounded-md text-white mt-2"
            >
              View Frame
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
