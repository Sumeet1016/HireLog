import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const navItems = [
    { to: "/jobs", icon: "bi-grid", label: "Dashboard" },
    { to: "/jobs", icon: "bi-briefcase", label: "My Jobs" },
    { to: "/add-job", icon: "bi-plus-circle", label: "Add Job" },
    { to: "/analytics", icon: "bi-graph-up", label: "Analytics" },
    { to: "/calendar", icon: "bi-calendar", label: "Calendar" },
    { to: "/settings", icon: "bi-gear", label: "Settings" },
  ];

  return (
    <div
      className="sidebar d-flex flex-column flex-shrink-0 p-4 bg-white border-end shadow-sm"
      style={{ width: "280px", minHeight: "100vh" }}
    >
      {/* Brand */}
      <div className="mb-5">
        <NavLink
          to="/"
          className="text-decoration-none d-flex align-items-center"
        >
          <div className="bg-primary rounded-circle p-2 me-3">
            <i className="bi bi-kanban-fill text-white fs-4"></i>
          </div>
          <div>
            <h3 className="fw-bold text-primary mb-0">HireLog</h3>
            <small className="text-muted">Job Tracker</small>
          </div>
        </NavLink>
      </div>

      {/* Navigation */}
      <ul className="nav nav-pills flex-column gap-2 mb-auto">
        {navItems.map((item) => (
          <li className="nav-item" key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center py-3 px-3 rounded-3 ${
                  isActive ? "active bg-primary text-white" : "text-dark"
                }`
              }
            >
              <i className={`bi ${item.icon} me-3 fs-5`}></i>
              <span className="fw-medium">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* User Profile & Logout */}
      <div className="mt-auto border-top pt-4">
        <div className="dropdown">
          <button
            className="btn btn-light w-100 text-start p-3 rounded-3 d-flex align-items-center"
            type="button"
            data-bs-toggle="dropdown"
          >
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
              style={{ width: "40px", height: "40px" }}
            >
              <i className="bi bi-person-fill"></i>
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold">User Profile</div>
              <small className="text-muted">View account</small>
            </div>
            <i className="bi bi-chevron-down"></i>
          </button>

          <ul className="dropdown-menu dropdown-menu-end w-100">
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
  );
};

export default SideBar;
