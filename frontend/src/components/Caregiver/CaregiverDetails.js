import { useCaregiversContext } from "../hooks/useCaregiversContext";
import CaregiversTable from "./CaregiversTable";
import CaregiverForm from "./CaregiverForm";
import "./Caregivers.css"; // Import the CSS file

const CaregiverDetails = () => {
  const { dispatch } = useCaregiversContext();

  const handleDelete = async (caregiver_id) => {
    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/caregivers/" + caregiver_id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_CAREGIVER", payload: json });
    }
  };

  // Props for the table title
  const tableTitle = "Caregiver Database";

  return (
    <div className="caregivers-container">
      <CaregiverForm />
      <CaregiversTable handleDelete={handleDelete} tableTitle={tableTitle} />
    </div>
  );
};

export default CaregiverDetails;
