import React from "react";
import { motion } from "framer-motion";

const InputWithAnimation = ({ setText, handleEnter, text }) => {
  const inputVariants = {
    initial: { scale: 1, opacity: 0.8 },
    focus: { scale: 1.05, opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="w-full sm:w-[60%]"
      variants={inputVariants}
      initial="initial"
      whileFocus="focus"
    >
      <motion.input
        onKeyUp={handleEnter}
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        className="w-full py-2 px-4 text-base text-[#000] outline-none bg-[#bdbaba] rounded-full sm:py-2 sm:px-5"
        whileFocus={{
          boxShadow: "0 0 8px rgba(74, 129, 211, 0.6)", // Animated focus effect
        }}
      />
    </motion.div>
  );
};

export default InputWithAnimation;
