import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAuth } from "../../features/slice/loginSlice/signInAuthSlice";
import { ProfileIcon } from "../../assets/svg/ProfileIcon";
import { MessageIcon } from "../../assets/svg/MessageIcon";
import { LogoutIcon } from "../../assets/svg/LogoutIcon";
import { CameraIcon } from "../../assets/svg/CameraIcon";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    navigate("/login");
    dispatch(logoutAuth());
  };
  return (
    <nav className="bg-[#000] w-full py-2">
      <div className="w-4/5 flex justify-between items-center mx-auto">
        <div className="flex gap-x-3 items-center">
          <div className="w-20 h-20 rounded-full bg-white relative">
            <div className="text-[#2D2D2D] absolute bottom-0 right-0 w-7 h-7 rounded-full bg-red-600 flex items-center justify-center cursor-pointer">
              <CameraIcon />
            </div>
          </div>
          <h2 className="text-xl text-white font-bold font-serif">
            Md Nuruddin Osman
          </h2>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="text-[#FFF] w-12 h-12 bg-[#6CD0FB] rounded-full flex items-center justify-center cursor-pointer">
            <ProfileIcon />
          </div>
          <div className="text-[#FFF] w-12 h-12 bg-[#6CD0FB] rounded-full flex items-center justify-center cursor-pointer">
            <MessageIcon />
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="text-[#4A81D3]">
            <LogoutIcon />
          </div>
          <button
            onClick={handleLogout}
            className="text-white text-base font-serif"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
