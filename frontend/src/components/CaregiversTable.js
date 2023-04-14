import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import EditCaregiverForm from "./EditCaregiverForm";
import { useCaregiversContext } from "./hooks/useCaregiversContext";

const CaregiverRow = ({
  caregiver,
  handleDelete,
  properties,
  formatCellContent,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <tr key={caregiver._id}>
      {isEditing ? (
        <td colSpan={properties.length + 1}>
          <EditCaregiverForm
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
            <button onClick={() => handleDelete(caregiver._id)}>Delete</button>
          </td>
        </>
      )}
    </tr>
  );
};

const CaregiversTable = ({ handleDelete, tableTitle }) => {
  const { caregivers } = useCaregiversContext();
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
    "_id",
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
    <table>
      <TableHead columns={columns} tableTitle={tableTitle} />
      <TableBody>
        {caregivers &&
          caregivers.map((caregiver) => (
            <CaregiverRow
              key={caregiver._id}
              caregiver={caregiver}
              handleDelete={handleDelete}
              properties={properties}
              formatCellContent={formatCellContent}
            />
          ))}
      </TableBody>
    </table>
  );
};

export default CaregiversTable;
