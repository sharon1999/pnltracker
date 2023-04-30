import { useEffect, useState } from "react";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
// import { NseIndia } from  "stock-nse-india";
import dayjs from "dayjs";
import StockGrid from "./components/StockGrid";

function App() {
  const [date, setDate] = useState(dayjs(new Date()));
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className={darkTheme ? "dark" : ""}>
      <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <div className="flex justify-start flex-col md:space-x-40 mt-20 md:flex-row w-full ">
        <Calendar date={date} setDate={setDate} />
        {/* <SearchStock date={date} setDate={setDate} /> */}
        <StockGrid date={date} setDate={setDate} />
      </div>
    </div>
  );
}

export default App;
