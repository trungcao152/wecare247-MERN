import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDatabase, setSelectedDatabase] = useState("all");

  const handleSearch = () => {
    onSearch(searchTerm, selectedDatabase);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={selectedDatabase}
        onChange={(e) => setSelectedDatabase(e.target.value)}>
        <option value="all">All Databases</option>
        <option value="caregivers">Caregivers</option>
        <option value="customers">Customers</option>
        {/* Add more options for other databases here */}
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
