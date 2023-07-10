import { useState } from "react";
import { useCustomersContext } from "../hooks/useCustomersContext.js";

const CustomerForm = () => {
  const { dispatch } = useCustomersContext();

  const [customer_id, setCustomer_id] = useState("");
  const [customer_name, setCustomer_name] = useState("");
  const [customer_phone, setCustomer_phone] = useState("");
  const [customer_email, setCustomer_email] = useState("");
  const [customer_birthday, setCustomer_birthday] = useState("");
  const [customer_address, setCustomer_address] = useState("");
  const [customer_creator, setCustomer_creator] = useState("");
  const [customer_type, setCustomer_type] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customer = {
      customer_id,
      customer_name,
      customer_phone,
      customer_email,
      customer_birthday,
      customer_address,
      customer_creator,
      customer_type,
    };

    console.log("customer object:", customer);

    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/customers",
      {
        method: "POST",
        body: JSON.stringify(customer),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }
    if (response.ok) {
      setCustomer_id("");
      setCustomer_name("");
      setCustomer_phone("");
      setCustomer_email("");
      setCustomer_birthday("");
      setCustomer_address("");
      setCustomer_creator("");
      setCustomer_type("");

      setError(null);
      setEmptyFields([]);
      console.log("New customer added", json);
      dispatch({ type: "CREATE_CUSTOMER", payload: json });
    }
  };

  return (
    <div className="customer-form">
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Customer</h3>

        <label>Customer ID:</label>
        <input
          type="text"
          onChange={(e) => setCustomer_id(e.target.value)}
          value={customer_id}
          className={emptyFields.includes("customer_id") ? "error" : ""}
        />

        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => setCustomer_name(e.target.value)}
          value={customer_name}
          className={emptyFields.includes("customer_name") ? "error" : ""}
        />

        <label>Phone Number:</label>
        <input
          type="number"
          onChange={(e) => setCustomer_phone(e.target.value)}
          value={customer_phone}
          className={emptyFields.includes("customer_phone") ? "error" : ""}
        />

        <label>Email:</label>
        <input
          type="text"
          onChange={(e) => setCustomer_email(e.target.value)}
          value={customer_email}
          className={emptyFields.includes("customer_email") ? "error" : ""}
        />

        <label>DOB:</label>
        <input
          type="date"
          onChange={(e) => setCustomer_birthday(e.target.value)}
          value={customer_birthday}
          className={emptyFields.includes("customer_birthday") ? "error" : ""}
        />

        <label>Current Address:</label>
        <input
          type="text"
          onChange={(e) => setCustomer_address(e.target.value)}
          value={customer_address}
          className={emptyFields.includes("customer_address") ? "error" : ""}
        />

        <label>Customer Creator:</label>
        <input
          type="text"
          onChange={(e) => setCustomer_creator(e.target.value)}
          value={customer_creator}
          className={emptyFields.includes("customer_creator") ? "error" : ""}
        />

        <label>Customer Type:</label>
        <input
          type="text"
          onChange={(e) => setCustomer_type(e.target.value)}
          value={customer_type}
          className={emptyFields.includes("customer_type") ? "error" : ""}
        />

        <button>Add Customer</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default CustomerForm;
