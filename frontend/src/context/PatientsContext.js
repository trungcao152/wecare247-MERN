import { createContext, useReducer, useEffect } from "react";

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
    patients: [],
  });

  useEffect(() => {
    // Function to load existing patients
    const loadPatients = async () => {
      const response = await fetch(
        "https://wecare247-backend.onrender.com/api/patients"
      );

      if (!response.ok) {
        console.error("Failed to fetch patients");
        return;
      }

      const patients = await response.json();
      dispatch({ type: "SET_PATIENTS", payload: patients });
    };

    // Call the function to load patients
    loadPatients();
  }, []);

  return (
    <PatientsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PatientsContext.Provider>
  );
};
