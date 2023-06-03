import React from "react";
import LoginSignUp from "./LoginSignUp";
import logo from '../assets/bg.svg'; // with import


function Home() {
  return (
    <div className="h-[90vh] bg-color px-5 py-24 mx-auto flex items-center">
      <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        {/* <h1 className="title-font font-medium text-3xl text-gray-900">
          Track your Profit and Losses 
        </h1>
        <p className="leading-relaxed mt-4">
          The easier way
        </p> */}
        <img src={logo} alt="" />
      </div>
      <LoginSignUp />
    </div>
  
  );
}

export default Home;
