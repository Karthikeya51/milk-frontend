// import { useState } from "react";
// import MilkEntryForm from "./components/MilkEntryForm";
// import MilkEntryTable from "./components/MilkEntryTable";
// import Navbar from "./components/Navbar";

// function App() {
//   const [editData, setEditData] = useState(null);
//   const [active, setActive] = useState("form"); // form | table

//   return (
//     <>
//       <Navbar active={active} setActive={setActive} />

//       <div className="container mt-3">
//         {active === "form" && (
//           <MilkEntryForm editData={editData} setEditData={setEditData} />
//         )}

//         {active === "table" && (
//           <MilkEntryTable
//             onEdit={(data) => {
//               setEditData(data);
//               setActive("form"); // auto-switch to form on edit
//             }}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import MilkEntryForm from "./components/MilkEntryForm";

import Reports from "./pages/Reports";
import Charts from "./pages/Charts";

function App() {
  const [editData, setEditData] = useState(null);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Entry Page */}
        <Route
          path="/"
          element={
            <div className="container">
              <MilkEntryForm editData={editData} setEditData={setEditData} />
            </div>
          }
        />

        {/* Reports Page */}
        <Route
          path="/reports"
          element={<Reports onEdit={setEditData} />}
        />


        {/* Charts Page */}
        <Route path="/charts" element={<Charts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
