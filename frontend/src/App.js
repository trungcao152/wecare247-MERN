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
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/caregivers"
              element={
                <CaregiversContextProvider>
                  <CaregiversPage />
                </CaregiversContextProvider>
              }
            />
            <Route
              path="/patients"
              element={
                <PatientsContextProvider>
                  <PatientsPage />
                </PatientsContextProvider>
              }
            />
            <Route
              path="/customers"
              element={
                <CustomersContextProvider>
                  <CustomersPage />
                </CustomersContextProvider>
              }
            />
            <Route
              path="/products"
              element={
                <ProductsContextProvider>
                  <ProductsPage />
                </ProductsContextProvider>
              }
            />
            <Route
              path="/shifts"
              element={
                <CustomersContextProvider>
                  <CaregiversContextProvider>
                    <PatientsContextProvider>
                      <ProductsContextProvider>
                        <ShiftsContextProvider>
                          <ShiftsPage />
                        </ShiftsContextProvider>
                      </ProductsContextProvider>
                    </PatientsContextProvider>
                  </CaregiversContextProvider>
                </CustomersContextProvider>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
