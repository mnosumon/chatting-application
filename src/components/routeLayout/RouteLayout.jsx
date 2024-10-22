import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";

const RouteLayout = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-4/5">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default RouteLayout;
