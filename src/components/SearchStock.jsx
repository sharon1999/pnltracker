import axios from "axios";
import React, { useEffect, useState } from "react";
import Response from "../../Response";
import { getSeconds } from "date-fns";

function SearchStock({ date, setDate }) {
  console.log(String(date.$d).slice(4,15));
  const [self, setSelf] = useState();
  const [tip, setTip] = useState();
  const [total, setTotal] = useState();
  useEffect(() => {
    if (self && tip) localStorage[String(date.$d).slice(4,15)] = total;
  }, [total]);
  useEffect(() => {
    setSelf(0)
    setTip(0)
    setTotal(0)
  }, [date]);

  return (
    <div>
      <div className=" bg-gray-100 rounded-lg  p-2 md:p-8 flex flex-col md:ml-auto w-full  md:mt-0">
        <h2 className="text-gray-900 text-lg font-medium title-font">
          {` ${date.$D} - ${date.$M + 1} - ${date.$y}`}
        </h2>
        <div className="relative mb-4">
          <label
            htmlFor="full-name"
            className=" text-sm text-gray-600"
          >
            Self
          </label>
          <input
            type="number"
            value={self || ""}
            onChange={(e) => {
              setSelf(Number(e.target.value));
            }}
            id="full-name"
            name="full-name"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className=" text-sm text-gray-600">
            Tip
          </label>
          <input
            type="number"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            value={tip || ""}
            onChange={(e) => {
              setTip(Number(e.target.value));
            }}
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => {
              setTotal(self + tip);
            }}
            className="text-white bg-indigo-500 border-0 w-2/5 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Calculate
          </button>
          <button
            onClick={() => {
              setTip(0);
              setSelf(0);
              setTotal(0);
              localStorage.removeItem("profit" + date);
            }}
            className="text-white bg-indigo-500 border-0 w-2/5 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Reset
          </button>
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Total
          </label>
          <h3>{total}</h3>
        </div>
      </div>
    </div>
  );
}

export default SearchStock;
