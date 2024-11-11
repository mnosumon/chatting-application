import React from "react";
import LoginForm from "../../components/login/LoginForm";
import LoginAnimation from "../../assets/animation/LoginAnimation.json";
import Lottie from "lottie-react";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-5/12 hidden lg:block">
          <div className="w-3/5">
            <Lottie animationData={LoginAnimation} loop={true} />
          </div>
        </div>
        <div className="w-4/5 lg:w-5/12">
          <LoginForm toast={toast} />
        </div>
      </div>
    </>
  );
};
export default Login;
