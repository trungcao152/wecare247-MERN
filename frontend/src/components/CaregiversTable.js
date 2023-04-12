import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const CaregiversTable = ({ handleDelete, tableTitle }) => {
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

  return (
    <table>
      <TableHead columns={columns} tableTitle={tableTitle} />
      <TableBody handleDelete={handleDelete} properties={properties} />
    </table>
  );
};

export default CaregiversTable;
