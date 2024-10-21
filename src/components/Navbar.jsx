import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAuth } from "../features/slice/loginSlice/signInAuthSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    navigate("/login");
    dispatch(logoutAuth());
  };
  return (
    <nav>
      <div className="bg-slate-400 flex justify-between items-center">
        <div className="">
          <h2 className="text-4xl">Logo</h2>
        </div>
        <div className="">
          <button
            onClick={handleLogout}
            className="py-2 px-3 text-base font-bold font-serif bg-orange-500 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
