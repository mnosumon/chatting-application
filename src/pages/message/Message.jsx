import React from "react";
import Friends from "../../components/home/Friends";

const Message = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr,3fr] gap-x-12">
        <div className="">
          <Friends />
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Message;
