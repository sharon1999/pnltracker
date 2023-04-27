import axios from "axios";
import React, { useEffect, useState } from "react";
import Response from "../../Response";
import { getSeconds } from "date-fns";

function SearchStock({ date, setDate }) {
  const [stockList, setStockList] = useState([]);
  const [self, setSelf] = useState();
  const [tip, setTip] = useState();
  const [total, setTotal] = useState();

  const useDummyData = true;
  const data = useDummyData
    ? Response
    : axios
        .get(
          "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=RELIdasdANCE&apikey=IH02AGP2VUFYPLB4"
        )
        .then((res) => {
          console.log(res.data);
          setStockList(res.data.bestMatches);
        });
  // console.log(Response);
  useEffect(() => {
    setStockList(Response.bestMatches);
  }, []);
  console.log(stockList);

  return (
    <div>
      {/* <select>
        <option value="⬇️ Select a stock ⬇️"> -- Select a stock -- </option>

        {stockList
          .filter(function (stock) {
            return stock["4. region"] === "India/Bombay";
          })
          .map((stock) => (
            <option key={stock["1. symbol"]}> {stock["2. name"]}</option>
          ))}
      </select> */}
      <div className=" bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
          {` ${date.$D} - ${date.$M + 1} - ${date.$y}`}
        </h2>
        <div className="relative mb-4">
          <label
            htmlFor="full-name"
            className="leading-7 text-sm text-gray-600"
          >
            Self
          </label>
          <input
            type="text"
            value={self}
            onChange={(e) =>{ setSelf(Number(e.target.value))
              setTotal(Number(self)+Number(tip))
            }}
            id="full-name"
            name="full-name"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Tip
          </label>
          <input
            value={tip}
            onChange={(e) => {setTip(Number(e.target.value))
              setTotal(Number(self)+Number(tip))
            }}
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Total
          </label>
          <h3>{total}</h3>
        </div>
        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Button
        </button>
      </div>
    </div>
  );
}

export default SearchStock;
