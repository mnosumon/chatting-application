import React from "react";
import AllUser from "../../components/home/AllUser";
import FriendRequest from "../../components/home/FriendRequest";
import Friends from "../../components/home/Friends";
import HomeForMobile from "../../components/home/HomeForMobile";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  return (
    <>
      <div className="w-full mx-auto">
        {/* Mobile view Mobile view Mobile view  Mobile view Mobile view Mobile view */}
        <HomeForMobile location={location} />
        {/* Desktop view Desktop view Desktop view Desktop view Desktop view Desktop view */}
        <div className="hidden  md:grid lg:grid-cols-[1fr,3fr] lg:gap-12">
          <div className="">
            <AllUser />
          </div>
          <div className="flex justify-between">
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
