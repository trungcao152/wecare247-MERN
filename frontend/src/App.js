import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// pages and components
import WelcomePage from "./pages/WelcomePage";
import CaregiversPage from "./pages/CaregiversPage";
import PatientsPage from "./pages/PatientsPage";
import CustomersPage from "./pages/CustomersPage";
import ProductsPage from "./pages/ProductsPage";
import ShiftsPage from "./pages/ShiftsPage";
import Navbar from "./components/Navbar";

const ConditionalNavbar = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return showNavbar && <Navbar />;
};

function App() {
  return (
    <div className="App">
      <Router>
        <ConditionalNavbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/caregivers" element={<CaregiversPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/shifts" element={<ShiftsPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
