import React from "react";
import AllUser from "../../components/home/AllUser";
import FriendRequest from "../../components/home/FriendRequest";
import Friends from "../../components/home/Friends";

const Home = () => {
  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-[1fr,3fr] gap-x-12">
          <div className="">
            <AllUser />
          </div>
          <div className="flex justify-between mr-10">
            <div className="w-[48%]">
              <FriendRequest />
            </div>
            <div className="w-[48%]">
              <Friends />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
