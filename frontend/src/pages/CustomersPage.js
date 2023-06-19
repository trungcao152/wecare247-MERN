import { useEffect } from "react";
import { useCustomersContext } from "../components/hooks/useCustomersContext";
//import SearchContainer from "../components/SearchContainer";

// components
import CustomerDetails from "../components/Customer/CustomerDetails";

const CustomersPage = () => {
  const { dispatch } = useCustomersContext();

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(
        "https://wecare247-backend.onrender.com/api/customers"
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CUSTOMERS", payload: json });
      }
    };
    fetchCustomers();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="customers">
        <CustomerDetails />
      </div>
    </div>
  );
};

export default CustomersPage;
