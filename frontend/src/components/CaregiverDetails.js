import { useCaregiversContext } from "./hooks/useCaregiversContext";
import CaregiversTable from "./CaregiversTable";

const CaregiverDetails = () => {
  const { dispatch } = useCaregiversContext();

  const handleDelete = async (id) => {
    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/caregivers/" + id,
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
    <div className="caregiver-details">
      <CaregiversTable handleDelete={handleDelete} tableTitle={tableTitle} />
    </div>
  );
};

export default CaregiverDetails;
