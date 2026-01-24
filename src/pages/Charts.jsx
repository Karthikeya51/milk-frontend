import { useState } from "react";
import api from "../services/api";
import DailyChart from "../components/DailyChart";
import MonthlyChart from "../components/MonthlyChart";
import ChartConfigurator from "../components/ChartConfigurator";
import DynamicChart from "../components/DynamicChart";

export default function Charts() {
  const [filterDate, setFilterDate] = useState("");
  const [dailyTotal, setDailyTotal] = useState(null);
  const [dailyChart, setDailyChart] = useState([]);

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [monthlyChart, setMonthlyChart] = useState([]);

  const [xAxis, setXAxis] = useState("");
  const [yAxes, setYAxes] = useState([]);
  const [colors, setColors] = useState({
    qty: "#0d6efd",
    amount: "#dc3545",
    fat: "#198754",
    snf: "#6f42c1",
    clr: "#fd7e14",
    rate_per_litre: "#20c997"
  });

  // ---------------- DAILY ----------------
  const loadDailyData = async () => {
    if (!filterDate) return;

    const totalRes = await api.get(
      `/reports/daily-total/${filterDate}`
    );

    const chartRes = await api.get(
      `/charts/daily/${filterDate}`
    );

    setDailyTotal(totalRes.data);
    setDailyChart(chartRes.data);
  };

  // ---------------- MONTHLY ----------------
  const loadMonthlyData = async () => {
    if (!year || !month) return;

    const res = await api.get(
      `/charts/monthly/${year}/${month}`
    );
    setMonthlyChart(res.data);
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Charts & Analytics</h4>

      {/* ---------------- DAILY FILTER ---------------- */}
      <div className="row g-2 mb-3">
        <div className="col-12 col-md-4">
          <input
            type="date"
            className="form-control"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-3">
          <button className="btn btn-secondary w-100" onClick={loadDailyData}>
            Load Daily Data
          </button>
        </div>
      </div>

      {/* ---------------- DAILY TOTAL ---------------- */}
      {dailyTotal && (
        <div className="alert alert-info">
          <strong>Date:</strong> {dailyTotal.date} <br />
          <strong>Total Quantity:</strong> {dailyTotal.total_qty} L <br />
          <strong>Total Amount:</strong> ₹{dailyTotal.total_amount}
        </div>
      )}

      {/* ---------------- DAILY CHART ---------------- */}
      {dailyChart.length > 0 && (
        <>
          <h5 className="mt-4">Daily Analysis (Shift-wise)</h5>
          <DailyChart data={dailyChart} />
        </>
      )}

      {/* ---------------- MONTHLY FILTER ---------------- */}
      <div className="row g-2 mt-4">
        <div className="col-6 col-md-3">
          <input
            className="form-control"
            placeholder="Year (e.g. 2026)"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div className="col-6 col-md-3">
          <input
            className="form-control"
            placeholder="Month (1-12)"
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-3">
          <button
            className="btn btn-primary w-100"
            onClick={loadMonthlyData}
            disabled={!year || !month}
          >
            Load Monthly Chart
          </button>
        </div>
      </div>

      {/* ---------------- MONTHLY CHART ---------------- */}
      {monthlyChart.length > 0 && (
        <>
          <h5 className="mt-4">Monthly Trend</h5>
          <MonthlyChart data={monthlyChart} />
        </>
      )}

      {/* ---------------- DYNAMIC CHART CONFIG ---------------- */}
      <h5 className="mt-5">Custom Chart Builder</h5>

      <ChartConfigurator
        xAxis={xAxis}
        setXAxis={setXAxis}
        yAxes={yAxes}
        setYAxes={setYAxes}
        colors={colors}
        setColors={setColors}
      />

      {(dailyChart.length > 0 || monthlyChart.length > 0) && (
        <DynamicChart
          data={dailyChart.length ? dailyChart : monthlyChart}
          xAxis={xAxis}
          yAxes={yAxes}
          colors={colors}
        />
      )}

      {/* ---------------- EXPORT ---------------- */}
      <a
        href={`${import.meta.env.VITE_API_BASE_URL}/reports/export-excel`}
        className="btn btn-success mt-4"
      >
        Export to Excel
      </a>
    </div>
  );
}
