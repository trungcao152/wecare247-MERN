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
    <tr key={shift.shift_id}>
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
            <button onClick={() => handleDelete(shift.shift_id)}>Delete</button>
          </td>
        </>
      )}
    </tr>
  );
};

const ShiftTable = ({
  handleDelete,
  tableTitle,
  caregivers,
  customers,
  patients,
  products,
}) => {
  const { shifts = [] } = useShiftsContext();
  const { sortedItems, requestSort, sortingKeys } = useSortableData(shifts);

  const columns = [
    "Shift ID",
    "Caregiver ID",
    "Customer ID",
    "Patient ID",
    "Product ID",
    "Start Time",
    "End Time",
  ];

  const properties = [
    "shift_id",
    "caregiver_id",
    "customer_id",
    "patient_id",
    "product_id",
    "start_time",
    "end_time",
  ];

  const formatCellContent = (shift, property) => {
    switch (property) {
      case "start_time":
      case "end_time":
        return new Intl.DateTimeFormat("en-GB").format(
          new Date(shift[property])
        );
      case "caregiver_id":
        return shift.caregiver?.caregiver_id || "";
      case "customer_id":
        return shift.customer?.customer_id || "";
      case "patient_id":
        return shift.patient?.patient_id || "";
      case "product_id":
        return shift.product?.product_id || "";
      default:
        return shift[property];
    }
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
                key={shift.shift_id}
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

export default ShiftTable;
