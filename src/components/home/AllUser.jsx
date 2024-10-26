import React, { useEffect, useState } from "react";
import { FriendsIcon } from "../../assets/svg/FriendsIcon";
import { getDatabase, ref, onValue } from "firebase/database";
import { getStorage, ref as Ref, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import AvaterImg from "../../assets/image/avater.jpg";

const AllUser = () => {
  const [user, setUser] = useState([]);
  const allUser = useSelector((state) => state.user.value);
  const db = getDatabase();
  const storage = getStorage();

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const users = [];
      snapshot.forEach((item) => {
        if (item.key !== allUser.uid) {
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
              setUser([...users]);
            });
        }
      });
    });
  }, [db, allUser.uid, storage]);
  return (
    <div className="bg-[#FBFBFB] px-4 pt-12 border shadow-md rounded-md">
      <h3 className="text-xl font-bold font-sans mb-5">All users</h3>

      {user?.map((item, index) => (
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
            <FriendsIcon />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUser;
