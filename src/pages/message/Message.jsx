import React, { useState } from "react";
import Friends from "../../components/home/Friends";
import SendMessage from "../../components/message/SendMessage";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Message = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full">
      <div className="md:hidden relative">
        <div onClick={() => setIsOpen(!isOpen)} className="px-5">
          <Friends />
        </div>
        {isOpen && (
          <div className="absolute top-0 left-0 w-full mt-3 px-5">
            <SendMessage />
            <div
              onClick={() => setIsOpen(false)}
              className="absolute -top-3 right-5 text-2xl"
            >
              <IoMdCloseCircleOutline />
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:grid grid-cols-[1fr,3fr] gap-x-12">
        <div className="">
          <Friends />
        </div>
        <div className="">
          <SendMessage />
        </div>
      </div>
    </div>
  );
};

export default Message;
