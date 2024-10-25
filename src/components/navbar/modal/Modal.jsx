import React, { createRef, useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import "cropperjs/dist/cropper.css";
import CropModal from "./CropModal";
import {
  getStorage,
  ref,
  uploadString,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, updateProfile } from "firebase/auth";
import { signInAuth } from "../../../features/slice/loginSlice/signInAuthSlice";

const Modal = ({ setModalShow }) => {
  const user = useSelector((state) => state.user.value);
  console.log(user.photoURL);

  const fileRef = useRef();
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("");
  const cropperRef = useRef();
  const storage = getStorage();
  const storageRef = ref(storage, user.uid);
  const auth = getAuth();
  const dispatch = useDispatch();
  // const uploadTask = uploadBytesResumable(storageRef, file);

  const handleChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              dispatch(signInAuth({ ...user, photoURL: downloadURL }));
              localStorage.setItem(
                "user",
                JSON.stringify({ ...user, photoURL: downloadURL })
              );
              setModalShow(false);
            })
            .catch((error) => {
              console.log(error.message);
            });
        });
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#63571096] flex items-center justify-center ">
      <div className="w-2/5 bg-white p-3 relative rounded-md">
        <div className="w-full mb-4">
          <h3 className="text-lg text-center font-serif text-[#2d2d2d]">
            Upload Photo
          </h3>
          <div
            onClick={() => setModalShow(false)}
            className="absolute right-2 top-2 cursor-pointer text-xl"
          >
            <IoMdCloseCircleOutline />
          </div>
        </div>
        <div className="border border-[#a19e9e] rounded-md">
          <div
            onClick={() => fileRef.current.click()}
            className="m-1 bg-slate-300 rounded-md h-60 flex items-center justify-center cursor-pointer"
          >
            <div className="flex justify-center items-center flex-col gap-1">
              <div className="">
                <CiImageOn />
              </div>
              <h4>Chose your photo</h4>
            </div>
            <div className="">
              <input
                onChange={handleChange}
                ref={fileRef}
                className="hidden"
                type="file"
              />
            </div>
          </div>
        </div>
      </div>
      {image && (
        <CropModal
          cropperRef={cropperRef}
          image={image}
          setImage={setImage}
          getCropData={getCropData}
        />
      )}
    </div>
  );
};

export default Modal;
