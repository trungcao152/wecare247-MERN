import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { CaregiversContextProvider } from "./context/CaregiversContext";
import { PatientsContextProvider } from "./context/PatientsContext";
import { CustomersContextProvider } from "./context/CustomersContext";
import { ProductsContextProvider } from "./context/ProductsContext";
import { ShiftsContextProvider } from "./context/ShiftsContext";

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
          <CaregiversContextProvider>
            <PatientsContextProvider>
              <CustomersContextProvider>
                <ProductsContextProvider>
                  <ShiftsContextProvider>
                    <Routes>
                      <Route path="/" element={<WelcomePage />} />
                      <Route path="/caregivers" element={<CaregiversPage />} />
                      <Route path="/patients" element={<PatientsPage />} />
                      <Route path="/customers" element={<CustomersPage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/shifts" element={<ShiftsPage />} />
                    </Routes>
                  </ShiftsContextProvider>
                </ProductsContextProvider>
              </CustomersContextProvider>
            </PatientsContextProvider>
          </CaregiversContextProvider>
        </div>
      </Router>
    </div>
  );
}

export default App;
