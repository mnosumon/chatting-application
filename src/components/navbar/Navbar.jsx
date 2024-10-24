import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutAuth } from "../../features/slice/loginSlice/signInAuthSlice";
import { ProfileIcon } from "../../assets/svg/ProfileIcon";
import { MessageIcon } from "../../assets/svg/MessageIcon";
import { LogoutIcon } from "../../assets/svg/LogoutIcon";
import { CameraIcon } from "../../assets/svg/CameraIcon";
import { getAuth, signOut } from "firebase/auth";
import Modal from "./modal/Modal";
import { createPortal } from "react-dom";

const Navbar = () => {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        dispatch(logoutAuth());
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <nav className="bg-[#000] w-full py-2 relative">
      <div className="w-4/5 flex justify-between items-center mx-auto">
        <div className="flex gap-x-3 items-center">
          <div className="w-20 h-20 rounded-full bg-white relative">
            <div
              onClick={() => setModalShow(true)}
              className="text-[#2D2D2D] absolute bottom-0 right-0 w-7 h-7 rounded-full bg-red-600 flex items-center justify-center cursor-pointer"
            >
              <CameraIcon />
            </div>
            {createPortal(
              modalShow && <Modal setModalShow={setModalShow} />,
              document.body
            )}
          </div>
          <h2 className="text-xl text-white font-bold font-serif">
            Md Nuruddin Osman
          </h2>
        </div>
        <div className="flex items-center gap-x-4">
          <Link
            to="/"
            className={` w-12 h-12  rounded-full flex items-center justify-center cursor-pointer ${
              location.pathname == "/"
                ? "bg-[#6CD0FB] text-[#FFF]"
                : "bg-[#FFF] text-[#6CD0FB]"
            }`}
          >
            <ProfileIcon />
          </Link>
          <Link
            to="/message"
            className={` w-12 h-12  rounded-full flex items-center justify-center cursor-pointer ${
              location.pathname == "/message"
                ? "bg-[#6CD0FB] text-[#FFF]"
                : "bg-[#FFF] text-[#6CD0FB]"
            }`}
          >
            <MessageIcon />
          </Link>
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
