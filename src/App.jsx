import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
// import { NseIndia } from  "stock-nse-india";
import dayjs from "dayjs";
import StockGrid from "./components/StockGrid";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import TradeDetails from "./components/TradeDetails";

function App() {
  const [date, setDate] = useState(dayjs(new Date()));
  const darkTheme = useSelector(store=>store.theme.darkTheme)
  return (
    <div className={darkTheme ? "dark" : ""}>
      <Header darkTheme={darkTheme}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/stockgrid"
          element={
            <ProtectedRoute>
              <StockGrid date={date} setDate={setDate} />
            </ProtectedRoute>
          }
        />
        <Route path="/tradedetails" element={<TradeDetails />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {/* 
      <div className="flex justify-start flex-col md:space-x-40 mt-20 md:flex-row w-full ">
        <Calendar date={date} setDate={setDate} />
        <StockGrid date={date} setDate={setDate} />
      </div> */}
    </div>
  );
}

export default App;
