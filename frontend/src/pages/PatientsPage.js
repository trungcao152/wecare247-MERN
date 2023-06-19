import { useEffect } from "react";
import { usePatientsContext } from "../components/hooks/usePatientsContext";
import SearchContainer from "../components/SearchContainer";

// components
import PatientDetails from "../components/Patient/PatientDetails";

const Patients = () => {
  const { dispatch } = usePatientsContext();

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch(
        "https://wecare247-backend.onrender.com/api/patients"
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PATIENTS", payload: json });
      }
    };
    fetchPatients();
  }, [dispatch]);

  return (
    <div className="home">
      <header>
        <SearchContainer />
      </header>
      <div className="patients">
        <PatientDetails />
      </div>
    </div>
  );
};

export default Patients;
