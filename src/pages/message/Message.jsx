import React from "react";
import Friends from "../../components/home/Friends";
import SendMessage from "../../components/message/SendMessage";

const Message = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr,3fr] gap-x-12">
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
