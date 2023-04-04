import { useState } from "react";
import { useCaregiversContext } from "./hooks/useCaregiversContext";

const CaregiverForm = () => {
  const { dispatch } = useCaregiversContext();

  const [_id, set_id] = useState("");
  const [employee_name, setEmployee_name] = useState("");
  const [current_address, setCurrent_address] = useState("");
  const [birth_year, setBirth_year] = useState("");
  const [skill_level, setSkill_level] = useState("");
  const [preferred_working_location, setPreferred_working_location] =
    useState("");
  const [working_status, setWorking_status] = useState("");
  const [employee_phone, setEmployee_phone] = useState("");
  const [employee_gender, setEmployee_gender] = useState("");
  const [national_id, setNational_id] = useState("");
  const [national_id_issue_date, setNational_id_issue_date] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const caregiver = {
      _id,
      employee_name,
      current_address,
      birth_year,
      skill_level,
      preferred_working_location,
      working_status,
      employee_phone,
      employee_gender,
      national_id,
      national_id_issue_date,
      age,
    };

    console.log("caregiver object:", caregiver);

    const response = await fetch("/api/caregivers", {
      method: "POST",
      body: JSON.stringify(caregiver),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }
    if (response.ok) {
      set_id("");
      setEmployee_name("");
      setCurrent_address("");
      setBirth_year("");
      setSkill_level("");
      setPreferred_working_location("");
      setWorking_status("");
      setEmployee_phone("");
      setEmployee_gender("");
      setNational_id("");
      setNational_id_issue_date("");
      setAge("");

      setError(null);
      setEmptyFields([]);
      console.log("New caregiver added", json);
      dispatch({ type: "CREATE_CAREGIVER", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Caregiver</h3>

      <label>Employee ID:</label>
      <input
        type="text"
        onChange={(e) => set_id(e.target.value)}
        value={_id}
        className={emptyFields.includes("_id") ? "error" : ""}
      />

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setEmployee_name(e.target.value)}
        value={employee_name}
        className={emptyFields.includes("employee_name") ? "error" : ""}
      />

      <label>Current Address:</label>
      <input
        type="text"
        onChange={(e) => setCurrent_address(e.target.value)}
        value={current_address}
        className={emptyFields.includes("current_address") ? "error" : ""}
      />

      <label>Birth Year:</label>
      <input
        type="number"
        onChange={(e) => setBirth_year(e.target.value)}
        value={birth_year}
        className={emptyFields.includes("birth_year") ? "error" : ""}
      />

      <label>Skill Level:</label>
      <input
        type="number"
        onChange={(e) => setSkill_level(e.target.value)}
        value={skill_level}
        className={emptyFields.includes("skill_level") ? "error" : ""}
      />

      <label>Preferred Working Location:</label>
      <input
        type="text"
        onChange={(e) => setPreferred_working_location(e.target.value)}
        value={preferred_working_location}
        className={
          emptyFields.includes("preferred_working_location") ? "error" : ""
        }
      />

      <label>Working Status:</label>
      <input
        type="text"
        onChange={(e) => setWorking_status(e.target.value)}
        value={working_status}
        className={emptyFields.includes("working_status") ? "error" : ""}
      />

      <label>Phone Number:</label>
      <input
        type="number"
        onChange={(e) => setEmployee_phone(e.target.value)}
        value={employee_phone}
        className={emptyFields.includes("employee_phone") ? "error" : ""}
      />

      <label>Gender:</label>
      <input
        type="text"
        onChange={(e) => setEmployee_gender(e.target.value)}
        value={employee_gender}
        className={emptyFields.includes("employee_gender") ? "error" : ""}
      />

      <label>National ID:</label>
      <input
        type="text"
        onChange={(e) => setNational_id(e.target.value)}
        value={national_id}
        className={emptyFields.includes("national_id") ? "error" : ""}
      />

      <label>National ID Issue Date:</label>
      <input
        type="date"
        onChange={(e) => setNational_id_issue_date(e.target.value)}
        value={national_id_issue_date}
        className={
          emptyFields.includes("national_id_issue_date") ? "error" : ""
        }
      />

      <label>Age:</label>
      <input
        type="number"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        className={emptyFields.includes("age") ? "error" : ""}
      />

      <button>Add Caregiver</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CaregiverForm;
