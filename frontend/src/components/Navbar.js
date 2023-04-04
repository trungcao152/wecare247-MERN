import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div clasName="container">
        <Link to="/">
          <h1>Caregiver Database</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
