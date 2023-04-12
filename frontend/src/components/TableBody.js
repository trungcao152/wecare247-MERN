import React from "react";
import { useCaregiversContext } from "./hooks/useCaregiversContext";
import EditCaregiverForm from "./EditCaregiverForm";

const TableRow = ({ caregiver, handleDelete, properties, formattedDate }) => {
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
            <td key={property}>
              {property === "national_id_issue_date"
                ? formattedDate(caregiver[property])
                : caregiver[property]}
            </td>
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

const TableBody = ({ handleDelete, properties }) => {
  const { caregivers } = useCaregiversContext();

  const formattedDate = (date) => {
    return new Intl.DateTimeFormat("en-GB").format(new Date(date));
  };

  return (
    <tbody>
      {caregivers.map((caregiver) => (
        <TableRow
          key={caregiver._id}
          caregiver={caregiver}
          handleDelete={handleDelete}
          properties={properties}
          formattedDate={formattedDate}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
