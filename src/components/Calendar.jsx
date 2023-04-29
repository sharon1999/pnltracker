import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { clockClasses } from "@mui/x-date-pickers";

export default function Calendar({ date, setDate }) {
  const handleDateChange = () => {};
  return (
    <div>
      <div className="text-end">
        <button className="bg-slate-200 p-1 rounded-lg hover:bg-slate-300 cursor-pointer" onClick={()=>setDate(dayjs(new Date()))}>Reset</button>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateCalendar", "DateCalendar"]}>
          <DateCalendar
            value={date}
            onClick={handleDateChange()}
            onChange={(newValue) => setDate(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
