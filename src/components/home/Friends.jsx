import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import AvaterImg from "../../assets/image/avater.jpg";
import { friendAction } from "../../features/slice/sentMessageSlice/sentMessageSlice";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [activeFriend, setActiveFriend] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

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
  }, [user.uid, db]);

  const handleFriendSentMessage = (data) => {
    if (user.uid === data.recieverID) {
      dispatch(
        friendAction({
          status: "single",
          name: data.senderName,
          id: data.senderID,
          photo: data.senderPhoto,
        })
      );
      localStorage.setItem(
        "friend",
        JSON.stringify({
          status: "single",
          name: data.senderName,
          id: data.senderID,
          photo: data.senderPhoto,
        })
      );
    } else {
      dispatch(
        friendAction({
          status: "single",
          name: data.recieverName,
          id: data.recieverID,
          photo: data.recieverPhoto,
        })
      );
      localStorage.setItem(
        "friend",
        JSON.stringify({
          status: "single",
          name: data.recieverName,
          id: data.recieverID,
          photo: data.recieverPhoto,
        })
      );
    }
    setActiveFriend(data.id);
  };

  return (
    <div className="mt-5">
      <div className="bg-[#FBFBFB] px-4 pt-8 border shadow-md rounded-md">
        <h3 className="text-xl font-bold font-sans mb-5">Friends</h3>
        <div className="">
          {friends?.map((item) => (
            <div
              onClick={() => handleFriendSentMessage(item)}
              key={item.id}
              className={`flex justify-between items-center mb-3 rounded-md py-1 px-2 hover:bg-green-600 ${
                location.pathname == "/message" ? "cursor-pointer" : ""
              } ${activeFriend === item.id ? "bg-green-600" : ""}`}
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
