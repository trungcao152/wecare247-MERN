import { createContext, useReducer } from "react";

export const PatientsContext = createContext();

export const patientsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PATIENTS":
      return {
        patients: action.payload,
      };
    case "CREATE_PATIENT":
      return {
        patients: [action.payload, ...state.patients],
      };
    case "DELETE_PATIENT":
      return {
        patients: state.patients.filter((c) => c._id !== action.payload._id),
      };
    case "UPDATE_PATIENT":
      return {
        patients: state.patients.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
      };

    default:
      return state;
  }
};

export const PatientsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(patientsReducer, {
    patients: null,
  });

  // Log the state to the console
  console.log("Patients State: ", state);

  return (
    <PatientsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PatientsContext.Provider>
  );
};
