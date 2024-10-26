import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Cropper } from "react-cropper";
import { FadeLoader } from "react-spinners";

const CropModal = ({ cropperRef, image, setImage, getCropData, loader }) => {
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
        <div className="mt-1 h-12 relative">
          <button
            onClick={getCropData}
            className="w-full h-full text-lg bg-orange-600 rounded-md"
          >
            {loader ? (
              <FadeLoader
                height={14}
                margin={-5}
                width={4}
                color="#FFF"
                cssOverride={{
                  position: "absolute",
                  left: "50%",
                  top: "48%",
                }}
              />
            ) : (
              "Upload Photo"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropModal;
