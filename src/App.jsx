import { useState } from "react";
import MilkEntryForm from "./components/MilkEntryForm";
import MilkEntryTable from "./components/MilkEntryTable";
import Navbar from "./components/Navbar";

function App() {
  const [editData, setEditData] = useState(null);
  const [active, setActive] = useState("form"); // form | table

  return (
    <>
      <Navbar active={active} setActive={setActive} />

      <div className="container mt-3">
        {active === "form" && (
          <MilkEntryForm editData={editData} setEditData={setEditData} />
        )}

        {active === "table" && (
          <MilkEntryTable
            onEdit={(data) => {
              setEditData(data);
              setActive("form"); // auto-switch to form on edit
            }}
          />
        )}
      </div>
    </>
  );
}

export default App;
