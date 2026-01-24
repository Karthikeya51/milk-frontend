import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import MilkEntryForm from "./components/MilkEntryForm";

import Reports from "./pages/Reports";
import Charts from "./pages/Charts";

import Footer from "./components/Footer";


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
      <Footer />
    </BrowserRouter>
  );
}

export default App;
