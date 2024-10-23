import React, { useRef } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";

const Modal = ({ setModalShow }) => {
  const fileRef = useRef();

  return (
    <div className="w-full h-screen bg-[#7875755d] flex items-center justify-center ">
      <div className="w-2/5 bg-white p-3 relative rounded-md">
        <div className="w-full mb-4">
          <h3 className="text-lg text-center font-serif text-[#2d2d2d]">
            Upload Photo
          </h3>
          <div
            onClick={() => setModalShow(false)}
            className="absolute right-2 top-2 cursor-pointer text-xl"
          >
            <IoMdCloseCircleOutline />
          </div>
        </div>
        <div className="border border-[#a19e9e] rounded-md">
          <div
            onClick={() => fileRef.current.click()}
            className="m-1 bg-slate-300 rounded-md h-60 flex items-center justify-center cursor-pointer"
          >
            <div className="flex justify-center items-center flex-col gap-1">
              <div className="">
                <CiImageOn />
              </div>
              <h4>Chose your photo</h4>
            </div>
            <div className="">
              <input ref={fileRef} className="hidden" type="file" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
