import React, { useState } from "react";
import TableHead from "../TableHead";
import TableBody from "../TableBody";
import ShiftEditForm from "./ShiftEditForm";
import { useShiftsContext } from "../hooks/useShiftsContext";
import useSortableData from "../hooks/useSortableData";

const ShiftRow = ({
  shift,
  handleDelete,
  properties,
  formatCellContent,
  caregivers,
  customers,
  patients,
  products,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <tr key={shift._id}>
      {isEditing ? (
        <td colSpan={properties.length + 1}>
          <ShiftEditForm
            shift={shift}
            setIsEditing={setIsEditing}
            caregivers={caregivers}
            customers={customers}
            patients={patients}
            products={products}
          />
        </td>
      ) : (
        <>
          {properties.map((property) => (
            <td key={property}>{formatCellContent(shift, property)}</td>
          ))}
          <td>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => handleDelete(shift._id)}>Delete</button>
          </td>
        </>
      )}
    </tr>
  );
};

const ShiftsTable = ({ handleDelete, tableTitle }) => {
  const { shifts = [] } = useShiftsContext();
  const { sortedItems, requestSort, sortingKeys } = useSortableData(shifts);

  const columns = [
    "Caregiver ID",
    "Customer ID",
    "Patient ID",
    "Product ID",
    "Start Time",
    "End Time",
  ];

  const properties = [
    "caregiver_id",
    "customer_id",
    "patient_id",
    "product_id",
    "start_time",
    "end_time",
  ];

  const formatCellContent = (shift, property) => {
    if (property === "start_time" || property === "end_time") {
      return new Intl.DateTimeFormat("en-GB").format(new Date(shift[property]));
    }
    return shift[property];
  };

  return (
    <div className="shifts-table">
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
            sortedItems.map((shift) => (
              <ShiftRow
                key={shift._id}
                shift={shift}
                handleDelete={handleDelete}
                caregivers={caregivers}
                customers={customers}
                patients={patients}
                products={products}
                properties={properties}
                formatCellContent={formatCellContent}
              />
            ))}
        </TableBody>
      </table>
    </div>
  );
};

export default ShiftsTable;
