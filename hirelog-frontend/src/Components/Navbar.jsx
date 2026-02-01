import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-brand">HireLog</div>

          <div className="nav-links">
            <NavLink to="/jobs" className="nav-link">
              Jobs
            </NavLink>

            <NavLink to="/jobs/add" className="nav-link">
              Add Job
            </NavLink>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
