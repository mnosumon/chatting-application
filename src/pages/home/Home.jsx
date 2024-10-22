import React from "react";
import AllUser from "../../components/home/AllUser";
import FriendRequest from "../../components/home/FriendRequest";
import Friends from "../../components/home/Friends";

const Home = () => {
  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-[1fr,3fr]">
          <div className="">
            <AllUser />
          </div>
          <div className="">
            <div className="">
              <FriendRequest />
            </div>
            <div className="">
              <Friends />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
