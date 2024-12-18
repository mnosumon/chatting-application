import React, { useState } from "react";
import PrimaryHeading from "../utilities/PrimaryHeading";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignInFormValidation } from "../../validation/signInFormValidation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { signInAuth } from "../../features/slice/loginSlice/signInAuthSlice";

let initialState = {
  email: "",
  password: "",
};

const LoginForm = ({ toast }) => {
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.user.value);

  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: SignInFormValidation,
    onSubmit: () => {
      signInAuthUser();
    },
  });
  const signInAuthUser = () => {
    setLoader(true);
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((item) => {
        if (item.user.emailVerified) {
          toast.success("Sign in successful", {
            position: "top-right",
            autoClose: 2000,
          });
          dispatch(signInAuth(item.user));
          localStorage.setItem("user", JSON.stringify(item.user));
          setTimeout(() => navigate("/"), 2000);
        } else {
          toast.error("Your email is not verified", {
            position: "top-right",
            autoClose: 2000,
          });
          setLoader(false);
        }
      })
      .catch((error) => {
        if (error.message.includes("auth/invalid-credential")) {
          toast.error("Password or email incorrect", {
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
        setLoader(false);
      });
  };
  const { errors, touched } = formik;

  return (
    <div>
      <PrimaryHeading className="text-center" content="Registration form" />
      <form
        onSubmit={formik.handleSubmit}
        action=""
        className="w-[90%] sm:w-4/5 xl:w-3/5 mx-auto"
      >
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
            {loader ? <BeatLoader color="#fff" /> : "Sign in"}
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <p>
          Yuo have no account{" "}
          <Link to="/registration" className="text-blue-700 cursor-pointer">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
