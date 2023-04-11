import { useState } from "react";
import { useCaregiversContext } from "./hooks/useCaregiversContext";

const EditCaregiverForm = ({ caregiver, setIsEditing }) => {
  const formattedDate = caregiver.national_id_issue_date
    ? new Date(caregiver.national_id_issue_date).toISOString().split("T")[0]
    : "";

  const [formState, setFormState] = useState({
    ...caregiver,
    national_id_issue_date: formattedDate,
  });
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
      <label htmlFor="employee_name">
        Name:
        <input
          type="text"
          name="employee_name"
          value={formState.employee_name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="current_address">
        Current Address:
        <input
          type="text"
          name="current_address"
          value={formState.current_address}
          onChange={handleChange}
          placeholder={`Current Address: ${caregiver.current_address}`}
        />
      </label>
      <label htmlFor="birth_year">
        Birth Year:
        <input
          type="number"
          name="birth_year"
          value={formState.birth_year}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="skill_level">
        Skill Level:
        <input
          type="number"
          name="skill_level"
          value={formState.skill_level}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="preferred_working_location">
        Preferred Working Location:
        <input
          type="text"
          name="preferred_working_location"
          value={formState.preferred_working_location}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="working_status">
        Working Status:
        <input
          type="text"
          name="working_status"
          value={formState.working_status}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="employee_phone">
        Phone Number:
        <input
          type="number"
          name="employee_phone"
          value={formState.employee_phone}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="employee_gender">
        Gender:
        <input
          type="text"
          name="employee_gender"
          value={formState.employee_gender}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="national_id">
        National ID:
        <input
          type="text"
          name="national_id"
          value={formState.national_id}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="national_id_issue_date">
        National ID Issue Date:
        <input
          type="date"
          name="national_id_issue_date"
          value={formState.national_id_issue_date}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="age">
        Age:
        <input
          type="number"
          name="age"
          value={formState.age}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditCaregiverForm;
