import { useEffect } from "react";
import { useCaregiversContext } from "../components/hooks/useCaregiversContext";
import SearchContainer from "../components/SearchContainer";

// components
import CaregiverDetails from "../components/CaregiverDetails";

const Home = () => {
  const { dispatch } = useCaregiversContext();

  useEffect(() => {
    const fetchCaregivers = async () => {
      const response = await fetch(
        "https://wecare247-backend.onrender.com/api/caregivers"
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CAREGIVERS", payload: json });
      }
    };
    fetchCaregivers();
  }, [dispatch]);

  return (
    <div className="home">
      <header>
        <SearchContainer />
      </header>
      <div className="caregivers">
        <CaregiverDetails />
      </div>
    </div>
  );
};

export default Home;
