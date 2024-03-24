// MyFrames.tsx
'use client';
import React, { useEffect, useState } from 'react';

export default function MyFrames() {
  const [frames, setFrames] = useState<any[]>([]);

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/frames/renderUserFrames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress: '0xAcEf0600cF20d5236111cCeE4Ce54013C9123e62' }),
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
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-pink-700 to-white h-screen p-8">
      <h1 className="text-white text-center text-4xl mb-8">My Frames</h1>
      <div className="grid grid-cols-3 gap-4">
        {frames.map((frame: any) => (
          <div key={frame._id} className="bg-white rounded-lg shadow-md p-4 text-black">
            <h2 className="text-xl font-semibold mb-2">Frame</h2>
            <p>{frame.frame}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
