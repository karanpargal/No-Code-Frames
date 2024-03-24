'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import homeImage from '../../../public/homeImage.jpg';
import defaultImageIcon from '../../../public/default-image-icon.jpg';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { toast } from 'react-toastify';

interface ButtonData {
  label: string;
  action: string;
  target?: string;
}

export default function Home() {
  const [file, setFile] = useState<string | undefined>(undefined);
  const [cid, setCid] = useState('');
  const [uploading, setUploading] = useState(false);
  const { address } = useAccount();
  const [buttons, setButtons] = useState<ButtonData[]>([]);
  const [buttonOptions, setButtonOptions] = useState<string[]>(['Post', 'Post Redirect', 'Link']);
  const [inputText, setInputText] = useState<string>('');
  const [postUrl, setPostUrl] = useState<string>('http://localhost:3000/api/frames/renderFrame');
  const [showInputText, setShowInputText] = useState<boolean>(false);
  const [showButtonOptions, setShowButtonOptions] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      // uploadFile(e.target.files[0]);
    }
  };

  const addNewButton = (data: ButtonData) => {
    if (buttons.length < 4) {
      setButtons([...buttons, data]);
      setShowButtonOptions(false);
    }
  };

  const handleCreateFrame = async () => {
    try {
      if (!file) {
        alert('Please upload an image.');
        return;
      }

      setUploading(true);
      const fileToUpload = await fetch(file);
      const blob = await fileToUpload.blob();
      const formData = new FormData();
      formData.append('file', blob);

      const uploadRes = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error('Failed to upload file');
      }

      const uploadResData = await uploadRes.json();
      console.log(`https://gateway.pinata.cloud/ipfs/${uploadResData.IpfsHash}`);
      setCid(uploadResData.IpfsHash);

      const res = await axios.post('http://localhost:3000/api/frames/createFrame', {
        imageUrl: `https://gateway.pinata.cloud/ipfs/${uploadResData.IpfsHash}`,
        buttons: buttons ? buttons : [],
        inputText: inputText,
        post_url: postUrl,
        walletAddress: address,
      });

      console.log(res);
      setUploading(false);
    } catch (error) {
      console.error('Error creating frame:', error);
      setUploading(false);
      alert('Failed to create frame. Please try again.');
    }
  };

  // const uploadFile = async (fileToUpload: File) => {
  //   try {
  //     setUploading(true);
  //     const data = new FormData();
  //     console.log('Started');
  //     data.set('file', fileToUpload);
  //     const res = await fetch('/api/files', {
  //       method: 'POST',
  //       body: data,
  //     });
  //     const resData = await res.json();
  //     setCid(resData.IpfsHash);
  //     console.log(resData.IpfsHash);
  //     setUploading(false);
  //   } catch (e) {
  //     console.log(e);
  //     setUploading(false);
  //     alert('Trouble uploading file');
  //   }
  // };

  return (
    <div className="bg-white">
      <nav>
        <div className="flex items-center justify-between p-4 bg-transparent backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <a href="/" className="text-black hover:underline hover:underline-offset-2 text-lg font-bold">
              Frames Creator
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/dashboard/home"
              className="text-black hover:underline hover:underline-offset-2 text-lg font-bold hover:scale-110 transition-all duration-300"
            >
              Home
            </a>
            <a
              href="/dashboard/myFrames"
              className="text-black hover:underline hover:underline-offset-2 text-lg font-bold hover:scale-110 transition-all duration-300"
            >
              My Frames
            </a>
            <ConnectButton />
          </div>
        </div>
      </nav>
      <div className=" h-screen px-8 py-2">
        <div className="flex justify-center items-stretch border-4 border-black rounded-sm">
          <div className="flex-1 py-10 pl-20 border-r-2">
            <p className="font-mono text-black text-6xl font-bold">No Code Frames</p>
            <p className="font-mono text-black text-3xl font-normal mt-4 w-[80%]">
              Use our platform to create frames under 1 min
            </p>
            <div className="w-[400px] h-[400px] relative mt-10">
              <Image src={homeImage} alt="" layout="fill" objectFit="cover" />
            </div>
          </div>
          {address ? (
            <div className="flex flex-col w-1/2 items-start py-10 pl-20 gap-y-4 border-l-2">
              <p className="mb-4 font-bold text-[#291e62] text-2xl">Upload Image</p>
              <div className="border border-gray-300 rounded-lg w-[300px] h-[200px] relative">
                <img
                  src={file || (defaultImageIcon.src as string)}
                  alt="Default Image"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="pt-4">
                <input
                  className="relative m-0 block min-w-0 flex-auto rounded border border-solid border-gray-300 bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-500 file:cursor-pointer focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  id="formFile"
                  onChange={handleFileChange}
                />
              </span>
              <div className="flex flex-wrap items-center justify-start gap-5">
                {buttons.map((button, index) => (
                  <div className="flex gap-x-2" key={index}>
                    <button
                      key={index}
                      onClick={() => setButtons(buttons.filter((_, i) => i !== index))}
                      className="text-white bg-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      {button.action.toUpperCase()}
                    </button>
                    <input
                      type="text"
                      placeholder="Enter label"
                      className="px-2 h-10 rounded-lg text-black border-2 border-black"
                      onChange={e => {
                        const newButtons = [...buttons];
                        newButtons[index].label = e.target.value;
                        setButtons(newButtons);
                      }}
                    />
                    <input
                      type="text"
                      placeholder={button.action === 'Link' ? 'Enter Link' : 'Enter POST URL'}
                      className="px-2 h-10 rounded-lg text-black border-2 border-black"
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
                      className="text-white bg-black hover:scale-110 transition-all duration-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      onClick={() => addNewButton({ label: option, action: option })}
                    >
                      {option}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowButtonOptions(false)}
                    className="text-white bg-red-500 hover:bg-red-700 hover:scale-110 duration-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
                    className="px-2 h-10 rounded-lg text-black h-full border-2 border-black"
                    onChange={e => setInputText(e.target.value)}
                  />
                  <button
                    onClick={() => setShowInputText(false)}
                    className="text-white bg-red-500 hover:bg-red-700 hover:scale-110 duration-300 hover:bg-gradient-to-br focus:ring-4  focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {!showButtonOptions && buttons.length < 4 && (
                <div className=" flex gap-x-4">
                  <button
                    className="text-white bg-black hover:scale-110 transition-all duration-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
                    onClick={() => setShowButtonOptions(true)}
                  >
                    Add button to frame
                  </button>
                  <button
                    className="text-white bg-black hover:scale-110 transition-all duration-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
                    onClick={() => setShowInputText(true)}
                  >
                    Add Input to frame
                  </button>
                </div>
              )}
              <input
                type="text"
                placeholder="Enter Custom Post URL"
                className="px-2 h-10 rounded-lg text-black w-60 border-2 border-black"
                onChange={e => setPostUrl(e.target.value)}
              />
              <small className="text-zinc-600 text-xs mt-1">
                If not provided, the data will be posted to the default
              </small>
              <button
                type="button"
                className=" text-white bg-blue-500 hover:bg-blue-700 hover:scale-110 duration-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-bold rounded-lg text-lg px-5 py-2.5 text-center me-2"
                onClick={() => handleCreateFrame()}
              >
                Create Frame
              </button>
              {/* <button disabled={uploading} onClick={() => inputFile.current?.click()}>
              {uploading ? 'Uploading...' : 'Upload'}
            </button> */}
            </div>
          ) : (
            <div className="flex flex-col w-1/2 items-start bg-[#f2d054] py-10 pl-20 gap-y-4">
              <ConnectButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
