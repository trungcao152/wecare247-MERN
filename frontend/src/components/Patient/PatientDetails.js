import { usePatientsContext } from "../hooks/usePatientsContext";
import PatientsTable from "./PatientTable";
import PatientForm from "./PatientForm";
import "./Patients.css"; // Import the CSS file

const PatientDetails = () => {
  const { dispatch } = usePatientsContext();

  const handleDelete = async (id) => {
    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/patients/" + id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PATIENT", payload: json });
    }
  };

  // Props for the table title
  const tableTitle = "Patient Database";

  return (
    <div className="patients-container">
      <PatientForm />
      <PatientsTable handleDelete={handleDelete} tableTitle={tableTitle} />
    </div>
  );
};

export default PatientDetails;
