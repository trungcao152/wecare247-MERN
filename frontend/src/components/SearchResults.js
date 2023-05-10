import React, { useState, useEffect } from "react";

const SearchResults = ({ results = [], searchQuery }) => {
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setSearching(false);
    }, 500);
  }, [results]);

  // Highlight the searched keywords in results
  const highlightKeyword = (text, keyword) => {
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  return (
    <div>
      {!searching &&
      (!Array.isArray(results) || results.length === 0) &&
      searchQuery !== "" ? (
        <p>
          There is no matching result, please change the searching keywords.
        </p>
      ) : (
        results.map((result, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{
              __html: `
                <h3>${highlightKeyword(result.name, searchQuery)}</h3>
                <p>${highlightKeyword(result.description, searchQuery)}</p>
              `,
            }}
          />
        ))
      )}
    </div>
  );
};

export default SearchResults;
