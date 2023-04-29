import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
// import { NseIndia } from  "stock-nse-india";
import dayjs from "dayjs";
import SearchStock from "./components/SearchStock";
import StockGrid from "./components/StockGrid";

function App() {
  const [date, setDate] = useState(dayjs(new Date()));
  // const nseIndia = new NseIndia();

  // To get equity details for specific symbol
  // nseIndia.getAllStockSymbols().then((symbols) => {
  //   console.log(symbols);
  // });

  return (
    <div className="App">
      <Header />
      <div className="flex justify-start flex-col md:space-x-40 mt-20 md:flex-row w-full ">
        <Calendar date={date} setDate={setDate} />
        {/* <SearchStock date={date} setDate={setDate} /> */}
        <StockGrid />
      </div>
    </div>
  );
}

export default App;
