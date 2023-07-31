import React, { createContext, useContext, useState, useCallback } from "react";

const CaregiverFreeTimeContext = createContext();

export const useCaregiverFreeTime = () => {
  return useContext(CaregiverFreeTimeContext);
};

export const CaregiverFreeTimeProvider = ({ children }) => {
  const [freeTimeData, setFreeTimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFreeTimeData = useCallback(async (startDate, endDate) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/caregiversFreeTime?startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch free time data");
      }

      const data = await response.json();
      setFreeTimeData(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const adjustFreeTimeForShift = useCallback(
    async (caregiver_id, startTime, endTime) => {
      // placeholder
    },
    []
  );

  const value = {
    freeTimeData,
    isLoading,
    error,
    fetchFreeTimeData,
    adjustFreeTimeForShift,
  };

  return (
    <CaregiverFreeTimeContext.Provider value={value}>
      {children}
    </CaregiverFreeTimeContext.Provider>
  );
};
