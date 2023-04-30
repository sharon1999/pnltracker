import React, { useEffect, useState } from "react";
import axios from "axios";
import Response from "../../Response";

const StockGrid = ({ date, setDate }) => {
  // useEffect(()=>{
  //   const options = {
  //       method: "GET",
  //       url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete",
  //       params: {
  //         q: "Tata M",
  //         region: "IN",
  //       },
  //       headers: {
  //         "content-type": "application/octet-stream",
  //         "X-RapidAPI-Key": "eec9e44be8msh08d7e1139de3beap158069jsn78a102ec5b20",
  //         "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
  //       },
  //     };
  //     const getData = async () => {
  //       const response = await axios.request(options);
  //     };
  //     console.log(response.data);
  // },[])

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [stockData, setStockData] = useState([
    {
      stockName: "",
      currentPrice: "",
    },
  ]);
  console.log(searchTerm);
  const createNewRow = () => {
    setStockData([...stockData, stockData]);
  };
  const fetchStockPrice = async () => {
    const response = await fetch(
      `http://localhost:3000/details/${selectedStock}`
    )
      .then((response) => response.json())
      .then((data) => setStockPrice(data.priceInfo.lastPrice))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    if (selectedStock) fetchStockPrice();
  }, [selectedStock]);
  //   useEffect(() => {
  //     async function fetchData() {
  //       const response = await fetch('http://localhost:3000/allsymbols');
  //       const jsonData = await response.json();
  //       console.log(jsonData);
  //     }
  //     fetchData();
  //   }, []);
  const searchStock = (value) => {
    const ans = Response.filter((stock) => {
      return (
        value && (stock.includes(value) || stock.toLowerCase().includes(value))
      );
    });
    setSearchList(ans);
  };
  const handleChange = (value) => {
    setSearchTerm(value);
    searchStock(value);
  };
  const setDropdownValue = (event) => {
    setSelectedStock(event.target.outerText);
    setSearchList([]);
  };
  return (
    <div className="relative overflow-x-auto">
      <h3 className="text-lg font-semibold border-2">
        {` ${date.$D} - ${date.$M + 1} - ${date.$y} ${selectedStock}`}
      </h3>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Stock name
            </th>
            <th scope="col" className="px-6 py-3">
              Current Price
            </th>
            <th scope="col" className="px-6 py-3">
              Buy Price
            </th>
            <th scope="col" className="px-6 py-3">
              Sell Price
            </th>
            <th scope="col" className="px-6 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
                onClick={createNewRow}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </th>
          </tr>
        </thead>

        <tbody>
          {stockData.map((data) => {
            return (
              <tr
                key={data.currentPrice}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
              >
                <td className="px-6 py-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-1 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="stockname"
                    type="text"
                    placeholder="Stock name"
                    value={searchTerm}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <div className="max-h-28 overflow-auto">
                    {searchList.map((ele, id) => {
                      return (
                        <div
                          key={id}
                          className="cursor-pointer hover:bg-slate-200"
                        >
                          <div onClick={(e) => setDropdownValue(e)}>{ele}</div>
                        </div>
                      );
                    })}
                  </div>
                </td>
                {/* <div className="flex justify-center items-center h-20"> */}
                <td className="bg-slate-50 mt-2 text-center h-8 w-24">
                  ₹ {stockPrice || " 0"}
                </td>
                {/* </div> */}
                <td className="px-6 py-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="buyprice"
                    type="number"
                    placeholder="Buy price"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="sellprice"
                    type="number"
                    placeholder="Sell price"
                  />
                </td>
                <td>
                  <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                    Save
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default StockGrid;
