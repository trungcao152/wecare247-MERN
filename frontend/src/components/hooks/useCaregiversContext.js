import { CaregiversContext } from "../../context/CaregiversContext";
import { useContext } from "react";

export const useCaregiversContext = () => {
  const context = useContext(CaregiversContext);

  if (!context) {
    throw Error(
      "useCaregiversContext must be used inside a CaregiversContextProvider"
    );
  }

  return context;
};
