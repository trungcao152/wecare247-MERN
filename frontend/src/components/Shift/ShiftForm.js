import { useState } from "react";
import { useShiftsContext } from "../hooks/useShiftsContext";
import ShiftFilter from "./ShiftFilter";

const ShiftForm = ({ caregivers, customers, patients, products }) => {
  console.log("Initial caregivers:", caregivers); //Testing

  const { dispatch } = useShiftsContext();

  const [shift_id, setShiftId] = useState("");
  const [caregiver_id, setCaregiverId] = useState("");
  const [customer_id, setCustomerId] = useState("");
  const [patient_id, setPatientId] = useState("");
  const [product_id, setProductId] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");

  const [filteredCaregivers, setFilteredCaregivers] = useState(caregivers); // New state for filtered caregivers

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shift = {
      shift_id,
      caregiver_id,
      customer_id,
      patient_id,
      product_id,
      start_time: new Date(start_time).toISOString(),
      end_time: new Date(end_time).toISOString(),
    };

    console.log("Submitting data to the backend: ", shift); // Test shift

    try {
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

      //Testing response from backend
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        console.error("Response body: ", await response.json()); // Add this line
      }

      const json = await response.json();
      setCaregiverId("");
      setCustomerId("");
      setPatientId("");
      setProductId("");
      setStartTime("");
      setEndTime("");
      dispatch({ type: "CREATE_SHIFT", payload: json });
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div className="shift-form">
      <form onSubmit={handleSubmit}>
        <h3>Add a New Shift</h3>

        <ShiftFilter
          initialCaregivers={caregivers}
          onFilterChange={setFilteredCaregivers}
        />

        <label>Shift ID:</label>
        <input
          type="text"
          onChange={(e) => setShiftId(e.target.value)}
          value={shift_id}
        />

        <label>Caregiver:</label>
        <select
          onChange={(e) => setCaregiverId(e.target.value)}
          value={caregiver_id}>
          {filteredCaregivers && // Change caregivers to filteredCaregivers
            filteredCaregivers.map((caregiver) => (
              <option
                key={caregiver.caregiver_id}
                value={caregiver.caregiver_id}>
                {caregiver.caregiver_id}
              </option>
            ))}
        </select>

        <label>Customer:</label>
        <select
          onChange={(e) => setCustomerId(e.target.value)}
          value={customer_id}>
          {customers &&
            customers.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.customer_id}
              </option>
            ))}
        </select>

        <label>Patient:</label>
        <select
          onChange={(e) => setPatientId(e.target.value)}
          value={patient_id}>
          {patients &&
            patients.map((patient) => (
              <option key={patient.patient_id} value={patient.patient_id}>
                {patient.patient_id}
              </option>
            ))}
        </select>

        <label>Product:</label>
        <select
          onChange={(e) => setProductId(e.target.value)}
          value={product_id}>
          {products &&
            products.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_id}
              </option>
            ))}
        </select>

        <label>Start Time:</label>
        <input
          type="datetime-local"
          onChange={(e) => setStartTime(e.target.value)}
          value={start_time}
        />

        <label>End Time:</label>
        <input
          type="datetime-local"
          onChange={(e) => setEndTime(e.target.value)}
          value={end_time}
        />

        <button>Add Shift</button>
      </form>
    </div>
  );
};

export default ShiftForm;
