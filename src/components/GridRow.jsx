import React from "react";

const GridRow = ({ stockData, setUpdate, setNewItem,setStockData }) => {
  const handleEdit = (editItem) => {
    setUpdate(true);
    setNewItem({ ...editItem });
  };
  const handleDelete = (id) => {
    setStockData(
      stockData.filter((stock) => {
        return stock.id !== id;
      })
    );
  };
  return (
    <>
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
          <td className="px-6 py-3 border border-gray-200">{item.buyPrice}</td>
          <td className="px-6 py-3 border border-gray-200">{item.sellPrice}</td>
          <td className="px-6 py-3 border border-gray-200">{item.quantity}</td>
          <td
            className={`text-center p-1 mt-3 px-4 ${
              item.mtm > 0 ? "bg-green-300" : item.mtm < 0 ? "bg-red-300" : ""
            }`}
          >
            {item.mtm}
          </td>
          <td>
            <span
              className="w-6 h-6 m-3 cursor-pointer material-symbols-outlined"
              onClick={() => handleEdit(item)}
            >
              edit
            </span>
          </td>
          <td>
            <span
              className="w-6 h-6 cursor-pointer material-symbols-outlined text-red-600"
              onClick={() => handleDelete(item.id)}
            >
              delete
            </span>
          </td>
        </tr>
      ))}
    </>
  );
};

export default GridRow;
