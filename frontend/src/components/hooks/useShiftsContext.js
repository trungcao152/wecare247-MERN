import { ShiftsContext } from "../../context/ShiftsContext";
import { useContext } from "react";

export const useShiftsContext = () => {
  const context = useContext(ShiftsContext);

  if (!context) {
    throw Error("useShiftsContext must be used inside a ShiftsContextProvider");
  }

  return context;
};
