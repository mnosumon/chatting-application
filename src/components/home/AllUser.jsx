import React, { useEffect, useState } from "react";
import { FriendsIcon } from "../../assets/svg/FriendsIcon";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getStorage, ref as Ref, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import AvaterImg from "../../assets/image/avater.jpg";

const AllUser = () => {
  const [allUser, setAllUser] = useState([]);
  const [frindList, setFrindList] = useState([]);
  const [cancelReq, setCancelReq] = useState(false);
  const [frindCancelReq, setFrindCancelReq] = useState([]);
  const user = useSelector((state) => state.user.value);
  const db = getDatabase();
  const storage = getStorage();

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const users = [];
      snapshot.forEach((item) => {
        if (item.key !== user.uid) {
          getDownloadURL(Ref(storage, item.key))
            .then((downloadURL) => {
              users.push({
                ...item.val(),
                id: item.key,
                photoURL: downloadURL,
              });
            })
            .catch((error) => {
              users.push({
                ...item.val(),
                id: item.key,
                photoURL: null,
              });
            })
            .then(() => {
              setAllUser([...users]);
            });
        }
      });
    });
  }, [db, allUser.uid, storage]);

  const handleFriendReqSent = (data) => {
    set(push(ref(db, "requestableFriends/")), {
      senderName: user.displayName,
      senderID: user.uid,
      senderPhoto: user.photoURL ?? AvaterImg,
      recieverName: data.name,
      recieverID: data.id,
      recieverPhoto: data.photoURL ?? AvaterImg,
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, "requestableFriends/");
    onValue(starCountRef, (snapshot) => {
      const friendsListArr = [];
      const friendsReqCancelArr = [];
      snapshot.forEach((item) => {
        friendsListArr.push(item.val().senderID + item.val().recieverID);
        friendsReqCancelArr.push({ ...item.val(), id: item.key });
      });
      setFrindList(friendsListArr);
      setFrindCancelReq(friendsReqCancelArr);
    });
  }, []);

  const handleCancelReq = (data) => {
    const reqToCancel = frindCancelReq.find(
      (item) => item.recieverID === data.id && item.senderID === user.uid
    );

    if (reqToCancel) {
      remove(ref(db, "requestableFriends/" + reqToCancel.id));
    }
  };

  return (
    <div className="bg-[#FBFBFB] px-4 pt-12 border shadow-md rounded-md">
      <h3 className="text-xl font-bold font-sans mb-5">All users</h3>

      {allUser?.map((item, index) => (
        <div key={index} className="flex justify-between items-center my-4">
          <div className="flex gap-5 items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                className="w-full h-full rounded-full object-cover"
                src={item.photoURL || AvaterImg}
              />
            </div>
            <div className="">
              <h3> {item.name}</h3>
            </div>
          </div>
          <div className="">
            {frindList.includes(item.id + user.uid) ||
            frindList.includes(user.uid + item.id) ? (
              <div onClick={() => handleCancelReq(item)}>
                <button>Cancel Requset</button>
              </div>
            ) : (
              <div
                onClick={() => handleFriendReqSent(item)}
                className="cursor-pointer"
              >
                <FriendsIcon />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUser;
