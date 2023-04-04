import { useEffect } from "react";
import { useCaregiversContext } from "../components/hooks/useCaregiversContext";

// components
import CaregiverDetails from "../components/CaregiverDetails";
import CaregiverForm from "../components/CaregiverForm";

const Home = () => {
  const { caregivers, dispatch } = useCaregiversContext();

  useEffect(() => {
    const fetchCaregivers = async () => {
      const response = await fetch("/api/caregivers");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CAREGIVERS", payload: json });
      }
    };
    fetchCaregivers();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="caregivers">
        {caregivers &&
          caregivers.map((caregiver) => (
            <CaregiverDetails key={caregiver._id} caregiver={caregiver} />
          ))}
      </div>
      <CaregiverForm />
    </div>
  );
};

export default Home;
