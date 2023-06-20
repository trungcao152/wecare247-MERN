import { usePatientsContext } from "../hooks/usePatientsContext";
import { useEffect } from "react";
import PatientTable from "./PatientTable";
import PatientForm from "./PatientForm";
import "./Patients.css"; // Import the CSS file

const PatientDetails = () => {
  const { dispatch } = usePatientsContext();

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch(
        "https://wecare247-backend.onrender.com/api/patients"
      );
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PATIENTS", payload: data });
      } else {
        // Handle the error
        console.error(data);
      }
    };

    fetchPatients();
  }, [dispatch]);

  const handleDelete = async (id) => {
    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/patients/" + id,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const json = await response.json();
    dispatch({ type: "DELETE_PATIENT", payload: json });
  };

  const handleDeleteClick = async (id) => {
    try {
      await handleDelete(id);
    } catch (error) {
      console.error(error);
    }
  };

  // Props for the table title
  const tableTitle = "Patient Database";

  return (
    <div className="patients-container">
      <PatientForm />
      <PatientTable handleDelete={handleDeleteClick} tableTitle={tableTitle} />
    </div>
  );
};

export default PatientDetails;
