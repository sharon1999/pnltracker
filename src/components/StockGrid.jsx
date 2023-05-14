import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Response from "../data/Response";
import Trades from "../data/Trades";
import { green } from "@mui/material/colors";

const StockGrid = ({ date, setDate }) => {
  const dispalyDate = `${date.$D} - ${date.$M + 1} - ${date.$y}`;

  const [newItem, setNewItem] = useState({
    id: "",
    searchTerm: "",
    stockPrice: "",
    buyPrice: "",
    sellPrice: "",
    quantity: "",
    mtm: "",
  });
  const [stockData, setStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    setNewItem((prevItem) => ({
      ...prevItem,
      mtm:
        newItem.sellPrice * newItem.quantity -
        newItem.buyPrice * newItem.quantity,
    }));
    // setMtm(newItem.sellPrice * newItem.quantity - newItem.buyPrice * newItem.quantity);
  }, [newItem.buyPrice, newItem.sellPrice, newItem.quantity]);
  const mtmColor =
    newItem.mtm > 0 ? "bg-green-300" : newItem.mtm < 0 ? "bg-red-300" : "";
  const stockMtmColor =
    stockData.mtm > 0 ? "bg-green-300" : stockData.mtm < 0 ? "bg-red-300" : "";
  const fetchStockPrice = async () => {
    const response = await fetch(
      `http://localhost:3000/details/${selectedStock}`
      // `https://nsedatascrapper.onrender.com/details/${selectedStock}`
    )
      .then((response) => response.json())
      .then((data) => {
        setNewItem((prevItem) => ({
          ...prevItem,
          id: uuidv4(),
          stockPrice: data.priceInfo.lastPrice,
          buyPrice: data.priceInfo.lastPrice,
          sellPrice: data.priceInfo.lastPrice,
        }));
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    setStockData([]);
    setNewItem({
      searchTerm: "",
      stockPrice: "",
      buyPrice: "",
      sellPrice: "",
      quantity: "",
      mtm: "",
    });
  }, [date]);
  let saveTrade = () => {
    console.log(stockData);
    localStorage.setItem(dispalyDate, JSON.stringify(stockData));
  };

  useEffect(() => {
    if (selectedStock) fetchStockPrice();
  }, [selectedStock]);

  const searchStock = (value) => {
    const ans = Response.filter((stock) => {
      return (
        value && (stock.includes(value) || stock.toLowerCase().includes(value))
      );
    });
    setSearchList(ans);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };
  const handleStockNameChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
    searchStock(value);
  };

  const handleEdit = (editItem) => {
    // const editRecord = stockData.filter((stock) => {
    //   return stock.id === id;
    // });
    setUpdate(true);
    setNewItem({ ...editItem });
  };
  const handleSubmit = (e) => {
    // console.log(newItem);
    if (Object.values(newItem).includes("")) {
      console.log("At least one value in myObject is null");
    } else {
      console.log("No value in myObject is null");
      const newId = uuidv4();
      newItem.searchTerm = selectedStock;
      const newData = [...stockData, { id: newId, ...newItem }];
      setStockData(newData);
      setSelectedStock("");
      setNewItem({
        searchTerm: "",
        stockPrice: "",
        buyPrice: "",
        sellPrice: "",
        quantity: "",
        mtm: "",
      });
    }
  };
  
  const handleUpdate = (updateItem) => {
    console.log(stockData);
    console.log(updateItem);
    setStockData(stockData.map((stock) => {
      if (stock.id === updateItem.id) {
        return { ...stock,...updateItem };
      } else {
        return stock;
      }
    }))
    // const newData = [...stockData, { id: newId, ...newItem }];
    // setStockData(newData);
  };

  const setDropdownValue = (event) => {
    const { name, value } = event.target;
    // setNewItem((prevItem) => ({ ...prevItem, searchTerm: value}));
    setSelectedStock(event.target.outerText);
    setNewItem((prevItem) => ({
      ...prevItem,
      searchTerm: event.target.outerText,
    }));
    setSearchList([]);
  };
  return (
    <div className="relative overflow-x-auto">
      <h3 className="text-lg font-semibold border-2">
        {/* {` ${date.$D} - ${date.$M + 1} - ${date.$y}`} */}
        {dispalyDate} {selectedStock}
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
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              MTM
            </th>
          </tr>
        </thead>

        <tbody>
          {stockData.map((item, id) => (
            <tr
              className="text-md text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 px-2"
              key={id}
            >
              <td className="px-6 py-3 border border-gray-200">
                {item.searchTerm}
              </td>
              <td className="px-6 py-3 border border-gray-200">
                {item.stockPrice}
              </td>
              <td className="px-6 py-3 border border-gray-200">
                {item.buyPrice}
              </td>
              <td className="px-6 py-3 border border-gray-200">
                {item.sellPrice}
              </td>
              <td className="px-6 py-3 border border-gray-200">
                {item.quantity}
              </td>
              <td
                className={`text-center p-1 mt-3 px-4 ${
                  item.mtm > 0
                    ? "bg-green-300"
                    : item.mtm < 0
                    ? "bg-red-300"
                    : ""
                }`}
              >
                {item.mtm}
              </td>
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 m-3 cursor-pointer"
                  onClick={() => handleEdit(item)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </td>
            </tr>
          ))}
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
            <td className="px-6 py-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-1 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="searchTerm"
                type="text"
                onFocus={() =>
                  newItem.searchTerm ? searchStock : setSearchList(Response)
                }
                autoComplete="off"
                placeholder="Stock name"
                value={newItem.searchTerm}
                onChange={handleStockNameChange}
              />
              <div className="max-h-28 overflow-auto">
                {searchList.map((ele, id) => {
                  return (
                    <div key={id} className="cursor-pointer hover:bg-slate-200">
                      <div onClick={(e) => setDropdownValue(e)}>{ele}</div>
                    </div>
                  );
                })}
              </div>
            </td>
            {/* <div className="flex justify-center items-center h-20"> */}
            <td>
              <h2
                name="stockPrice"
                className=" text-center p-1 mt-3 px-4 bg-slate-50"
              >
                ₹ {newItem.stockPrice || " 0"}
              </h2>
            </td>
            {/* </div> */}
            <td className="px-6 py-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="buyPrice"
                type="number"
                placeholder="Buy price"
                value={newItem.buyPrice || newItem.stockPrice}
                onChange={handleChange}
              />
            </td>
            <td className="px-6 py-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="sellPrice"
                type="number"
                placeholder="Sell price"
                value={newItem.sellPrice || newItem.stockPrice}
                onChange={handleChange}
              />
            </td>
            <td className="px-6 py-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="quantity"
                type="number"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={handleChange}
              />
            </td>
            <td className={`text-lg font-bold`}>
              <h2 className={`text-center p-1 mt-3 px-4 ${mtmColor}`}>
                {newItem.mtm}
              </h2>
            </td>
            <td scope="col" className="px-6 py-3">
              {selectedStock !== "" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                  onClick={handleSubmit}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              ) : update ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleUpdate(newItem)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                ""
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={saveTrade}
        className="flex justify-end mx-auto my-3 text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm"
      >
        Save
      </button>
    </div>
  );
};
export default StockGrid;
