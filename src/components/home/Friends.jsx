import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import AvaterImg from "../../assets/image/avater.jpg";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      const friendsArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid === item.val().senderID ||
          user.uid === item.val().recieverID
        ) {
          friendsArr.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(friendsArr);
    });
  }, []);

  return (
    <div className="mt-5">
      <div className="bg-[#FBFBFB] px-4 pt-8 border shadow-md rounded-md">
        <h3 className="text-xl font-bold font-sans mb-5">Friends</h3>
        <div className="">
          {friends?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-3"
            >
              <div className="flex gap-x-2 items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={
                      user.uid === item.senderID
                        ? item.recieverPhoto || AvaterImg
                        : item.senderPhoto || AvaterImg
                    }
                  />
                </div>
                <h4 className="text-lg font-sans">
                  {user.uid === item.senderID
                    ? item.recieverName
                    : item.senderName}
                </h4>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;
