import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import AvaterImg from "../../assets/image/avater.jpg";

const FriendRequest = () => {
  const user = useSelector((state) => state.user.value);
  const [friendRequestAbleList, setFriendRequestAbleList] = useState([]);

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "requestableFriends/");
    onValue(starCountRef, (snapshot) => {
      const friendRequestAbleArr = [];
      snapshot.forEach((item) => {
        if (user.uid === item.val().recieverID) {
          friendRequestAbleArr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendRequestAbleList(friendRequestAbleArr);
    });
  }, [db, user.uid]);
  return (
    <div className="mt-5">
      <div className="bg-[#FBFBFB] px-4 pt-8 border shadow-md rounded-md">
        <h3 className="text-xl font-bold font-sans mb-5">Friends Request</h3>
        {friendRequestAbleList?.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-3">
            <div className="flex gap-x-2 items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={item.senderPhoto || AvaterImg}
                />
              </div>
              <h4 className="text-lg font-sans">{item.senderName}</h4>
            </div>
            <div className="flex items-center gap-x-2">
              <button className="text-base font-sans py-1 px-3 bg-[#4A81D3] text-white rounded-md">
                Accept
              </button>
              <button className="text-base font-sans py-1 px-3 bg-[#D34A4A] text-white rounded-md">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequest;
