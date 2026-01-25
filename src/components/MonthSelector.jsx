// src/components/MonthSelector.jsx
import { useEffect } from "react";

export default function MonthSelector({
  year,
  setYear,
  month,
  setMonth,
  onLoad
}) {
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");

  // Auto-load current month on first render
  useEffect(() => {
    if (!year && !month) {
      setYear(String(currentYear));
      setMonth(currentMonth);
      onLoad(String(currentYear), currentMonth);
    }
  }, []);

  return (
    <div className="row g-2 mb-3">
      {/* YEAR */}
      <div className="col-6">
        <select
          className="form-select"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Year</option>
          {[...Array(5)].map((_, i) => {
            const y = currentYear - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      {/* MONTH */}
      <div className="col-6">
        <select
          className="form-select"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Month</option>
          {[
            ["01", "January"],
            ["02", "February"],
            ["03", "March"],
            ["04", "April"],
            ["05", "May"],
            ["06", "June"],
            ["07", "July"],
            ["08", "August"],
            ["09", "September"],
            ["10", "October"],
            ["11", "November"],
            ["12", "December"]
          ].map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* LOAD BUTTON */}
      <div className="col-12">
        <button
          className="btn btn-primary w-100"
          disabled={!year || !month}
          onClick={() => onLoad(year, month)}
        >
          Load Month
        </button>
      </div>
    </div>
  );
}
