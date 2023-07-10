import React, { useState } from "react";
import TableHead from "../TableHead";
import TableBody from "../TableBody";
import PatientEditForm from "./PatientEditForm";
import { usePatientsContext } from "../hooks/usePatientsContext";
import useSortableData from "../hooks/useSortableData";

const PatientRow = ({
  patient,
  handleDelete,
  properties,
  formatCellContent,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <tr key={patient.patient_id}>
      {isEditing ? (
        <td colSpan={properties.length + 1}>
          <PatientEditForm patient={patient} setIsEditing={setIsEditing} />
        </td>
      ) : (
        <>
          {properties.map((property) => (
            <td key={property}>{formatCellContent(patient, property)}</td>
          ))}
          <td>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => handleDelete(patient.patient_id)}>
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

const PatientTable = ({ handleDelete, tableTitle }) => {
  const { patients = [] } = usePatientsContext();
  const { sortedItems, requestSort, sortingKeys } = useSortableData(patients);

  const columns = [
    "ID",
    "Name",
    "Patient Type",
    "Weight (in kg)",
    "Physical Condition",
    "Memory Condition",
    "Ulcer",
    "Neural Disease",
    "Endo Tube",
    "Nebuliser",
    "Patient Condition",
  ];

  const properties = [
    "patient_id",
    "patient_name",
    "patient_type",
    "weight",
    "physical_condition",
    "memory_condition",
    "ulcer",
    "neural_disease",
    "endo_tube",
    "nebuliser",
    "patient_condition",
  ];

  const formatCellContent = (patient, property) => {
    if (property === "national_id_issue_date") {
      return new Intl.DateTimeFormat("en-GB").format(
        new Date(patient[property])
      );
    }
    return patient[property];
  };

  return (
    <div className="patients-table">
      <table>
        <TableHead
          columns={columns}
          properties={properties}
          tableTitle={tableTitle}
          requestSort={requestSort}
          sortingKeys={sortingKeys}
        />
        <TableBody>
          {sortedItems &&
            sortedItems.map((patient) => (
              <PatientRow
                key={patient.patient_id}
                patient={patient}
                handleDelete={handleDelete}
                properties={properties}
                formatCellContent={formatCellContent}
              />
            ))}
        </TableBody>
      </table>
    </div>
  );
};

export default PatientTable;
