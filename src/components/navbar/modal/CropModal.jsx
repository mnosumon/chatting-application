import React, { useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Cropper } from "react-cropper";

const CropModal = ({ cropperRef, image, setImage, getCropData }) => {
  return (
    <div className="fixed w-full h-screen flex items-center justify-center ">
      <div className="w-2/5 bg-white p-3 relative rounded-md">
        <div className="w-full mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto ">
            <div className="img-preview w-full h-full object-cover " />
          </div>
          <div
            onClick={() => setImage()}
            className="absolute right-2 top-2 cursor-pointer text-xl"
          >
            <IoMdCloseCircleOutline />
          </div>
        </div>
        <div className="border border-[#a19e9e]">
          <div className="">
            <Cropper
              ref={cropperRef}
              style={{ height: 350, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
            />
          </div>
        </div>
        <div className="mt-1">
          <button
            onClick={getCropData}
            className="w-full text-lg py-2 bg-orange-600 rounded-md"
          >
            Upload Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropModal;
