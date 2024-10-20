import React from "react";
import LoginForm from "../../components/login/LoginForm";
import LoginAnimation from "../../assets/animation/LoginAnimation.json";
import Lottie from "lottie-react";

const Login = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-5/12">
        <div className="w-3/5">
          <Lottie animationData={LoginAnimation} loop={true} />
        </div>
      </div>
      <div className="w-5/12">
        <LoginForm />
      </div>
    </div>
  );
};
export default Login;
