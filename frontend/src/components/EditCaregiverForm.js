import { useState } from "react";
import { useCaregiversContext } from "./hooks/useCaregiversContext";

const EditCaregiverForm = ({ caregiver, setIsEditing }) => {
  const [formState, setFormState] = useState(caregiver);
  const { dispatch } = useCaregiversContext();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Test url
    const url =
      "https://wecare247-backend.onrender.com/api/caregivers/" + caregiver._id;
    console.log("Request URL:", url);

    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/caregivers/" + caregiver._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      }
    );

    const updatedCaregiver = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_CAREGIVER", payload: updatedCaregiver });
      setIsEditing(false);
    } else {
      // Show an error message as a popup
      window.alert("There is no such caregiver");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="employee_name"
        value={formState.employee_name}
        onChange={handleChange}
        placeholder={`Name: ${caregiver.employee_name}`}
      />
      <input
        type="text"
        name="current_address"
        value={formState.current_address}
        onChange={handleChange}
        placeholder={`Current Address: ${caregiver.current_address}`}
      />

      <input
        type="number"
        name="birth_year"
        value={formState.birth_year}
        onChange={handleChange}
        placeholder={`Birth Year: ${caregiver.birth_year}`}
      />
      <input
        type="number"
        name="skill_level"
        value={formState.skill_level}
        onChange={handleChange}
        placeholder={`Skill Level: ${caregiver.skill_level}`}
      />
      <input
        type="text"
        name="preferred_working_location"
        value={formState.preferred_working_location}
        onChange={handleChange}
        placeholder={`Preferred Working Location: ${caregiver.preferred_working_location}`}
      />
      <input
        type="text"
        name="working_status"
        value={formState.working_status}
        onChange={handleChange}
        placeholder={`Working Status: ${caregiver.working_status}`}
      />
      <input
        type="number"
        name="employee_phone"
        value={formState.employee_phone}
        onChange={handleChange}
        placeholder={`Phone Number: ${caregiver.employee_phone}`}
      />
      <input
        type="text"
        name="employee_gender"
        value={formState.employee_gender}
        onChange={handleChange}
        placeholder={`Gender: ${caregiver.employee_gender}`}
      />
      <input
        type="text"
        name="national_id"
        value={formState.national_id}
        onChange={handleChange}
        placeholder={`National ID: ${caregiver.national_id}`}
      />
      <input
        type="date"
        name="national_id_issue_date"
        value={formState.national_id_issue_date}
        onChange={handleChange}
        placeholder={`National ID Issue Date: ${caregiver.national_id_issue_date}`}
      />
      <input
        type="number"
        name="age"
        value={formState.age}
        onChange={handleChange}
        placeholder={`Age: ${caregiver.age}`}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditCaregiverForm;
