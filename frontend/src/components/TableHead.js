import React from "react";

const TableHead = ({
  columns,
  properties,
  tableTitle,
  requestSort,
  sortingKeys = [],
}) => {
  //Render arrow
  const renderSortingArrows = (property) => {
    const sortKey = sortingKeys.find((k) => k.key === property);

    const handleSort = (direction) => {
      requestSort(property, direction);
    };

    return (
      <>
        <button onClick={() => handleSort("asc")}>
          {sortKey?.direction === "asc" ? "▲" : "▲"}
        </button>
        <button onClick={() => handleSort("desc")}>
          {sortKey?.direction === "desc" ? "▼" : "▼"}
        </button>
      </>
    );
  };

  return (
    <thead>
      <tr>
        <th className="tableTitle" colSpan={columns.length + 1}>
          {tableTitle}
        </th>
      </tr>
      <tr>
        {columns.map((column, index) => (
          <th key={index}>
            {column}
            {renderSortingArrows(properties[index])}
          </th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
};

export default TableHead;
