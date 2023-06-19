import { useState } from "react";
import { useCustomersContext } from "../hooks/useCustomersContext.js";

const CustomerEditForm = ({ customer, setIsEditing }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formattedDate = customer.customer_birthday
    ? formatDate(customer.customer_birthday)
    : "";

  const [formState, setFormState] = useState({
    ...customer,
    customer_birthday: formattedDate,
  });
  const { dispatch } = useCustomersContext();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  //parse the date back to the yyyy-mm-dd format
  const parseDate = (date) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedFormState = {
      ...formState,
      customer_birthday: parseDate(formState.customer_birthday),
    };

    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/customers/" + customer._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormState),
      }
    );

    const updatedCustomer = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_CUSTOMER", payload: updatedCustomer });
      setIsEditing(false);
    } else {
      // Show an error message as a popup
      window.alert("There is no such customer");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="customer_name">
        Name:
        <input
          type="text"
          name="customer_name"
          value={formState.customer_name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="customer_phone">
        Phone Number:
        <input
          type="number"
          name="customer_phone"
          value={formState.customer_phone}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="customer_email">
        Email:
        <input
          type="text"
          name="customer_email"
          value={formState.customer_email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="customer_birthday">
        DOB:
        <input
          type="text"
          name="customer_birthday"
          value={formState.customer_birthday}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="customer_address">
        Current Address:
        <input
          type="text"
          name="customer_address"
          value={formState.customer_address}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="customer_creator">
        Customer Creator:
        <input
          type="text"
          name="customer_creator"
          value={formState.customer_creator}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="customer_type">
        Customer Type:
        <input
          type="text"
          name="customer_type"
          value={formState.customer_type}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomerEditForm;
