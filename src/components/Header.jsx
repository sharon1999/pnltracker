import React, { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header({ darkTheme, setDarkTheme }) {
  const [showLogout, setShowLogout] = useState(false);
  const location = useLocation();
  const { logOut, notify, user } = useUserAuth();
  const handleLogOut = async () => {
    try {
      await logOut();
      notify("Successfully Logged out");
    } catch (error) {
      console.log(error);
    }
  };
  <ToastContainer />;

  return (
    <div className=" flex items-center justify-between relative text-gray-600 bg-slate-100 dark:bg-gray-800 dark:text-white body-font h-20">
      <div className="flex justify-center items-center gap-10">
        <a className="flex flex-1 title-font font-medium items-center md:mb-0 pl-5 ">
          <span className="material-symbols-outlined font-bold border-2 border-black rounded-full p-1">
            currency_rupee
          </span>

          <span className="ml-3 text-xl cursor-pointer">PnL Tracker</span>
        </a>
        {user && <Link to="/tradedetails">Details</Link>}
      </div>

      <div
        className="flex items-center mr-10 cursor-pointer"
        onClick={() => setShowLogout(!showLogout)}
      >
        <button
          type="button"
          onClick={() => setDarkTheme(!darkTheme)}
          className="text-xl  mr-5 dark:bg-gray-50 dark:text-gray-900 bg-white border rounded-full px-2 py-1 hover:shadow-lg"
        >
          {darkTheme ? "Light 💡" : "Dark 🌙"}
        </button>
        {user && (
          <>
            <div className="flex flex-col items-center justify-center">
              <span className="material-symbols-outlined">person</span>
              <span>{user?.email}</span>
            </div>
            <span className="material-symbols-outlined font-2xl">
              {showLogout ? "arrow_drop_up" : "arrow_drop_down"}
            </span>
          </>
        )}
      </div>

      <div
        className={`transition-all duration-500 ease-out absolute right-10 top-20 z-50 ${
          showLogout ? "h-full opacity-100" : "h-0 opacity-0 overflow-hidden"
        }`}
      >
        {location.pathname === "/stockgrid" && (
          <button
            onClick={handleLogOut}
            className="flex bg-slate-300 hover:bg-slate-400 border-0 px-10 py-2 focus:outline-none rounded text-lg"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
