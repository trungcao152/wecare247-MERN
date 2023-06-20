import { useState } from "react";
import { useShiftsContext } from "../hooks/useShiftsContext";

const ShiftForm = ({ caregivers, customers, patients, products }) => {
  const { dispatch } = useShiftsContext();

  const [caregiver_id, setCaregiverId] = useState("");
  const [customer_id, setCustomerId] = useState("");
  const [patient_id, setPatientId] = useState("");
  const [product, setProduct] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shift = {
      caregiver_id,
      customer_id,
      patient_id,
      product,
      start_time,
      end_time,
    };

    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/shifts",
      {
        method: "POST",
        body: JSON.stringify(shift),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const json = await response.json();
      setCaregiverId("");
      setCustomerId("");
      setPatientId("");
      setProduct("");
      setStartTime("");
      setEndTime("");
      dispatch({ type: "CREATE_SHIFT", payload: json });
    }
  };

  return (
    <div className="shift-form">
      <form onSubmit={handleSubmit}>
        <h3>Add a New Shift</h3>

        <label>Caregiver:</label>
        <select
          onChange={(e) => setCaregiverId(e.target.value)}
          value={caregiver_id}>
          {caregivers &&
            caregivers.map((caregiver) => (
              <option key={caregiver._id} value={caregiver._id}>
                {caregiver.name}
              </option>
            ))}
        </select>

        <label>Customer:</label>
        <select
          onChange={(e) => setCustomerId(e.target.value)}
          value={customer_id}>
          {customers &&
            customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))}
        </select>

        <label>Patient:</label>
        <select
          onChange={(e) => setPatientId(e.target.value)}
          value={patient_id}>
          {patients &&
            patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
        </select>

        <label>Product:</label>
        <select onChange={(e) => setProduct(e.target.value)} value={product}>
          {products &&
            products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
        </select>

        <label>Start Time:</label>
        <input
          type="date"
          onChange={(e) => setStartTime(e.target.value)}
          value={start_time}
        />

        <label>End Time:</label>
        <input
          type="date"
          onChange={(e) => setEndTime(e.target.value)}
          value={end_time}
        />

        <button>Add Shift</button>
      </form>
    </div>
  );
};

export default ShiftForm;
