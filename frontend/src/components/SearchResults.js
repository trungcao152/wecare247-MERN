/*
import React, { useState, useEffect } from "react";
import CaregiverTable from "./Caregiver/CaregiverTable";

const SearchResults = ({ results = [], searchQuery, searchSubmitted }) => {
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setSearching(false);
    }, 500);
  }, [results]);

  // Filter the search results based on the search query
  const filteredResults = (results) => {
    return results.filter((item) => {
      const regex = new RegExp(searchQuery, "i");
      return (
        item.employee_name.match(regex) ||
        item.current_address.match(regex) ||
        item.preferred_working_location.match(regex)
      );
    });
  };

  return (
    <div>
      {searching ? (
        <p>Searching...</p>
      ) : searchSubmitted && searchQuery !== "" ? (
        filteredResults(results).length > 0 ? (
          <div>
            <h2>Caregiver Database</h2>
            <CaregiverTable caregivers={filteredResults(results)} />
          </div>
        ) : (
          <p>
            There is no matching result, please change the searching keywords.
          </p>
        )
      ) : (
        <p>Enter keywords to start searching.</p>
      )}
    </div>
  );
};

export default SearchResults;
*/