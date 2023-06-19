/*
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSearch from "./hooks/useSearch";
import SearchResults from "./SearchResults";

const SearchContainer = ({ dataSources }) => {
  const [query, setQuery] = useState("");
  const [selectedDataSource, setSelectedDataSource] = useState("all");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const searchResults = useSearch(dataSources, query, selectedDataSource);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchSubmitted(true);
    navigate("/search-results");
  };

  const handleChangeQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleChangeDataSource = (event) => {
    setSelectedDataSource(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleChangeQuery}
          placeholder="Search..."
        />
        <select value={selectedDataSource} onChange={handleChangeDataSource}>
          <option value="all">All</option>
          {dataSources.map((source) => (
            <option key={source.name} value={source.name}>
              {source.label}
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>
      <SearchResults
        results={searchResults}
        searchQuery={query}
        searchSubmitted={searchSubmitted}
      />
    </div>
  );
};

// Define the default dataSources prop outside the component function
SearchContainer.defaultProps = {
  dataSources: [
    {
      name: "caregivers",
      label: "Caregivers",
    },
    // Add more data sources here as needed
  ],
};

export default SearchContainer;
*/
