import { useState, useMemo } from "react";
import { useCaregiversContext } from "./useCaregiversContext";

const useSearch = (searchDatabases = []) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDatabase, setSelectedDatabase] = useState("");

  const { caregivers } = useCaregiversContext();

  const databases = {
    caregivers,
    // Add other databases here as needed
  };

  const searchResults = useMemo(() => {
    if (
      !searchQuery ||
      !selectedDatabase ||
      !searchDatabases.includes(selectedDatabase)
    ) {
      return [];
    }

    const dataToSearch = databases[selectedDatabase];

    return dataToSearch.filter((item) => {
      const regex = new RegExp(searchQuery, "i");
      return item.name.match(regex) || item.description.match(regex);
    });
  }, [searchQuery, selectedDatabase, searchDatabases, databases]);

  return {
    searchQuery,
    setSearchQuery,
    selectedDatabase,
    setSelectedDatabase,
    searchResults,
  };
};

export default useSearch;
