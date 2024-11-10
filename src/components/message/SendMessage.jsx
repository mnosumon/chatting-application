import React, { useEffect, useState } from "react";
import { EmojiIcon } from "../../assets/svg/EmojiIcon";
import { ImageIcon } from "../../assets/svg/ImageIcon";
import AvaterImg from "../../assets/image/avater.jpg";
import Nuture01 from "../../assets/image/nutute01.jpg";
import Nuture02 from "../../assets/image/nutute02.jpg";
import Nuture03 from "../../assets/image/nutute03.jpg";
import { useSelector } from "react-redux";
import { getDatabase, push, ref, set, onValue } from "firebase/database";

const SendMessage = () => {
  const friend = useSelector((state) => state.firend.value);
  const user = useSelector((state) => state.user.value);
  const [text, setText] = useState("");
  const [friends, setFriends] = useState([]);

  const db = getDatabase();
  const date = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;

  const handleMessageSent = () => {
    if (friend?.status === "single") {
      set(push(ref(db, "message")), {
        whoSenderName: user.displayName,
        whoSenderId: user.uid,
        whoRecieverName: friend.name,
        whoRecieverId: friend.id,
        message: text,
        time: date,
      });
    }
    setText("");
  };

  useEffect(() => {
    const starCountRef = ref(db, "message/");
    onValue(starCountRef, (snapshot) => {
      const messageArr = [];
      snapshot.forEach((item) => {
        const data = item.val();
        if (
          (user.uid === data.whoSenderId && friend.id === data.whoRecieverId) ||
          (user.uid === data.whoRecieverId && friend.id === data.whoSenderId)
        ) {
          messageArr.push(data);
        }
      });
      setFriends(messageArr);
    });
  }, []);

  return (
    <div className="bg-white rounded-md shadow-md p-3">
      <div className="bg-[#2d2d2d] rounded-tl-md rounded-tr-md mt-2">
        <div className="flex items-center gap-3 py-2 ml-10">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              className="w-full h-full rounded-full object-cover"
              src={friend.photo || AvaterImg}
            />
          </div>
          <h2 className="text-xl text-white font-bold font-serif">
            {friend.name}
          </h2>
        </div>
      </div>
      <div className="border rounded-bl-md rounded-br-md">
        <div className="h-[500px] px-3 pt-1 pb-2 w-full overflow-y-auto">
          {friend?.status === "single"
            ? friends.map((item) => (
                <div key={item.id} className="mt-2">
                  <p
                    className={`w-3/5 px-2 py-1 rounded-md max-w-fit ${
                      user.uid === item.whoSenderId
                        ? "ml-auto bg-blue-500"
                        : "mr-auto bg-slate-300"
                    }`}
                  >
                    {item.message}
                  </p>
                </div>
              ))
            : ""}
        </div>
        {/* <div className="">
          <div className="mt-2 w-3/5 ml-auto overflow-hidden rounded-md max-w-fit">
            <img
              className="w-full h-auto object-cover"
              src={Nuture01}
              alt="AvaterImg"
            />
          </div>
          <div className="mt-2 w-3/5 mr-auto overflow-hidden rounded-md max-w-fit">
            <img
              className="w-full h-auto object-cover"
              src={Nuture02}
              alt="AvaterImg"
            />
          </div>
        </div> */}
        <div className="bg-[#F5F5F5] py-3 ">
          <div className="bg-white w-3/5 mx-auto flex justify-between items-center px-3 py-1">
            <div className="text-[#292D32] flex items-center gap-x-2 w-[12%]">
              <div className="cursor-pointer">
                <EmojiIcon />
              </div>
              <div className="cursor-pointer">
                <ImageIcon />
              </div>
            </div>
            <div className="w-[60%]">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                className="w-full py-1 px-5 text-base text-[#000] outline-none bg-[#bdbaba] rounded-full"
              />
            </div>
            <div onClick={handleMessageSent} className="w-[18%]">
              <button className="text-base font-sans py-1 px-5 bg-[#4A81D3] text-white rounded-md">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
