import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CalendarCard from "./components/Calendar";
import dayjs from "dayjs";
import SearchStock from "./components/SearchStock";

function App() {
  const [date, setDate] = useState(dayjs(new Date()));
  console.log(date);
  return (
    <div className="App">
      <Header />
      <div className="m-20 flex justify-between">
        <CalendarCard date={date} setDate={setDate} />
        <SearchStock  date={date} setDate={setDate} />
      </div>
    </div>
  );
}

export default App;
