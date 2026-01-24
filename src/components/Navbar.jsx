// import { NavLink } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
//       <span className="navbar-brand fw-bold">🥛 Milk Note</span>

//       {/* Mobile toggle */}
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#milkNavbar"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="milkNavbar">
//         <div className="navbar-nav ms-auto gap-2">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `btn btn-sm ${
//                 isActive ? "btn-light" : "btn-outline-light"
//               }`
//             }
//           >
//             Entry
//           </NavLink>

//           <NavLink
//             to="/reports"
//             className={({ isActive }) =>
//               `btn btn-sm ${
//                 isActive ? "btn-light" : "btn-outline-light"
//               }`
//             }
//           >
//             Reports
//           </NavLink>

//           <NavLink
//             to="/charts"
//             className={({ isActive }) =>
//               `btn btn-sm ${
//                 isActive ? "btn-light" : "btn-outline-light"
//               }`
//             }
//           >
//             Charts
//           </NavLink>
//         </div>
//       </div>
//     </nav>
//   );
// }


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
      <span className="navbar-brand fw-bold">🥛 Milk Manager</span>

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
            Entry
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
