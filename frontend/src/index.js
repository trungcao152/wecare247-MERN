import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CaregiversContextProvider } from "./context/CaregiversContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CaregiversContextProvider>
      <App />
    </CaregiversContextProvider>
  </React.StrictMode>
);
