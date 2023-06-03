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
    <div className="g-6  flex  w-full bg-color">
      <div className="mb-12 mx-auto md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
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
            <div className="mb-6 flex items-center justify-between">
              {/* Remember me checkbox */}
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
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
            <button type="submit" className="btn-primary">
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
      </div>
    </div>
  );
}

export default LoginSignUp;
