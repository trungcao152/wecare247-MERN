import React from "react";
import { Link } from "react-router-dom"; // import Link from react-router-dom

const WelcomePage = () => {
  return (
    <div className="home">
      <h1>Welcome to wecare247 database</h1>
      <p>Please choose the database you want to see from the links below:</p>
      <ul>
        <li>
          <Link to="/caregivers">Caregivers Database</Link>
        </li>
        <li>
          <Link to="/patients">Patients Database</Link>
        </li>
        <li>
          <Link to="/customers">Customers Database</Link>
        </li>
        <li>
          <Link to="/products">Products Database</Link>
        </li>
        <li>
          <Link to="/shifts">Shifts Database</Link>
        </li>
      </ul>
    </div>
  );
};

export default WelcomePage;
