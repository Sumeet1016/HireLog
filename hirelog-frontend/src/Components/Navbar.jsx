import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${isScrolled ? "bg-white shadow-sm" : "bg-white"}`}
    >
      <div className="container">
        {/* Brand */}
        <NavLink
          to="/jobs"
          className="navbar-brand d-flex align-items-center fw-bold fs-4 text-primary"
        >
          <i className="bi bi-kanban-fill me-2"></i>
          HireLog
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <i className="bi bi-list fs-4"></i>
        </button>

        {/* Navigation Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  `nav-link px-3 d-flex align-items-center ${isActive ? "active fw-semibold" : ""}`
                }
              >
                <i className="bi bi-grid-3x3-gap me-2"></i>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/add-job"
                className={({ isActive }) =>
                  `nav-link px-3 d-flex align-items-center ${isActive ? "active fw-semibold" : ""}`
                }
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add Job
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  `nav-link px-3 d-flex align-items-center ${isActive ? "active fw-semibold" : ""}`
                }
              >
                <i className="bi bi-graph-up me-2"></i>
                Analytics
              </NavLink>
            </li>
          </ul>

          {/* User Profile & Logout */}
          <div className="d-flex align-items-center gap-3">
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary btn-sm dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-circle me-2"></i>
                Profile
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <NavLink to="/profile" className="dropdown-item">
                    <i className="bi bi-person me-2"></i>
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/settings" className="dropdown-item">
                    <i className="bi bi-gear me-2"></i>
                    Settings
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item text-danger"
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
