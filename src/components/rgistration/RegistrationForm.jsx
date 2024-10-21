import React, { useState } from "react";
import PrimaryHeading from "../utilities/PrimaryHeading";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { SignUpFormValidation } from "../../validation/signUpFormValidation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { BeatLoader } from "react-spinners";

let initialState = {
  name: "",
  email: "",
  password: "",
};

const RegistrationForm = ({ toast }) => {
  const [loader, setLoader] = useState(false);
  const auth = getAuth();
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: SignUpFormValidation,
    onSubmit: () => {
      signUpAuth();
    },
  });
  const signUpAuth = () => {
    setLoader(true);
    createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(() => {
        sendEmailVerification(auth.currentUser).then(() => {
          setLoader(false);
          toast.success("Sign up successful", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
      })
      .catch((error) => {
        setLoader(false);
        if (error.message.includes("auth/email-already-in-use")) {
          toast.error("email already used", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };
  const { errors, touched } = formik;

  return (
    <div>
      <PrimaryHeading content="Registration form" />
      <form onSubmit={formik.handleSubmit} action="" className="w-3/5">
        <div className="mt-3">
          <input
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            type="text"
            className="w-full py-2 px-5 text-base text-[#262626] outline-none border border-[#2D2D2D] rounded-md"
            placeholder="Enter your name"
          />
          <div className="mt-1">
            {errors.name && touched.name ? (
              <span className="text-red-700 pl-4">{errors.name}</span>
            ) : null}
          </div>
        </div>
        <div className="mt-3">
          <input
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            type="email"
            className="w-full py-2 px-5 text-base text-[#262626] outline-none border border-[#2D2D2D] rounded-md"
            placeholder="Enter your email"
          />
          <div className="mt-1">
            {errors.email && touched.email ? (
              <span className="text-red-700 pl-4">{errors.email}</span>
            ) : null}
          </div>
        </div>
        <div className="mt-3">
          <input
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            type="password"
            className="w-full py-2 px-5 text-base text-[#262626] outline-none border border-[#2D2D2D] rounded-md"
            placeholder="Enter your password"
          />
          <div className="mt-1">
            {errors.password && touched.password ? (
              <span className="text-red-700 pl-4">{errors.password}</span>
            ) : null}
          </div>
        </div>
        <div className="mt-4">
          <button
            disabled={loader}
            type="submit"
            className="text-base font-bold py-3 bg-orange-500 w-full rounded-md"
          >
            {loader ? <BeatLoader color="#fff" /> : "Sign Up"}
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
