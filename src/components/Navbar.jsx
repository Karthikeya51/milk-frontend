// export default function Navbar({ active, setActive }) {
//   return (
//     <nav className="navbar navbar-dark bg-dark px-3">
//       <span className="navbar-brand">🥛 Milk Manager</span>

//       <div className="d-flex gap-2">
//         <button
//           className={`btn btn-sm ${
//             active === "form" ? "btn-light" : "btn-outline-light"
//           }`}
//           onClick={() => setActive("form")}
//         >
//           Add
//         </button>

//         <button
//           className={`btn btn-sm ${
//             active === "table" ? "btn-light" : "btn-outline-light"
//           }`}
//           onClick={() => setActive("table")}
//         >
//           Reports
//         </button>
//       </div>
//     </nav>
//   );
// }

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span className="navbar-brand">Milk Manager</span>

      <div className="navbar-nav">
        <Link className="nav-link" to="/">Entry</Link>
        <Link className="nav-link" to="/reports">Reports</Link>
        <Link className="nav-link" to="/charts">Charts</Link>
      </div>
    </nav>
  );
}
