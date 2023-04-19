import { useState, useMemo } from "react";

const useSortableData = (data, defaultSortKeys) => {
  const [sortingKeys, setSortingKeys] = useState(defaultSortKeys);

  const requestSort = (key, direction) => {
    setSortingKeys((prevKeys) => {
      const existingKey = prevKeys.find((k) => k.key === key);

      if (existingKey) {
        return prevKeys.map((k) => (k.key === key ? { ...k, direction } : k));
      } else {
        return [...prevKeys, { key, direction }];
      }
    });
  };

  // Sort the data based on the sorting keys and directions.
  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      for (const { key, direction } of sortingKeys) {
        const aValue = a[key];
        const bValue = b[key];

        if (aValue === null || bValue === null) {
          if (aValue === null && bValue !== null) return 1;
          if (aValue !== null && bValue === null) return -1;
          continue;
        }

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
      }

      return 0;
    });

    return sorted;
  }, [data, sortingKeys]);

  return { sortedData, requestSort };
};

export default useSortableData;