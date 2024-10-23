import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Friends = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="mt-5">
      <div className="bg-[#FBFBFB] px-4 pt-8 border shadow-md rounded-md">
        <h3 className="text-xl font-bold font-sans mb-5">Friends</h3>
        <div className="">
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-x-2 items-center">
              <div className="w-10 h-10 rounded-full bg-sky-400"></div>
              <h4 className="text-lg font-sans">Md Helal</h4>
            </div>
            <div>
              {location.pathname == "/" ? (
                <button
                  onClick={() => {
                    navigate("/message");
                  }}
                  className="text-base font-sans py-1 px-3 bg-[#4A81D3] text-white rounded-md"
                >
                  Message
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-x-2 items-center">
              <div className="w-10 h-10 rounded-full bg-sky-400"></div>
              <h4 className="text-lg font-sans">Md Helal</h4>
            </div>
            <div>
              {location.pathname == "/" ? (
                <button
                  onClick={() => {
                    navigate("/message");
                  }}
                  className="text-base font-sans py-1 px-3 bg-[#4A81D3] text-white rounded-md"
                >
                  Message
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-x-2 items-center">
              <div className="w-10 h-10 rounded-full bg-sky-400"></div>
              <h4 className="text-lg font-sans">Md Helal</h4>
            </div>
            <div>
              {location.pathname == "/" ? (
                <button
                  onClick={() => {
                    navigate("/message");
                  }}
                  className="text-base font-sans py-1 px-3 bg-[#4A81D3] text-white rounded-md"
                >
                  Message
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
