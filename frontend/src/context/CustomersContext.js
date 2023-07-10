import { createContext, useReducer } from "react";

export const CustomersContext = createContext();

export const customersReducer = (state, action) => {
  switch (action.type) {
    case "SET_CUSTOMERS":
      return {
        customers: action.payload,
      };
    case "CREATE_CUSTOMER":
      return {
        customers: [action.payload, ...state.customers],
      };
    case "DELETE_CUSTOMER":
      return {
        customers: state.customers.filter(
          (c) => c.customer_id !== action.payload.customer_id
        ),
      };
    case "UPDATE_CUSTOMER":
      return {
        customers: state.customers.map((c) =>
          c.customer_id === action.payload.customer_id ? action.payload : c
        ),
      };

    default:
      return state;
  }
};

export const CustomersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(customersReducer, {
    customers: null,
  });

  // Log the state to the console
  console.log("Customers State: ", state);

  return (
    <CustomersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CustomersContext.Provider>
  );
};
