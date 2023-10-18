import React from "react";
import LoginSignUp from "./LoginSignUp";
import logo from "../assets/bg.svg"; // with import

function Home() {
  return (
    <div className="bg-color pl-5 md:pl-10 py-5 md:py-24 mx-auto flex flex-col md:flex-row items-center bg-slate-300">
      <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 className="font-Poppins text-4xl text-gray-900  hidden md:inline">
          Track your Profit and Losses
        </h1>
        <br />
        <span className="pl-20 md:pl-70 text-xl mt-4 text-center font-Poppins hidden md:inline">
          The easier way
        </span>
        <img src={logo} className="w-60 md:w-1/2 ml-10 md:ml-0 mb-10" />
      </div>
      <div className="w-8/12">
        <LoginSignUp />
      </div>
    </div>
  );
}

export default Home;
