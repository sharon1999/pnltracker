import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Google } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function LoginSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginFlag, setLoginFlag, signUp, logIn,notify } = useUserAuth();
  const navigate = useNavigate();
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/stockgrid");
      notify("Successfully Logged In")

      
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
        await signUp(email, password)
        setLoginFlag(true);
        setEmail("");
        setPassword("");
        notify("Successfully Created")
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-3/4 mx-auto">
      {/* <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12"> */}
        <ToastContainer />
        <h1 className="text-3xl bg-indigo-400 text-white text-center p-3 font-semibold ">
          {loginFlag ? "Login" : "Register"}
        </h1>
        <form
          onSubmit={loginFlag ? handleLogIn : handleSignUp}
          className=" w-full p-10  bg-slate-200 dark:bg-gray-600"
        >
          {/*Sign in section*/}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-3"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  onClick={() => setError("")}
                >
                  <title>Close</title>

                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
          {/* Email input */}
          <div className="relative mb-6" data-te-input-wrapper-init="">
            <label
              htmlFor="exampleFormControlInput2"
              className="font-semibold text-md text-gray-600"
            >
              Email address
            </label>
            <br></br>
            <br></br>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {/* Password input */}
          <div className="relative mb-6" data-te-input-wrapper-init="">
            <label
              htmlFor="exampleFormControlInput22"
              className="font-semibold text-md text-gray-600"
            >
              Password
            </label>
            <br />
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {loginFlag && (
            <div className="mb-6 w-full flex items-center justify-between">
              {/* Remember me checkbox */}
              <div className="mb-[0.125rem] min-h-[1.5rem] pl-[1.5rem]">
                <input                 
                  type="checkbox"
                  defaultValue=""
                  id="exampleCheck2"
                />
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="exampleCheck2"
                >
                  Remember me
                </label>
              </div>
              {/*Forgot password link*/}
              <a href="#!">Forgot password?</a>
            </div>
          )}
          {/* Login button */}
          <div className="text-center lg:text-left">
            <button type="submit" className="btn-primary mx-auto">
              {loginFlag ? "Login" : "Register"}
            </button>
            {/* Register link */}
            <p className="mb-0 mt-2 pt-1 text-sm font-semibold text-center">
              {loginFlag ? "Don't have an account?" : "Have an account?"}

              <Link
                onClick={() => setLoginFlag(!loginFlag)}
                className="m-3 text-lg text-blue-500 hover:text-blue-700"
              >
                {loginFlag ? "Register" : "Login"}
              </Link>
            </p>
          </div>
        </form>
        {/* </div> */}
    </div>
  );
}

export default LoginSignUp;
