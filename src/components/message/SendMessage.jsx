import React from "react";
import { EmojiIcon } from "../../assets/svg/EmojiIcon";
import { ImageIcon } from "../../assets/svg/ImageIcon";

const SendMessage = () => {
  return (
    <div className="bg-white rounded-md shadow-md p-3">
      <div className="bg-[#2d2d2d] rounded-tl-md rounded-tr-md mt-2">
        <div className="flex items-center gap-3 py-2 ml-10">
          <div className="w-16 h-16 rounded-full bg-white"></div>
          <h2 className="text-xl text-white font-bold font-serif">
            Md Nuruddin Osman
          </h2>
        </div>
      </div>
      <div className="border rounded-bl-md rounded-br-md">
        <div className="h-72"></div>
        <div className="bg-[#F5F5F5] py-3 ">
          <div className="bg-white w-3/5 mx-auto flex justify-between items-center px-3 py-1">
            <div className="text-[#292D32] flex items-center gap-x-2 w-[12%]">
              <div className="cursor-pointer">
                <EmojiIcon />
              </div>
              <div className="cursor-pointer">
                <ImageIcon />
              </div>
            </div>
            <div className="w-[60%]">
              <input
                type="text"
                className="w-full py-1 px-5 text-base text-[#000] outline-none bg-[#bdbaba] rounded-full"
              />
            </div>
            <div className="w-[18%]">
              <button className="text-base font-sans py-1 px-5 bg-[#4A81D3] text-white rounded-md">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
