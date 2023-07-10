import { useState } from "react";
import { usePatientsContext } from "../hooks/usePatientsContext";

const PatientForm = () => {
  const { dispatch } = usePatientsContext();

  const [patient_id, setPatient_id] = useState("");
  const [patient_name, setPatient_name] = useState("");
  const [patient_type, setPatient_type] = useState("");
  const [weight, setWeight] = useState("");
  const [physical_condition, setPhysical_condition] = useState("");
  const [memory_condition, setMemory_condition] = useState("");
  const [ulcer, setUlcer] = useState("");
  const [neural_disease, setNeural_disease] = useState("");
  const [endo_tube, setEndo_tube] = useState("");
  const [nebuliser, setNebuliser] = useState("");
  const [patient_condition, setPatient_condition] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patient = {
      patient_id,
      patient_name,
      patient_type,
      weight,
      physical_condition,
      memory_condition,
      ulcer,
      neural_disease,
      endo_tube,
      nebuliser,
      patient_condition,
    };

    console.log("patient object:", patient);

    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/patients",
      {
        method: "POST",
        body: JSON.stringify(patient),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }
    if (response.ok) {
      setPatient_id("");
      setPatient_name("");
      setPatient_type("");
      setWeight("");
      setPhysical_condition("");
      setMemory_condition("");
      setUlcer("");
      setNeural_disease("");
      setEndo_tube("");
      setNebuliser("");
      setPatient_condition("");

      setError(null);
      setEmptyFields([]);
      console.log("New patient added", json);
      dispatch({ type: "CREATE_PATIENT", payload: json });
    }
  };

  return (
    <div className="patient-form">
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Patient</h3>

        <label>Patient ID:</label>
        <input
          type="text"
          onChange={(e) => setPatient_id(e.target.value)}
          value={patient_id}
          className={emptyFields.includes("patient_id") ? "error" : ""}
        />

        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => setPatient_name(e.target.value)}
          value={patient_name}
          className={emptyFields.includes("patient_name") ? "error" : ""}
        />

        <label>Patient Type:</label>
        <input
          type="text"
          onChange={(e) => setPatient_type(e.target.value)}
          value={patient_type}
          className={emptyFields.includes("patient_type") ? "error" : ""}
        />

        <label>Weight (in kg):</label>
        <input
          type="number"
          onChange={(e) => setWeight(e.target.value)}
          value={weight}
          className={emptyFields.includes("weight") ? "error" : ""}
        />

        <label>Physical Condition:</label>
        <input
          type="text"
          onChange={(e) => setPhysical_condition(e.target.value)}
          value={physical_condition}
          className={emptyFields.includes("physical_condition") ? "error" : ""}
        />

        <label>Memory Condition:</label>
        <input
          type="text"
          onChange={(e) => setMemory_condition(e.target.value)}
          value={memory_condition}
          className={emptyFields.includes("memory_condition") ? "error" : ""}
        />

        <label>Ulcer:</label>
        <input
          type="text"
          onChange={(e) => setUlcer(e.target.value)}
          value={ulcer}
          className={emptyFields.includes("ulcer") ? "error" : ""}
        />

        <label>Neural Disease:</label>
        <input
          type="text"
          onChange={(e) => setNeural_disease(e.target.value)}
          value={neural_disease}
          className={emptyFields.includes("neural_disease") ? "error" : ""}
        />

        <label>Endo Tube:</label>
        <input
          type="text"
          onChange={(e) => setEndo_tube(e.target.value)}
          value={endo_tube}
          className={emptyFields.includes("endo_tube") ? "error" : ""}
        />

        <label>Nebuliser:</label>
        <input
          type="text"
          onChange={(e) => setNebuliser(e.target.value)}
          value={nebuliser}
          className={emptyFields.includes("nebuliser") ? "error" : ""}
        />

        <label>Patient Condition:</label>
        <input
          type="number"
          onChange={(e) => setPatient_condition(e.target.value)}
          value={patient_condition}
          className={emptyFields.includes("patient_condition") ? "error" : ""}
        />
        <button>Add Patient</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default PatientForm;
