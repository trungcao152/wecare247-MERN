import { useCaregiversContext } from "./hooks/useCaregiversContext";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState } from "react";
import EditCaregiverForm from "./EditCaregiverForm";

const CaregiverDetails = ({ caregiver }) => {
  const { dispatch } = useCaregiversContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = async () => {
    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/caregivers/" + caregiver._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_CAREGIVER", payload: json });
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const formattedDate = (date) => {
    return new Intl.DateTimeFormat("en-GB").format(new Date(date));
  };

  return (
    <div className="caregiver-details">
      <h4>{caregiver._id}</h4>
      <p>
        <strong>Name: </strong>
        {caregiver.employee_name}
      </p>
      <p>
        <strong>Current Address: </strong>
        {caregiver.current_address}
      </p>
      <p>
        <strong>Birth Year: </strong>
        {caregiver.birth_year}
      </p>
      <p>
        <strong>Skill Level: </strong>
        {caregiver.skill_level}
      </p>
      <p>
        <strong>Preferred Working Location: </strong>
        {caregiver.preferred_working_location}
      </p>
      <p>
        <strong>Working Status: </strong>
        {caregiver.working_status}
      </p>
      <p>
        <strong>Phone Number: </strong>
        {caregiver.employee_phone}
      </p>
      <p>
        <strong>Gender: </strong>
        {caregiver.employee_gender}
      </p>
      <p>
        <strong>National ID: </strong>
        {caregiver.national_id}
      </p>
      <p>
        <strong>National ID issue date: </strong>
        {formattedDate(caregiver.national_id_issue_date)}
      </p>
      <p>
        <strong>Age: </strong>
        {caregiver.age}
      </p>
      <p>
        {formatDistanceToNow(new Date(caregiver.createdAt), {
          addSuffix: true,
        })}
      </p>
      <div style={{ textAlign: "left" }}>
        <button className="edit-button" onClick={handleEditClick}>
          Edit
        </button>
      </div>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>

      {isEditing && (
        <EditCaregiverForm caregiver={caregiver} setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default CaregiverDetails;
