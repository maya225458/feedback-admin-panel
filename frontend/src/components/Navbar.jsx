import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Feedback Admin</h2>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/add-feedback">Add Feedback</Link>
      </div>
    </nav>
  );
}

export default Navbar;