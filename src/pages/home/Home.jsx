import React from "react";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-4/5">
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default Home;
