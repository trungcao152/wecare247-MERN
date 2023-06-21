import { createContext, useReducer } from "react";

export const CaregiversContext = createContext();

export const caregiversReducer = (state, action) => {
  switch (action.type) {
    case "SET_CAREGIVERS":
      return {
        caregivers: action.payload,
      };
    case "CREATE_CAREGIVER":
      return {
        caregivers: [action.payload, ...state.caregivers],
      };
    case "DELETE_CAREGIVER":
      return {
        caregivers: state.caregivers.filter(
          (c) => c._id !== action.payload._id
        ),
      };
    case "UPDATE_CAREGIVER":
      return {
        caregivers: state.caregivers.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
      };

    default:
      return state;
  }
};

export const CaregiversContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(caregiversReducer, {
    caregivers: null,
  });

  // Log the state to the console
  console.log("Caregivers State: ", state);

  return (
    <CaregiversContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CaregiversContext.Provider>
  );
};
