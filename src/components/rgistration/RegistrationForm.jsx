import React from "react";
import PrimaryHeading from "../utilities/PrimaryHeading";
import { Link } from "react-router-dom";
import { Formik, useFormik } from "formik";

let initialState = {
  name: "",
  email: "",
  password: "",
};

const RegistrationForm = () => {
  const formik = useFormik({
    initialValues: initialState,
    onSubmit: () => {
      console.log("Submited");
    },
  });
  return (
    <div>
      <PrimaryHeading content="Registration form" />
      <form onSubmit={formik.handleSubmit} action="" className="w-3/5">
        <div className="mt-3">
          <input
            type="text"
            className="w-full py-2 px-5 text-base text-[#262626] outline-none border border-[#2D2D2D] rounded-md"
            placeholder="Enter your name"
          />
        </div>
        <div className="mt-3">
          <input
            type="email"
            className="w-full py-2 px-5 text-base text-[#262626] outline-none border border-[#2D2D2D] rounded-md"
            placeholder="Enter your email"
          />
        </div>
        <div className="mt-3">
          <input
            type="password"
            className="w-full py-2 px-5 text-base text-[#262626] outline-none border border-[#2D2D2D] rounded-md"
            placeholder="Enter your password"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="text-base font-bold py-3 bg-orange-500 w-full rounded-md"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="mt-4">
        <p>
          Yuo have already sign up{" "}
          <Link to="/login" className="text-blue-700 cursor-pointer">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
