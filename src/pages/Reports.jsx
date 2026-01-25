import { useState } from "react";
import api from "../services/api";
import MonthSelector from "../components/MonthSelector";
import MilkEntryTable from "../components/MilkEntryTable";

export default function Reports({ onEdit }) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMonthlyData = async () => {
    if (!year || !month) return;

    try {
      setLoading(true);
      const res = await api.get("/milk-entry/monthly", {
        params: { year, month }
      });
      setEntries(res.data); // ✅ array only
    } catch (err) {
      console.error(err);
      setEntries([]);
      alert("Failed to load monthly report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">📅 Monthly Reports</h4>

      {/* Month Selector */}
      <MonthSelector
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
        onLoad={loadMonthlyData}
      />

      {/* Loading */}
      {loading && (
        <div className="text-center text-muted my-3">
          ⏳ Loading monthly data...
        </div>
      )}

      {/* Table */}
      {!loading && entries.length > 0 && (
        <>
          <MilkEntryTable entries={entries} onEdit={onEdit} />

          {/* ✅ DOWNLOAD BUTTON AT BOTTOM */}
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-success btn-lg px-4"
              onClick={() =>
                window.open(
                  `${import.meta.env.VITE_API_BASE_URL}/reports/export-excel-monthly?year=${year}&month=${month}`,
                  "_blank"
                )
              }
            >
              📥 Download Monthly Excel
            </button>
          </div>
        </>
      )}

      {/* Empty state */}
      {!loading && entries.length === 0 && year && month && (
        <div className="alert alert-warning text-center mt-4">
          Select the month and year to load the data...
        </div>
      )}
    </div>
  );
}
