'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import homeImage from '../../public/homeImage.jpg';
import defaultImageIcon from '../../public/default-image-icon.jpg';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface ButtonData {
  label: string;
  action: string;
  target?: string;
}

export default function Home() {
  const [file, setFile] = useState<string | undefined>(undefined);
  const { address } = useAccount();
  const [buttons, setButtons] = useState<ButtonData[]>([]);
  const [buttonOptions, setButtonOptions] = useState<string[]>(['Post', 'Post Redirect', 'Link']);
  const [inputText, setInputText] = useState<string>('');
  const [postUrl, setPostUrl] = useState<string>('http://localhost:3000/api/frames/renderFrame');
  const [showInputText, setShowInputText] = useState<boolean>(false);
  const [showButtonOptions, setShowButtonOptions] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const addNewButton = (data: ButtonData) => {
    if (buttons.length < 4) {
      setButtons([...buttons, data]);
      setShowButtonOptions(false);
    }
  };

  const handleCreateFrame = async () => {
    const res = await axios.post('http://localhost:3000/api/frames/createFrame', {
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEBqYEUHs9SPync2bo8AmdYjzW5WYicOWF8lreCXnMcQ&s',
      buttons: buttons ? buttons : [],
      inputText: inputText,
      post_url: postUrl,
      walletAddress: '0xAcEf0600cF20d5236111cCeE4Ce54013C9123e62',
    });
    console.log(res);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-pink-700 to-white h-screen p-8">
      <div className="flex justify-center items-stretch">
        <div className="flex-1 bg-[#fdf3ea] py-10 pl-20">
          <p className="font-mono text-[#291e62] text-6xl font-bold">LET&apos;S START </p>

          <p className="font-mono text-[#291e62] text-6xl font-bold">CREATING FRAMES</p>
          <p className="font-mono text-[#291e62] text-3xl font-normal mt-14">How about creating a frame?</p>
          <div className="w-[600px] h-[400px] relative mt-10">
            <Image src={homeImage} alt="" layout="fill" objectFit="cover" />
          </div>
        </div>
        {address ? (
          <div className="flex flex-col w-1/2 items-start bg-[#f2d054] py-10 pl-20 gap-y-4">
            <p className="mb-8 font-bold text-[#291e62] text-2xl">Upload Image</p>
            <div className="border border-gray-300 rounded-lg w-[300px] h-[200px] relative">
              <img
                src={file || (defaultImageIcon.src as string)}
                alt="Default Image"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="pt-10">
              <input
                className="relative m-0 block min-w-0 flex-auto rounded border border-solid border-gray-300 bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="formFile"
                onChange={handleChange}
              />
            </span>
            <div className="flex flex-wrap items-center justify-start gap-5">
              {buttons.map((button, index) => (
                <div className="flex gap-x-2" key={index}>
                  <button
                    key={index}
                    onClick={() => setButtons(buttons.filter((_, i) => i !== index))}
                    className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    {button.action.toUpperCase()}
                  </button>
                  <input
                    type="text"
                    placeholder="Enter label"
                    className="px-2 h-10 rounded-lg text-black"
                    onChange={e => {
                      const newButtons = [...buttons];
                      newButtons[index].label = e.target.value;
                      setButtons(newButtons);
                    }}
                  />
                  <input
                    type="text"
                    placeholder={button.action === 'Link' ? 'Enter Link' : 'Enter POST URL'}
                    className="px-2 h-10 rounded-lg text-black"
                    onChange={
                      button.action === 'link'
                        ? e => {
                            const newButtons = [...buttons];
                            newButtons[index].target = e.target.value;
                            setButtons(newButtons);
                          }
                        : e => {
                            const newButtons = [...buttons];
                            newButtons[index].action = e.target.value;
                            setButtons(newButtons);
                          }
                    }
                  />
                </div>
              ))}
            </div>

            {showButtonOptions && buttons.length < 4 && (
              <div className="flex flex-wrap items-center justify-center gap-5">
                {buttonOptions.map((option, index) => (
                  <button
                    key={index}
                    className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => addNewButton({ label: option, action: option })}
                  >
                    {option}
                  </button>
                ))}
                <button
                  onClick={() => setShowButtonOptions(false)}
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Cancel
                </button>
              </div>
            )}

            {showInputText && (
              <div className="flex flex-wrap items-center justify-center gap-5">
                <input
                  type="text"
                  placeholder="Enter input field text"
                  className="px-2 h-10 rounded-lg text-black h-full"
                  onChange={e => setInputText(e.target.value)}
                />
                <button
                  onClick={() => setShowInputText(false)}
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4  focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Cancel
                </button>
              </div>
            )}

            {!showButtonOptions && buttons.length < 4 && (
              <div className=" flex gap-x-4">
                <button
                  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
                  onClick={() => setShowButtonOptions(true)}
                >
                  Add button to frame
                </button>
                <button
                  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
                  onClick={() => setShowInputText(true)}
                >
                  Add Input to frame
                </button>
              </div>
            )}
            <input
              type="text"
              placeholder="Enter Custom Post URL"
              className="px-2 h-10 rounded-lg text-black w-60"
              onChange={e => setPostUrl(e.target.value)}
            />
            <small className="text-zinc-600 text-xs mt-1">
              If not provided, the data will be posted to the default
            </small>
            <button
              type="button"
              className=" text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-bold rounded-lg text-lg px-5 py-2.5 text-center me-2"
              onClick={() => handleCreateFrame()}
            >
              Create Frame
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-1/2 items-start bg-[#f2d054] py-10 pl-20 gap-y-4">
            <ConnectButton />
          </div>
        )}
      </div>
    </div>
  );
}
