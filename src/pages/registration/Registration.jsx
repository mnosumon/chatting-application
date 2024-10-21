import React from "react";
import RegistrationForm from "../../components/rgistration/RegistrationForm";
import Lottie from "lottie-react";
import RegistrationAnimation from "../../assets/animation/RegistrationAnimation.json";
import { ToastContainer, toast } from "react-toastify";

const Registration = () => {
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-5/12">
          <div className="w-4/5">
            <Lottie animationData={RegistrationAnimation} loop={true} />
          </div>
        </div>
        <div className="w-5/12">
          <RegistrationForm toast={toast} />
        </div>
      </div>
    </>
  );
};

export default Registration;
