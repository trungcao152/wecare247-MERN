import { useShiftsContext } from "../hooks/useShiftsContext";
import { useCaregiversContext } from "../hooks/useCaregiversContext";
import { useCustomersContext } from "../hooks/useCustomersContext";
import { usePatientsContext } from "../hooks/usePatientsContext";
import { useProductsContext } from "../hooks/useProductsContext";
import ShiftTable from "./ShiftTable";
import ShiftForm from "./ShiftForm";
import "./Shifts.css"; // Import the CSS file

const ShiftDetails = () => {
  const { caregivers } = useCaregiversContext();
  const { customers } = useCustomersContext();
  const { patients } = usePatientsContext();
  const { products } = useProductsContext();

  const { dispatch } = useShiftsContext();

  const handleDelete = async (id) => {
    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/shifts/" + id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_SHIFT", payload: json });
    }
  };

  // Props for the table title
  const tableTitle = "Shift Database";

  return (
    <div className="shifts-container">
      <ShiftForm
        caregivers={caregivers}
        customers={customers}
        patients={patients}
        products={products}
      />
      <ShiftTable
        handleDelete={handleDelete}
        tableTitle={tableTitle}
        caregivers={caregivers}
        customers={customers}
        patients={patients}
        products={products}
      />
    </div>
  );
};

export default ShiftDetails;
