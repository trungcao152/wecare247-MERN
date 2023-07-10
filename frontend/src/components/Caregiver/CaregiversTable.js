import React, { useState } from "react";
import TableHead from "../TableHead";
import TableBody from "../TableBody";
import CaregiverEditForm from "./CaregiverEditForm";
import { useCaregiversContext } from "../hooks/useCaregiversContext";
import useSortableData from "../hooks/useSortableData";

const CaregiverRow = ({
  caregiver,
  handleDelete,
  properties,
  formatCellContent,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <tr key={caregiver.caregiver_id}>
      {isEditing ? (
        <td colSpan={properties.length + 1}>
          <CaregiverEditForm
            caregiver={caregiver}
            setIsEditing={setIsEditing}
          />
        </td>
      ) : (
        <>
          {properties.map((property) => (
            <td key={property}>{formatCellContent(caregiver, property)}</td>
          ))}
          <td>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => handleDelete(caregiver.caregiver_id)}>
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

const CaregiversTable = ({ handleDelete, tableTitle }) => {
  const { caregivers = [] } = useCaregiversContext();
  const { sortedItems, requestSort, sortingKeys } = useSortableData(caregivers);

  const columns = [
    "ID",
    "Name",
    "Current Address",
    "Birth Year",
    "Skill Level",
    "Preferred Working Location",
    "Working Status",
    "Phone Number",
    "Gender",
    "National ID",
    "National ID Issue Date",
    "Age",
  ];

  const properties = [
    "caregiver_id",
    "employee_name",
    "current_address",
    "birth_year",
    "skill_level",
    "preferred_working_location",
    "working_status",
    "employee_phone",
    "employee_gender",
    "national_id",
    "national_id_issue_date",
    "age",
  ];

  const formatCellContent = (caregiver, property) => {
    if (property === "national_id_issue_date") {
      return new Intl.DateTimeFormat("en-GB").format(
        new Date(caregiver[property])
      );
    }
    return caregiver[property];
  };

  return (
    <div className="caregivers-table">
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
            sortedItems.map((caregiver) => (
              <CaregiverRow
                key={caregiver.caregiver_id}
                caregiver={caregiver}
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

export default CaregiversTable;
