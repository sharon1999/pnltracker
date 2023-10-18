import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const TradeDetails = () => {
  const { user, db } = useUserAuth();

  const [columnDefs] = useState([
    { field: "date" },
    { field: "searchTerm" },
    { field: "stockPrice" },
    { field: "buyPrice" },
    { field: "quantity" },
    { field: "sellPrice" },
    { field: "mtm" },
  ]);
  const [rowData, setRowData] = useState([]);
  const getData = async () => {
    const newTradeList = [];
    if (user.email) {
      const querySnapshot = await getDocs(collection(db, user.email));
      querySnapshot.forEach((doc) => {
        const tradeData = doc.data().trade;
        tradeData.forEach((obj) => {
          obj.date = doc.id;
        });
        newTradeList.push(...tradeData);
      });
      setRowData(newTradeList);
    }
  };
  useEffect(() => {
    getData();
  }, [user.email]);
  if (rowData.length === 0) return <h1>Loading...</h1>;
  else {
    return (
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
      </div>
    );
  }
};

export default TradeDetails;
