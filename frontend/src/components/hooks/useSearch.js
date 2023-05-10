import { useMemo } from "react";
import { useCaregiversContext } from "./useCaregiversContext";

const useSearch = (
  searchDatabases = [],
  searchQuery = "",
  selectedDatabase = ""
) => {
  const { caregivers } = useCaregiversContext();

  const databases = {
    caregivers,
    // Add other databases here as needed
  };

  const searchResults = useMemo(() => {
    if (!searchQuery || !selectedDatabase || !databases[selectedDatabase]) {
      return [];
    }

    const dataToSearch = databases[selectedDatabase];

    return dataToSearch.filter((item) => {
      const regex = new RegExp(searchQuery, "i");
      return item.name.match(regex) || item.description.match(regex);
    });
  }, [searchQuery, selectedDatabase, databases]);

  return searchResults;
};

export default useSearch;
