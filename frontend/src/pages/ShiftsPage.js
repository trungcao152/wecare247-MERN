import { useEffect } from "react";
import { useShiftsContext } from "../components/hooks/useShiftsContext";
import SearchContainer from "../components/SearchContainer";

// components
import ShiftDetails from "../components/Shift/ShiftDetails";

const Home = () => {
  const { dispatch } = useShiftsContext();

  useEffect(() => {
    const fetchShifts = async () => {
      const response = await fetch(
        "https://wecare247-backend.onrender.com/api/shifts"
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_SHIFTS", payload: json });
      }
    };
    fetchShifts();
  }, [dispatch]);

  return (
    <div className="home">
      <header>
        <SearchContainer />
      </header>
      <div className="shifts">
        <ShiftDetails />
      </div>
    </div>
  );
};

export default Home;
