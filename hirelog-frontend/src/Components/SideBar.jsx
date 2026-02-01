import { NavLink,useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";

const SideBar = () => {

    const navigate=useNavigate();

    const handleLogout=()=>{
        removeToken("/login");
        navigate("/login")
    }
  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary sidebar">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <svg
            className="bi pe-none me-2"
            width="40"
            height="32"
            aria-hidden="true"
          >
            <use xlinkHref="#bootstrap" />
          </svg>
          <span className="fs-4">HireLog</span>
        </a>

        <hr />

        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              ></svg>
              Home
            </a>
          </li>

          <li className="nav-item">
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `nav-link link-body-emphasis ${isActive ? "active" : ""}`
              }
            >
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#speedometer2" />
              </svg>
              My Jobs
            </NavLink>

          </li>

          <li className="nav-item">
            <NavLink to="/add-job" className="nav-link link-body-emphasis">
              <svg
                className="bi pe-none me-2"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#table" />
              </svg>
              AddJobs
            </NavLink>
          </li>
        </ul>
        <hr />
      </div>
    </>
  );
};

export default SideBar;
