import React, { useState } from "react";
import TableHead from "../TableHead";
import TableBody from "../TableBody";
import CustomerEditForm from "./CustomerEditForm";
import { useCustomersContext } from "../hooks/useCustomersContext.js";
import useSortableData from "../hooks/useSortableData";

const CustomerRow = ({
  customer,
  handleDelete,
  properties,
  formatCellContent,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <tr key={customer._id}>
      {isEditing ? (
        <td colSpan={properties.length + 1}>
          <CustomerEditForm customer={customer} setIsEditing={setIsEditing} />
        </td>
      ) : (
        <>
          {properties.map((property) => (
            <td key={property}>{formatCellContent(customer, property)}</td>
          ))}
          <td>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => handleDelete(customer._id)}>Delete</button>
          </td>
        </>
      )}
    </tr>
  );
};

const CustomerTable = ({ handleDelete, tableTitle }) => {
  const { customers = [] } = useCustomersContext();
  const { sortedItems, requestSort, sortingKeys } = useSortableData(customers);

  const columns = [
    "ID",
    "Name",
    "Phone Number",
    "Email",
    "DOB",
    "Current Address",
    "Customer Creator",
    "Customer Type",
  ];

  const properties = [
    "_id",
    "customer_name",
    "customer_phone",
    "customer_email",
    "customer_birthday",
    "customer_address",
    "customer_creator",
    "customer_type",
  ];

  const formatCellContent = (customer, property) => {
    if (property === "customer_birthday") {
      return new Intl.DateTimeFormat("en-GB").format(
        new Date(customer[property])
      );
    }
    return customer[property];
  };

  return (
    <div className="customers-table">
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
            sortedItems.map((customer) => (
              <CustomerRow
                key={customer._id}
                customer={customer}
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

export default CustomerTable;
