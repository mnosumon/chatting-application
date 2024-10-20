import React from "react";

const PrimaryHeading = ({ className, content }) => {
  return (
    <h1
      className={`text-3xl text-orange-400 py-2 font-bold font-serif ${className}`}
    >
      {content}
    </h1>
  );
};

export default PrimaryHeading;
