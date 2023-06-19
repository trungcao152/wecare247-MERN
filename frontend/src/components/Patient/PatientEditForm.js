import { useState } from "react";
import { usePatientsContext } from "../hooks/usePatientsContext";

const PatientEditForm = ({ patient, setIsEditing }) => {
  const [formState, setFormState] = useState(patient);
  const { dispatch } = usePatientsContext();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/patients/" + patient._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      }
    );

    const updatedPatient = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_PATIENT", payload: updatedPatient });
      setIsEditing(false);
    } else {
      // Show an error message as a popup
      window.alert("There is no such patient");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="patient_name">
        Name:
        <input
          type="text"
          name="patient_name"
          value={formState.patient_name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="patient_type">
        Type:
        <input
          type="text"
          name="patient_type"
          value={formState.patient_type}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="weight">
        Weight (in kg):
        <input
          type="number"
          name="weight"
          value={formState.weight}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="physical_condition">
        Physical Condition:
        <input
          type="text"
          name="physical_condition"
          value={formState.physical_condition}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="memory_condition">
        Memory Condition:
        <input
          type="text"
          name="memory_condition"
          value={formState.memory_condition}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="ulcer">
        Ulcer:
        <input
          type="text"
          name="ulcer"
          value={formState.ulcer}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="neural_disease">
        Neural Disease:
        <input
          type="text"
          name="neural_disease"
          value={formState.neural_disease}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="endo_tube">
        Endo Tube:
        <input
          type="text"
          name="endo_tube"
          value={formState.endo_tube}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="nebuliser">
        Nebuliser:
        <input
          type="text"
          name="nebuliser"
          value={formState.nebuliser}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="patient_condition">
        Patient Condition:
        <input
          type="number"
          name="patient_condition"
          value={formState.patient_condition}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PatientEditForm;
