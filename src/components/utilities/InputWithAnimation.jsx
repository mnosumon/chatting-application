import React, { useEffect, useRef, useState } from "react";
import { EmojiIcon } from "../../assets/svg/EmojiIcon";
import { ImageIcon } from "../../assets/svg/ImageIcon";
import EmojiPicker from "emoji-picker-react";

const InputWithAnimation = ({
  setText,
  handleEnter,
  text,
  handleEmojiPicker,
  handleEmoji,
  emojiShow,
  choeseRef,
  handleImgUpload,
  handleMessageSent,
}) => {
  const inputRef = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [zoomLevel, setZoomLevel] = useState(100); // Default 100%
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  useEffect(() => {
    const handleResize = () => {
      // Update window width
      setWindowWidth(window.innerWidth);

      // Calculate the zoom level
      const zoom = Math.round((window.innerWidth / window.outerWidth) * 100);
      setZoomLevel(zoom);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      const inputElement = inputRef.current;
      const parentElement = inputElement.parentElement;

      const inputWidth = inputElement.offsetWidth; // Width in pixels
      const parentWidth = parentElement.offsetWidth; // Parent width in pixels

      // Calculate percentage width
      const widthInPercentage = (inputWidth / parentWidth) * 100;

      const computedStyle = window.getComputedStyle(inputElement);

      // Validation (example)
      if (Math.round(widthInPercentage) === 60) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, [windowWidth]);

  return (
    <div className="bg-white w-full xl:w-3/5 mx-auto flex justify-around items-center px-3 py-1 gap-x-3">
      <div className="text-[#292D32] flex items-center gap-x-2 w-[22%] sm:w-[16%] md:w-[12%]  ">
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

      <div className="w-[60%] flex justify-end">
        <input
          ref={inputRef}
          onKeyUp={handleEnter}
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="py-1 px-2 md:px-5 text-base text-[#000] outline-none border bg-slate-200 rounded-full transition-all ease-in-out duration-500"
        />
      </div>
      <div
        onClick={handleMessageSent}
        className="w-[28%] sm:w-[20%] md:w-[18%] flex justify-end"
      >
        <button className="text-base font-sans py-1 px-5 bg-[#4A81D3] text-white rounded-md">
          Send
        </button>
      </div>
    </div>
  );
};

export default InputWithAnimation;
