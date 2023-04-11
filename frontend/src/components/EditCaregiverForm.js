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
      />
      <input
        type="text"
        name="current_address"
        value={formState.current_address}
        onChange={handleChange}
      />

      <input
        type="number"
        name="birth_year"
        value={formState.birth_year}
        onChange={handleChange}
      />
      <input
        type="number"
        name="skill_level"
        value={formState.skill_level}
        onChange={handleChange}
      />
      <input
        type="text"
        name="preferred_working_location"
        value={formState.preferred_working_location}
        onChange={handleChange}
      />
      <input
        type="text"
        name="working_status"
        value={formState.working_status}
        onChange={handleChange}
      />
      <input
        type="number"
        name="employee_phone"
        value={formState.employee_phone}
        onChange={handleChange}
      />
      <input
        type="text"
        name="employee_gender"
        value={formState.employee_gender}
        onChange={handleChange}
      />
      <input
        type="text"
        name="national_id"
        value={formState.national_id}
        onChange={handleChange}
      />
      <input
        type="date"
        name="national_id_issue_date"
        value={formState.national_id_issue_date}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        value={formState.age}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditCaregiverForm;
