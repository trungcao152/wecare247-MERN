import { createContext, useReducer } from "react";

export const ProductsContext = createContext();

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        products: action.payload,
      };
    case "CREATE_PRODUCT":
      return {
        products: [action.payload, ...state.products],
      };
    case "DELETE_PRODUCT":
      return {
        products: state.products.filter((c) => c._id !== action.payload._id),
      };
    case "UPDATE_PRODUCT":
      return {
        products: state.products.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
      };

    default:
      return state;
  }
};

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: null,
  });

  // Log the state to the console
  console.log("Products State: ", state);

  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
