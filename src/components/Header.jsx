import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useLocation } from "react-router-dom";

function Header({ darkTheme, setDarkTheme }) {
  const location = useLocation();
  const { logOut } = useUserAuth();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header className="text-gray-600 bg-slate-100 dark:bg-gray-800 dark:text-white body-font h-[10vh]">
        <div className="container mx-auto flex flex-wrap  flex-col md:flex-row items-center justify-between">
          <a className="flex flex-1 title-font font-medium items-center md:mb-0">
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

            <span className="ml-3 text-xl">PnL Tracker</span>
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
              className="flex my-3  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Logout
            </button>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
