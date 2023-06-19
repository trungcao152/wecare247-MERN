import { useCustomersContext } from "../hooks/useCustomersContext.js";
import CustomersTable from "./CustomerTable";
import CustomerForm from "./CustomerForm";
import "./Customers.css"; // Import the CSS file

const CustomerDetails = () => {
  const { dispatch } = useCustomersContext();

  const handleDelete = async (id) => {
    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/customers/" + id,
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
      <CustomersTable handleDelete={handleDelete} tableTitle={tableTitle} />
    </div>
  );
};

export default CustomerDetails;
