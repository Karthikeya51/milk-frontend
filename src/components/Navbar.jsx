
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const closeNavbar = () => {
    const navbar = document.getElementById("milkNavbar");
    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span className="navbar-brand fw-bold">🥛 Milk Note</span>

      {/* Toggle button */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#milkNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible menu */}
      <div className="collapse navbar-collapse" id="milkNavbar">
        <div className="navbar-nav ms-auto gap-2">
          <NavLink
            to="/"
            onClick={closeNavbar}
            className={({ isActive }) =>
              `btn btn-sm ${isActive ? "btn-light" : "btn-outline-light"}`
            }
          >
            Milk Entry
          </NavLink>

          <NavLink
            to="/cow-health"
            onClick={closeNavbar}
            className={({ isActive }) =>
              `btn btn-sm ${isActive ? "btn-light" : "btn-outline-light"}`
            }
          >
            🐄 Cow Health
          </NavLink>

          <NavLink
            to="/reports"
            onClick={closeNavbar}
            className={({ isActive }) =>
              `btn btn-sm ${isActive ? "btn-light" : "btn-outline-light"}`
            }
          >
            Reports
          </NavLink>

          

          <NavLink
            to="/charts"
            onClick={closeNavbar}
            className={({ isActive }) =>
              `btn btn-sm ${isActive ? "btn-light" : "btn-outline-light"}`
            }
          >
            Charts
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
