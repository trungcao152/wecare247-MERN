/*
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

    // Filter and sort the data
    return dataToSearch
      .filter((item) => {
        const regex = new RegExp(searchQuery, "i");
        return (
          item.employee_name.match(regex) ||
          item.current_address.match(regex) ||
          item.preferred_working_location.match(regex)
        );
      })
      .sort((a, b) => {
        // This will sort the results in descending order of the searchQuery match
        return (
          b.employee_name.includes(searchQuery) -
          a.employee_name.includes(searchQuery)
        );
      });
  }, [searchQuery, selectedDatabase, databases]);

  return searchResults;
};

export default useSearch;
*/
