export default function Navbar({ active, setActive }) {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">🥛 Milk Manager</span>

      <div className="d-flex gap-2">
        <button
          className={`btn btn-sm ${
            active === "form" ? "btn-light" : "btn-outline-light"
          }`}
          onClick={() => setActive("form")}
        >
          Add
        </button>

        <button
          className={`btn btn-sm ${
            active === "table" ? "btn-light" : "btn-outline-light"
          }`}
          onClick={() => setActive("table")}
        >
          Reports
        </button>
      </div>
    </nav>
  );
}
