import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutAuth } from "../../features/slice/loginSlice/signInAuthSlice";
import { ProfileIcon } from "../../assets/svg/ProfileIcon";
import { MessageIcon } from "../../assets/svg/MessageIcon";
import { LogoutIcon } from "../../assets/svg/LogoutIcon";
import { CameraIcon } from "../../assets/svg/CameraIcon";
import { getAuth, signOut } from "firebase/auth";
import Modal from "./modal/Modal";
import { createPortal } from "react-dom";
import AvaterImg from "../../assets/image/avater.jpg";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = getAuth();
  const user = useSelector((state) => state.user.value);

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
      <div className="w-11/12 flex justify-around md:justify-between items-center mx-auto gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex gap-x-3 items-center">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full relative">
              <img
                className="w-full h-full rounded-full object-cover"
                src={user.photoURL || AvaterImg}
                alt="Profile photo"
              />
              <div
                onClick={() => setModalShow(true)}
                className="text-[#f5f5f5] absolute bottom-0 right-0 w-4 h-4 md:w-7 md:h-7 rounded-full bg-slate-600 flex items-center justify-center cursor-pointer"
              >
                <CameraIcon />
              </div>
              {createPortal(
                modalShow && <Modal setModalShow={setModalShow} />,
                document.body
              )}
            </div>
            <h2 className="text-xl text-white font-bold font-serif">
              {user.displayName}
            </h2>
          </div>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="text-2xl md:hidden z-50 transition-all duration-500 ease-in-out"
          >
            <div
              className={`text-white transform ${
                open ? "rotate-180 " : "rotate-0 "
              } transition-all duration-500 ease-in-out`}
            >
              {open ? <FaTimes /> : <FaBars />}
            </div>
          </button>
        </div>
        <div className="hidden md:flex items-center gap-x-4">
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
        <div className="hidden md:flex items-center gap-x-2">
          <div className="text-[#4A81D3]">
            <LogoutIcon />
          </div>
          <button
            onClick={handleLogout}
            className="text-white text-base font-serif bg-orange-500 py-2 px-4 rounded-md hover:bg-orange-600"
          >
            Log Out
          </button>
        </div>
        {/* Mobile View Mobile View Mobile View Mobile View */}
        <div
          className={`absolute top-full w-full bg-amber-900 transition-transform duration-500 transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="w-11/12 mx-auto space-y-4 py-4 md:hidden flex flex-col items-end">
            <div className="md:hidden flex flex-col justify-center  gap-4">
              <Link
                onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
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
            <div className="md:hidden">
              <button
                onClick={handleLogout}
                className="text-white text-base font-serif bg-orange-500 py-2 px-4 rounded-md hover:bg-yellow-700"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
