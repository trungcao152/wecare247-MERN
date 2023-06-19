import { createContext, useReducer } from "react";

export const ShiftsContext = createContext();

export const shiftsReducer = (state, action) => {
  switch (action.type) {
    case "SET_SHIFTS":
      return {
        shifts: action.payload,
      };
    case "CREATE_SHIFT":
      return {
        shifts: [action.payload, ...state.shifts],
      };
    case "DELETE_SHIFT":
      return {
        shifts: state.shifts.filter((c) => c._id !== action.payload._id),
      };
    case "UPDATE_SHIFT":
      return {
        shifts: state.shifts.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
      };

    default:
      return state;
  }
};

export const ShiftsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shiftsReducer, {
    shifts: null,
  });

  return (
    <ShiftsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ShiftsContext.Provider>
  );
};
