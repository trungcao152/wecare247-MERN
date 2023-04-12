import React from "react";

const TableHead = ({ columns, tableTitle }) => {
  return (
    <thead>
      <tr>
        <th colSpan={columns.length + 1}>{tableTitle}</th>
      </tr>
      <tr>
        {columns.map((column, index) => (
          <th key={index}>{column}</th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
};

export default TableHead;
