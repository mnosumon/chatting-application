import React, { useEffect, useRef, useState } from "react";
import { EmojiIcon } from "../../assets/svg/EmojiIcon";
import { ImageIcon } from "../../assets/svg/ImageIcon";
import AvaterImg from "../../assets/image/avater.jpg";
import { useSelector } from "react-redux";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import EmojiPicker from "emoji-picker-react";
import {
  getStorage,
  ref as Ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { formatDistance } from "date-fns";

const SendMessage = () => {
  const friend = useSelector((state) => state.firend.value);
  const user = useSelector((state) => state.user.value);
  const [text, setText] = useState("");
  const [emojiShow, setEmojiShow] = useState(false);
  const [friends, setFriends] = useState([]);
  const choeseRef = useRef();
  const scrollRef = useRef();

  const db = getDatabase();
  const storage = getStorage();

  const date = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;

  const handleMessageSent = () => {
    if (text !== "") {
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
    }
    setText("");
  };

  const handleImgUpload = (e) => {
    const choeseFile = e.target.files[0];
    const storageRef = Ref(
      storage,
      `${user.displayName} = chattingAbleMedia/ ${choeseFile}`
    );

    const uploadTask = uploadBytesResumable(storageRef, choeseFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (friend?.status === "single") {
            set(push(ref(db, "message")), {
              whoSenderName: user.displayName,
              whoSenderId: user.uid,
              whoRecieverName: friend.name,
              whoRecieverId: friend.id,
              message: text,
              image: downloadURL,
              time: date,
            });
          }
        });
      }
    );
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
  }, [db, user.uid, friend]);

  const handleEmoji = () => {
    setEmojiShow(!emojiShow);
  };
  const handleEmojiPicker = (data) => {
    setText(data.emoji + text);
    setEmojiShow(false);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [friends]);

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleMessageSent();
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md p-3">
      <div className="bg-[#2d2d2d] rounded-tl-md rounded-tr-md mt-2">
        <div className="flex items-center gap-3 py-2 ml-10">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              className="w-full h-full rounded-full object-cover"
              src={friend?.photo || AvaterImg}
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
            ? friends?.map((item, i) => (
                <div ref={scrollRef} key={i} className="mt-2">
                  {item.image ? (
                    user.uid === item.whoSenderId ? (
                      <div className="flex flex-col gap-y-1">
                        <div className="w-3/5 ml-auto overflow-hidden rounded-md max-w-fit">
                          <img
                            className="w-full h-auto object-cover"
                            src={item.image}
                            alt="AvaterImg"
                          />
                        </div>
                        <span className="w-3/5 ml-auto text-xs text-[#746e6e] rounded-md max-w-fit">
                          {formatDistance(item.time, new Date(), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-y-1">
                        <div className="w-3/5 mr-auto overflow-hidden rounded-md max-w-fit">
                          <img
                            className="w-full h-auto object-cover"
                            src={item.image}
                            alt="AvaterImg"
                          />
                        </div>
                        <span className="w-3/5 mr-auto text-xs text-[#746e6e] rounded-md max-w-fit">
                          {formatDistance(item.time, new Date(), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    )
                  ) : user.uid === item.whoSenderId ? (
                    <div className="flex flex-col gap-y-1 text-justify">
                      <p className="w-3/5 px-2 ml-auto bg-blue-500 py-1 rounded-md max-w-fit">
                        {item.message}
                      </p>
                      <span className="w-3/5 ml-auto text-xs text-[#746e6e] rounded-md max-w-fit">
                        {formatDistance(item.time, new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-y-1">
                      <p className="w-3/5 px-2 mr-auto bg-slate-300 py-1 rounded-md max-w-fit">
                        {item.message}
                      </p>
                      <span className="w-3/5 mr-auto text-xs text-[#746e6e] rounded-md max-w-fit">
                        {formatDistance(item.time, new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  )}
                </div>
              ))
            : ""}
        </div>
        <div className="bg-[#F5F5F5] py-3 ">
          <div className="bg-white w-3/5 mx-auto flex justify-between items-center px-3 py-1">
            <div className="text-[#292D32] flex items-center gap-x-2 w-[12%]">
              <div className="cursor-pointer relative">
                <div onClick={handleEmoji} className="">
                  <EmojiIcon />
                </div>
                {emojiShow && (
                  <div className="absolute bottom-10 left-0">
                    <EmojiPicker onEmojiClick={handleEmojiPicker} />
                  </div>
                )}
              </div>
              <div
                onClick={() => choeseRef.current.click()}
                className="cursor-pointer"
              >
                <ImageIcon />
                <input
                  onChange={handleImgUpload}
                  type="file"
                  ref={choeseRef}
                  hidden
                />
              </div>
            </div>
            <div className="w-[60%]">
              <input
                onKeyUp={handleEnter}
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
