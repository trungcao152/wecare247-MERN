import { useCustomersContext } from "../hooks/useCustomersContext.js";
import CustomerTable from "./CustomerTable";
import CustomerForm from "./CustomerForm";
import "./Customers.css"; // Import the CSS file

const CustomerDetails = () => {
  const { dispatch } = useCustomersContext();

  const handleDelete = async (customer_id) => {
    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/customers/" + customer_id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_CUSTOMER", payload: json });
    }
  };

  // Props for the table title
  const tableTitle = "Customer Database";

  return (
    <div className="customers-container">
      <CustomerForm />
      <CustomerTable handleDelete={handleDelete} tableTitle={tableTitle} />
    </div>
  );
};

export default CustomerDetails;
