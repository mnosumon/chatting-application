import React from "react";
import AllUser from "../../components/home/AllUser";
import FriendRequest from "../../components/home/FriendRequest";
import Friends from "../../components/home/Friends";
import { FaUserFriends } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { BiMessageRoundedDots } from "react-icons/bi";
import { Link, Outlet, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  return (
    <>
      <div className="w-full mx-auto">
        {/* Mobile view Mobile view Mobile view  Mobile view Mobile view Mobile view */}
        <div className="flex md:hidden">
          <div className="w-1/5 flex flex-col items-center gap-10 py-10 bg-slate-500">
            <div
              className={`text-5xl cursor-pointer w-4/5 h-auto p-4 flex justify-center items-center rounded-full ${
                location.pathname == "/alluser"
                  ? "bg-[#6CD0FB] text-[#FFF]"
                  : "bg-white text-[#60c737]"
              }`}
            >
              <Link to="/alluser">
                <FaUsers />
              </Link>
            </div>
            <div
              className={`text-5xl cursor-pointer w-4/5 h-auto p-4 flex justify-center items-center rounded-full ${
                location.pathname == "/friendrequest"
                  ? "bg-[#6CD0FB] text-[#FFF]"
                  : "bg-white text-[#60c737]"
              }`}
            >
              <Link to="/friendrequest">
                <FaUserFriends />
              </Link>
            </div>
            <div
              className={`text-5xl cursor-pointer w-4/5 h-auto p-4 flex justify-center items-center rounded-full ${
                location.pathname == "/sentmessage"
                  ? "bg-[#6CD0FB] text-[#FFF]"
                  : "bg-white text-[#60c737]"
              }`}
            >
              <Link to="/sentmessage">
                <BiMessageRoundedDots />
              </Link>
            </div>
          </div>
          <div className="md:hidden w-4/5">
            <Outlet />
          </div>
        </div>
        {/* Desktop view Desktop view Desktop view Desktop view Desktop view Desktop view */}
        <div className="hidden  md:grid grid-cols-[1fr,3fr] gap-x-12">
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
