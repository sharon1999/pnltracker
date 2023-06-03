import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header({ darkTheme, setDarkTheme }) {
  const location = useLocation();
  const { logOut,notify } = useUserAuth();
  const handleLogOut = async () => {
    try {
      await logOut();
      notify("Successfully Logged out")
    } catch (error) {
      console.log(error);
    }
  };
  <ToastContainer />;

  return (
    <div className=" flex  md:flex-row items-center justify-between text-gray-600 bg-slate-100 dark:bg-gray-800 dark:text-white body-font h-[10vh]">
      <a className="flex flex-1 title-font font-medium items-center md:mb-0 pl-10 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span className="ml-3 text-xl cursor-pointer">PnL Tracker</span>
      </a>
      <button
        type="button"
        onClick={() => setDarkTheme(!darkTheme)}
        className="text-xl mx-20 dark:bg-gray-50 dark:text-gray-900 bg-white border rounded-full px-2 py-1 m-3 hover:shadow-lg"
      >
        {darkTheme ? "Light 💡" : "Dark 🌙"}
      </button>
      {location.pathname === "/stockgrid" && (
        <button
          onClick={handleLogOut}
          className="flex m-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Header;
