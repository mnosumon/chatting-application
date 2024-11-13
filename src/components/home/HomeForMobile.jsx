import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { BiMessageRoundedDots } from "react-icons/bi";
import { Link, Outlet } from "react-router-dom";
const HomeForMobile = ({ location }) => {
  return (
    <div className="flex md:hidden">
      <div className="w-1/5 flex flex-col items-center gap-10 py-10 bg-slate-500">
        <div
          className={`text-5xl cursor-pointer w-4/5 h-auto p-4 flex justify-center items-center rounded-full ${
            location.pathname == "/" || location.pathname == "/alluser"
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
  );
};

export default HomeForMobile;
