'use client';
import React, { useState } from 'react';

interface CreateFrameModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateFrameModal: React.FC<CreateFrameModalProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  const [file, setFile] = useState<string | undefined>();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  const handleOnClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === 'container') onClose();
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center "
    >
      <div className="mb-3 w-96 p-8 flex flex-col gap-8 bg-white">
        <p className="mb-2 inline-block text-black font-bold text-xl">Create Frame</p>
        <img src={file} />
        <input
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          type="file"
          id="formFile"
          onChange={handleChange}
        />
        <p className="text-black font-normat text-xl">Add suitable Frame Button</p>
        <span className="flex items-center justify-center  gap-5">
          <button
            className={`text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
              activeButton === 'post' ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => handleButtonClick('post')}
            disabled={activeButton === 'post'}
          >
            Post
          </button>
          <button
            className={`text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
              activeButton === 'link' ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => handleButtonClick('link')}
            disabled={activeButton === 'link'}
          >
            Link
          </button>
          <button
            className={`text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
              activeButton === 'postRedirect' ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => handleButtonClick('postRedirect')}
            disabled={activeButton === 'postRedirect'}
          >
            Post Redirect
          </button>
        </span>

        <button
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Create Frame
        </button>
      </div>
    </div>
  );
};

const CreateFrame: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-center bg-gradient-to-b from-gray-900 via-pink-700 to-white h-screen w-screen">
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
          onClick={() => setShowModal(true)}
        >
          Create Frame
        </button>
      </div>
      <CreateFrameModal onClose={() => setShowModal(false)} visible={showModal} />
    </div>
  );
};

export default CreateFrame;
