import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages and components
import WelcomePage from "./pages/WelcomePage";
import CaregiversPage from "./pages/CaregiversPage";
import PatientsPage from "./pages/PatientsPage";
import CustomersPage from "./pages/CustomersPage";
import ProductsPage from "./pages/ProductsPage";
import ShiftsPage from "./pages/ShiftsPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
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
