import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="bg-slate-400 flex justify-between items-center">
        <div className="">
          <h2 className="text-4xl">Logo</h2>
        </div>
        <div className="">
          <button className="py-2 px-3 text-base font-bold font-serif bg-orange-500 rounded-md">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
