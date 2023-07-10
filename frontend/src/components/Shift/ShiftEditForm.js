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
    return `${day}/${month}/${year}`;
  };

  const formattedStartTime = shift.start_time
    ? formatDate(shift.start_time)
    : "";
  const formattedEndTime = shift.end_time ? formatDate(shift.end_time) : "";

  const [formState, setFormState] = useState({
    ...shift,
    caregiver_id: shift.caregiver.caregiver_id.toString(),
    customer_id: shift.customer.customer_id.toString(),
    patient_id: shift.patient.patient_id.toString(),
    product_id: shift.product.product_id.toString(),
    start_time: formattedStartTime,
    end_time: formattedEndTime,
  });

  const { dispatch } = useShiftsContext();

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
      start_time: parseDate(formState.start_time),
      end_time: parseDate(formState.end_time),
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
              {caregiver.name}
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
              {customer.name}
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
              {patient.name}
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
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="start_time">
        Start Time:
        <input
          type="date"
          name="start_time"
          value={formState.start_time.split("/").reverse().join("-")}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="end_time">
        End Time:
        <input
          type="date"
          name="end_time"
          value={formState.end_time.split("/").reverse().join("-")}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ShiftEditForm;
