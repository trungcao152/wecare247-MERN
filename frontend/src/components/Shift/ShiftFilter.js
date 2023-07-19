import { useState, useEffect } from "react";

const ShiftFilter = ({ initialCaregivers, onFilterChange }) => {
  const [selectedSkillLevel, setSelectedSkillLevel] = useState(1);
  const [filteredCaregivers, setFilteredCaregivers] = useState([]);

  useEffect(() => {
    const filtered = initialCaregivers.filter(
      (caregiver) => caregiver.skill_level >= selectedSkillLevel
    );
    setFilteredCaregivers(filtered);
    onFilterChange(filtered);
  }, [selectedSkillLevel, initialCaregivers, onFilterChange]);

  console.log("Filtered caregivers:", filteredCaregivers); //Testing

  return (
    <div className="caregiver-filter">
      <label>Skill Level:</label>
      <select
        value={selectedSkillLevel}
        onChange={(e) => setSelectedSkillLevel(Number(e.target.value))}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
    </div>
  );
};

export default ShiftFilter;
