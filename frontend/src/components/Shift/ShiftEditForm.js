import { useState, useEffect } from "react";
import { useShiftsContext } from "../hooks/useShiftsContext";

const ShiftEditForm = ({
  shift,
  setIsEditing,
  caregivers,
  customers,
  patients,
  products,
}) => {
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const formatDateToInputValue = (date) => {
    if (!date) return ""; // return empty string if date is falsy

    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [formState, setFormState] = useState({
    ...shift,
    caregiver_id: shift.caregiver.caregiver_id,
    customer_id: shift.customer.customer_id,
    patient_id: shift.patient.patient_id,
    product_id: shift.product.product_id,
    start_time: formatDateToInputValue(shift.start_time),
    end_time: formatDateToInputValue(shift.end_time),
  });

  const { dispatch } = useShiftsContext();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedFormState = {
      ...formState,
      caregiver: caregivers.find(
        (caregiver) => caregiver.caregiver_id === formState.caregiver_id
      ),
      customer: customers.find(
        (customer) => customer.customer_id === formState.customer_id
      ),
      patient: patients.find(
        (patient) => patient.patient_id === formState.patient_id
      ),
      product: products.find(
        (product) => product.product_id === formState.product_id
      ),
    };

    updatedFormState.start_time = formState.start_time;
    updatedFormState.end_time = formState.end_time;

    console.log("Submitting updated data to the backend: ", updatedFormState); // Testing

    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/shifts/" + shift.shift_id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormState),
      }
    );

    //Testing response from backend
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      const errorBody = await response.json(); // Fetch error details from the body
      console.error("Response body: ", errorBody); // Log error details
      window.alert(
        "An error occurred while updating the shift. Please try again."
      ); // Alert user
      return; // Exit function, don't proceed with updating shift in context
    }

    const updatedShift = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_SHIFT", payload: updatedShift });
      setIsEditing(false);
    } else {
      window.alert("There is no such shift");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="caregiver_id">
        Caregiver:
        <select
          name="caregiver_id"
          value={formState.caregiver_id}
          onChange={handleChange}>
          {caregivers.map((caregiver) => (
            <option key={caregiver.caregiver_id} value={caregiver.caregiver_id}>
              {caregiver.caregiver_id}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="customer_id">
        Customer:
        <select
          name="customer_id"
          value={formState.customer_id}
          onChange={handleChange}>
          {customers.map((customer) => (
            <option key={customer.customer_id} value={customer.customer_id}>
              {customer.customer_id}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="patient_id">
        Patient:
        <select
          name="patient_id"
          value={formState.patient_id}
          onChange={handleChange}>
          {patients.map((patient) => (
            <option key={patient.patient_id} value={patient.patient_id}>
              {patient.patient_id}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="product_id">
        Product:
        <select
          name="product_id"
          value={formState.product_id}
          onChange={handleChange}>
          {products.map((product) => (
            <option key={product.product_id} value={product.product_id}>
              {product.product_id}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="start_time">
        Start Time:
        <input
          type="datetime-local"
          name="start_time"
          value={formState.start_time}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="end_time">
        End Time:
        <input
          type="datetime-local"
          name="end_time"
          value={formState.end_time}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ShiftEditForm;
