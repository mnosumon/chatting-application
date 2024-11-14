import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";

const RouteLayout = () => {
  return (
    <div className="flex items-center justify-center md:pt-10 lg:pt-0 lg:h-screen">
      <div className="w-full md:w-[96%] lg:w-4/5">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default RouteLayout;
