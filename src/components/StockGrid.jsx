import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { v4 as uuidv4 } from "uuid";
import Response from "../data/Response";
import { useUserAuth } from "../context/UserAuthContext";
import holiday from "../assets/holiday.svg";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { NEW_TRADE, STOCK_PRICE_URL } from "../utils/constants";
import GridHeader from "./GridHeader";
import GridRow from "./GridRow";

const StockGrid = ({ date, setDate }) => {
  const dispalyDate = `${date.$D} - ${date.$M + 1} - ${date.$y}`;
  const day = String(date.$d).substring(0, 3);
  const { user, db } = useUserAuth();
  const [newItem, setNewItem] = useState(NEW_TRADE);
  const [stockData, setStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [update, setUpdate] = useState(false);
  // console.log("Stock Data", stockData);
  // console.log("New Item", newItem);
  useEffect(() => {
    setNewItem((prevItem) => ({
      ...prevItem,
      mtm:
        newItem.sellPrice * newItem.quantity -
        newItem.buyPrice * newItem.quantity,
    }));
  }, [newItem.buyPrice, newItem.sellPrice, newItem.quantity]);
  const mtmColor =
    newItem.mtm > 0 ? "bg-green-300" : newItem.mtm < 0 ? "bg-red-300" : "";
  const fetchStockPrice = async () => {
    await fetch(STOCK_PRICE_URL+selectedStock)
      .then((response) => response.json())
      .then((data) => {
        setNewItem((prevItem) => ({
          ...prevItem,
          id: uuidv4(),
          stockPrice: data?.priceInfo?.lastPrice,
          buyPrice: data?.priceInfo?.lastPrice,
          sellPrice: data?.priceInfo?.lastPrice,
        }));
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    setStockData([]);
    setNewItem(NEW_TRADE);
  }, [date]);
  let saveTrade = async () => {
    if (stockData.length !== 0) {
      await setDoc(doc(db, String(user.email), dispalyDate), {
        trade: [...stockData],
      });
    }
  };

  useEffect(() => {
    if (selectedStock) {
      fetchStockPrice();
    }
  }, [selectedStock]);

  // Want to call if condition only after the line getDoc() is resolved
  const getData = async () => {
    const docRef = doc(db, String(user.email), dispalyDate);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const trade = docSnap.data().trade;
      setStockData(trade);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getData();
  }, [dispalyDate]);
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

  const handleSubmit = (e) => {
    if (Object.values(newItem).includes("")) {
      console.log("At least one value in myObject is null");
    } else {
      console.log("No value in myObject is null");
      const newId = uuidv4();
      newItem.searchTerm = selectedStock;
      const newData = [...stockData, { id: newId, ...newItem }];
      setStockData(newData);
      setSelectedStock("");
      setNewItem(NEW_TRADE);
    }
  };

  const handleUpdate = (updateItem) => {
    console.log(stockData);
    console.log(updateItem);
    setStockData(
      stockData.map((stock) => {
        if (stock.id === updateItem.id) {
          return { ...stock, ...updateItem };
        } else {
          return stock;
        }
      })
    );
    setNewItem(NEW_TRADE);
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
    <div className="flex bg-color justify-center flex-col p-10 md:flex-row w-full ">
      {/* Left side */}
      <Calendar date={date} setDate={setDate} />
      {/* Right side */}
      {day !== "Sat" && day !== "Sun" ? (
        <div className="relative overflow-x-auto">
          <h3 className="text-lg font-semibold border-2">{dispalyDate}</h3>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <GridHeader />
            <tbody>
              <GridRow
                stockData={stockData}
                setUpdate={setUpdate}
                setNewItem={setNewItem}
                setStockData={setStockData}
              />
              <tr className="bg-white border-b dark:bg-gray-600 dark:border-gray-700 ">
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
                  {/* Dropdown for selecting stock */}
                  <div className="max-h-28 overflow-auto  text-gray-700">
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
                <td>
                  <h2
                    name="stockPrice"
                    className=" text-center p-1 mt-3 px-4 bg-slate-50"
                  >
                    ₹ {newItem.stockPrice || " 0"}
                  </h2>
                </td>
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
                <td scope="col" className="px-16 pt-3">
                  {selectedStock !== "" ? (
                    <span
                      className="material-symbols-outlined cursor-pointer"
                      onClick={handleSubmit}
                    >
                      add
                    </span>
                  ) : update ? (
                    <span
                      className="material-symbols-outlined cursor-pointer"
                      onClick={() => handleUpdate(newItem)}
                    >
                      check_circle
                    </span>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          {stockData.length !== 0 && (
            <button
              onClick={saveTrade}
              className="flex justify-end mx-auto my-3 text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm"
            >
              Save
            </button>
          )}
        </div>
      ) : (
        <div className="w-full px-40 py-20 ">
          <img className="w-80" src={holiday} alt="" />
          <h3 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 m-14">
            Trading holiday
          </h3>
        </div>
      )}
    </div>
  );
};
export default StockGrid;
