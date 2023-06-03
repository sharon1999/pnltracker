import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useUserAuth } from "../context/UserAuthContext";

export default function Calendar({ date, setDate }) {
  const handleDateChange = () => {};
  const { darkTheme, setDarkTheme } = useUserAuth();

  const materialTheme = createTheme({
    palette: {
      mode: darkTheme ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={materialTheme}>
      <div className="p-20">
        <div className="text-end">
          <button
            className="btn-primary"
            onClick={() => setDate(dayjs(new Date()))}
          >
            Reset
          </button>
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
    </ThemeProvider>
  );
}
