import { useState } from "react";
import api from "../services/api";
import MonthSelector from "../components/MonthSelector";
import MilkEntryTable from "../components/MilkEntryTable";
import CowHealthTable from "../components/CowHealthTable"; 

export default function Reports({ onEdit }) {
  const [activeTab, setActiveTab] = useState("milk");

  // ---- Milk Monthly States ----
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cowHealthEntries, setCowHealthEntries] = useState([]);
  const [loadingCow, setLoadingCow] = useState(false);


  // ---- Load Monthly Milk Data ----
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


  // ---- Load Monthly Cow Data ----
  const loadCowHealthData = async () => {
    if (!year || !month) return;
  
    try {
      setLoadingCow(true);
  
      const res = await api.get("/cow-health/monthly", {
        params: { year, month }
      });
  
      // backend returns { year, month, count, data }
      setCowHealthEntries(res.data.data || []);
  
    } catch (err) {
      console.error(err);
      setCowHealthEntries([]);
      alert("Failed to load cow health reports");
    } finally {
      setLoadingCow(false);
    }
  };
  

  return (
    <div className="container mt-4">
      <h4 className="mb-4">📊 Reports</h4>

      {/* ================= TABS ================= */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "milk" ? "active" : ""}`}
            onClick={() => setActiveTab("milk")}
          >
            🥛 Milk Reports
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "cow" ? "active" : ""}`}
            onClick={() => setActiveTab("cow")}
          >
            🐄 Cow Health Reports
          </button>
        </li>
      </ul>

      {/* ================= MILK REPORTS TAB ================= */}
      {activeTab === "milk" && (
        <>
          <h5 className="mb-3">📅 Monthly Milk Reports</h5>

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
              <MilkEntryTable
                entries={entries}
                onEdit={onEdit}
                onRefresh={loadMonthlyData}
              />

              {/* Download Excel */}
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

          {/* Empty State */}
          {!loading && entries.length === 0 && year && month && (
            <div className="alert alert-warning text-center mt-4">
              No records found for {month}/{year}
            </div>
          )}
        </>
      )}

      {/* ================= COW HEALTH TAB ================= */}
      {activeTab === "cow" && (
          <>
            <h5 className="mb-3">🐄 Cow Health Reports</h5>

            <MonthSelector
              year={year}
              setYear={setYear}
              month={month}
              setMonth={setMonth}
              onLoad={loadCowHealthData}
            />

            {loadingCow && (
              <div className="text-center text-muted my-3">
                ⏳ Loading cow health data...
              </div>
            )}

            {!loadingCow && cowHealthEntries.length > 0 && (
              <CowHealthTable
              entries={cowHealthEntries}
              onEdit={onEdit}
              onRefresh={loadCowHealthData}
            />
            
            )}

            {!loadingCow && cowHealthEntries.length === 0 && year && month && (
              <div className="alert alert-warning text-center mt-3">
                No cow health records for this month
              </div>
            )}
          </>
        )}  

    </div>
  );
}
