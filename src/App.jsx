import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import MilkEntryForm from "./components/MilkEntryForm";
import Reports from "./pages/Reports";
import Charts from "./pages/Charts";
import CowHealth from "./components/CowHealth";
import Footer from "./components/Footer";

function App() {
  const [editData, setEditData] = useState(null);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Milk Entry */}
        <Route
          path="/"
          element={
            <div className="container">
              <MilkEntryForm
                editData={editData}
                setEditData={setEditData}
              />
            </div>
          }
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={<Reports onEdit={setEditData} />}
        />

        {/* Charts */}
        <Route path="/charts" element={<Charts />} />

        {/* ✅ Cow Health (FIXED) */}
        <Route
          path="/cow-health"
          element={
            <CowHealth
              editData={editData}
              setEditData={setEditData}
            />
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
