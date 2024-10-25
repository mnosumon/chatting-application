import React, { useEffect, useState } from "react";
import { FriendsIcon } from "../../assets/svg/FriendsIcon";
import { getDatabase, ref, onValue } from "firebase/database";

const AllUser = () => {
  const [user, setUser] = useState();
  const db = getDatabase();
  console.log(user);

  useEffect(() => {
    const readData = ref(db, "users/");
    onValue(readData, (snapshot) => {
      const users = [];
      snapshot.forEach((item) => {
        users.push(item.val());
        setUser(users);
      });
    });
  }, []);
  return (
    <div className="bg-[#FBFBFB] px-4 pt-12 border shadow-md rounded-md">
      <h3 className="text-xl font-bold font-sans mb-5">All users</h3>
      <div className="">
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-x-2 items-center">
            <div className="w-10 h-10 rounded-full bg-sky-400"></div>
            <h4 className="text-lg font-sans">shfkjashf</h4>
          </div>
          <div className="text-[#292D32]">
            <FriendsIcon />
          </div>
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-x-2 items-center">
            <div className="w-10 h-10 rounded-full bg-sky-400"></div>
            <h4 className="text-lg font-sans">Md Helal</h4>
          </div>
          <div className="text-[#292D32]">
            <FriendsIcon />
          </div>
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-x-2 items-center">
            <div className="w-10 h-10 rounded-full bg-sky-400"></div>
            <h4 className="text-lg font-sans">Md Helal</h4>
          </div>
          <div className="text-[#292D32]">
            <FriendsIcon />
          </div>
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-x-2 items-center">
            <div className="w-10 h-10 rounded-full bg-sky-400"></div>
            <h4 className="text-lg font-sans">Md Helal</h4>
          </div>
          <div className="text-[#292D32]">
            <FriendsIcon />
          </div>
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-x-2 items-center">
            <div className="w-10 h-10 rounded-full bg-sky-400"></div>
            <h4 className="text-lg font-sans">Md Helal</h4>
          </div>
          <div className="text-[#292D32]">
            <FriendsIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
