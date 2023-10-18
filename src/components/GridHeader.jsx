import React from "react";
import { GRID_HEADER } from "../utils/constants";

const GridHeader = () => {
  return (
    <>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {GRID_HEADER.map((title) => (
            <th scope="col" className="px-6 py-3" key={title}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default GridHeader;
