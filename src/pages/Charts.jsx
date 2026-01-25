// import { useState } from "react";
// import api from "../services/api";
// import DailyChart from "../components/DailyChart";
// import MonthlyChart from "../components/MonthlyChart";
// import ChartConfigurator from "../components/ChartConfigurator";
// import DynamicChart from "../components/DynamicChart";

// export default function Charts() {
//   const [filterDate, setFilterDate] = useState("");
//   const [dailyTotal, setDailyTotal] = useState(null);
//   const [dailyChart, setDailyChart] = useState([]);

//   // const [year, setYear] = useState("");
//   // const [month, setMonth] = useState("");
//   const [monthlyChart, setMonthlyChart] = useState([]);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");


//   const [xAxis, setXAxis] = useState("");
//   const [yAxes, setYAxes] = useState([]);
//   const [colors, setColors] = useState({
//     qty: "#0d6efd",
//     amount: "#dc3545",
//     fat: "#198754",
//     snf: "#6f42c1",
//     clr: "#fd7e14",
//     rate_per_litre: "#20c997"
//   });

//   // ---------------- DAILY ----------------
//   const loadDailyData = async () => {
//     if (!filterDate) return;

//     const totalRes = await api.get(
//       `/reports/daily-total/${filterDate}`
//     );

//     const chartRes = await api.get(
//       `/charts/daily/${filterDate}`
//     );

//     setDailyTotal(totalRes.data);
//     setDailyChart(chartRes.data);
//   };

//   // ---------------- MONTHLY ----------------
//   // const loadMonthlyData = async () => {
//   //   if (!year || !month) return;

//   //   const res = await api.get(
//   //     `/charts/monthly/${year}/${month}`
//   //   );
//   //   setMonthlyChart(res.data);
//   // };
//   const loadMonthlyData = async () => {
//     if (!fromDate || !toDate) return;
  
//     const res = await api.get("/charts/monthly-range", {
//       params: {
//         from_date: fromDate,
//         to_date: toDate
//       }
//     });
  
//     setMonthlyChart(res.data);
//   };
  

//   return (
//     <div className="container mt-4">
//       <h4 className="mb-3">📊 Charts & Analytics</h4>
  
//       {/* ================= DAILY FILTER ================= */}
//       <div className="row g-2 mb-3">
//         <div className="col-12 col-md-4">
//           <input
//             type="date"
//             className="form-control"
//             value={filterDate}
//             onChange={(e) => setFilterDate(e.target.value)}
//           />
//         </div>
  
//         <div className="col-12 col-md-3">
//           <button
//             className="btn btn-secondary w-100"
//             onClick={loadDailyData}
//             disabled={!filterDate}
//           >
//             Load Daily Data
//           </button>
//         </div>
//       </div>
  
//       {/* ================= DAILY TOTAL ================= */}
//       {dailyTotal && (
//         <div className="alert alert-info">
//           <strong>Date:</strong> {dailyTotal.date} <br />
//           <strong>Total Quantity:</strong>{" "}
//           {Number(dailyTotal.total_qty).toFixed(2)} L <br />
//           <strong>Total Amount:</strong> ₹
//           {Number(dailyTotal.total_amount).toFixed(2)}
//         </div>
//       )}
  
//       {/* ================= DAILY CHART ================= */}
//       {dailyChart.length > 0 && (
//         <>
//           <h5 className="mt-4">Daily Analysis (Shift-wise)</h5>
//           <DailyChart data={dailyChart} />
//         </>
//       )}
  
//       <hr className="my-4" />
  
//       {/* ================= RANGE FILTER (MONTHLY / RANGE) ================= */}
//       <h5 className="mb-2">Range Analysis</h5>
  
//       <div className="row g-2">
//         <div className="col-12 col-md-4">
//           <input
//             type="date"
//             className="form-control"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//           />
//         </div>
  
//         <div className="col-12 col-md-4">
//           <input
//             type="date"
//             className="form-control"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//           />
//         </div>
  
//         <div className="col-12 col-md-4">
//           <button
//             className="btn btn-primary w-100"
//             onClick={loadMonthlyData}
//             disabled={!fromDate || !toDate}
//           >
//             Generate Range Chart
//           </button>
//         </div>
//       </div>
  
//       {/* ================= MONTHLY / RANGE CHART ================= */}
//       {monthlyChart.length > 0 && (
//         <>
//           <h5 className="mt-4">Range Trend</h5>
//           <MonthlyChart data={monthlyChart} />
//         </>
//       )}
  
//       <hr className="my-4" />
  
//       {/* ================= DYNAMIC CHART BUILDER ================= */}
//       <h5 className="mt-3">Custom Chart Builder</h5>
  
//       <ChartConfigurator
//         xAxis={xAxis}
//         setXAxis={setXAxis}
//         yAxes={yAxes}
//         setYAxes={setYAxes}
//         colors={colors}
//         setColors={setColors}
//       />
  
//       {(dailyChart.length > 0 || monthlyChart.length > 0) && (
//         <DynamicChart
//           data={dailyChart.length ? dailyChart : monthlyChart}
//           xAxis={xAxis}
//           yAxes={yAxes}
//           colors={colors}
//         />
//       )}
  
      
//     </div>
//   );
  
// }


import { useState } from "react";
import api from "../services/api";
import DailyChart from "../components/DailyChart";
import ChartConfigurator from "../components/ChartConfigurator";
import DynamicChart from "../components/DynamicChart";

export default function Charts() {
  // ---------------- STATE ----------------
  const [filterDate, setFilterDate] = useState("");
  const [dailyTotal, setDailyTotal] = useState(null);
  const [dailyChart, setDailyChart] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rangeChart, setRangeChart] = useState([]);

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

    const totalRes = await api.get(`/reports/daily-total/${filterDate}`);
    const chartRes = await api.get(`/charts/daily/${filterDate}`);

    setDailyTotal(totalRes.data);
    setDailyChart(chartRes.data);
  };

  // ---------------- RANGE ----------------
  const loadRangeData = async () => {
    if (!fromDate || !toDate) return;

    const res = await api.get("/charts/monthly-range", {
      params: {
        from_date: fromDate,
        to_date: toDate
      }
    });

    setRangeChart(res.data);
  };

  // ---------------- RANGE TOTAL ----------------
  const rangeTotal = rangeChart.reduce(
    (acc, d) => {
      acc.qty += d.qty || 0;
      acc.amount += d.amount || 0;
      return acc;
    },
    { qty: 0, amount: 0 }
  );

  return (
    <div className="container mt-4">
      <h4 className="mb-3">📊 Charts & Analytics</h4>

      {/* ================= DAILY FILTER ================= */}
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
          <button
            className="btn btn-secondary w-100"
            onClick={loadDailyData}
            disabled={!filterDate}
          >
            Load Daily Data
          </button>
        </div>
      </div>

      {/* ================= DAILY TOTAL ================= */}
      {dailyTotal && (
        <div className="alert alert-info">
          <strong>Date:</strong> {dailyTotal.date} <br />
          <strong>Total Quantity:</strong>{" "}
          {Number(dailyTotal.total_qty).toFixed(2)} L <br />
          <strong>Total Amount:</strong> ₹
          {Number(dailyTotal.total_amount).toFixed(2)}
        </div>
      )}

      {/* ================= DAILY CHART ================= */}
      {dailyChart.length > 0 && (
        <>
          <h5 className="mt-4">Daily Analysis (Shift-wise)</h5>
          <DailyChart data={dailyChart} />
        </>
      )}

      <hr className="my-4" />

      {/* ================= RANGE FILTER ================= */}
      <h5 className="mb-2">📅 Range Analysis</h5>

      <div className="row g-2">
        <div className="col-12 col-md-4">
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-4">
          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-4">
          <button
            className="btn btn-primary w-100"
            onClick={loadRangeData}
            disabled={!fromDate || !toDate}
          >
            Generate Range Report
          </button>
        </div>
      </div>

      {/* ================= RANGE SUMMARY ================= */}
      {rangeChart.length > 0 && (
        <>
          <div className="alert alert-success mt-3">
            📊 Showing data from <strong>{fromDate}</strong> to{" "}
            <strong>{toDate}</strong> ({rangeChart.length} days)
          </div>

          <div className="alert alert-info">
            <strong>Total Quantity:</strong>{" "}
            {rangeTotal.qty.toFixed(2)} L <br />
            <strong>Total Amount:</strong> ₹
            {rangeTotal.amount.toFixed(2)}
          </div>
        </>
      )}

      {/* ================= RANGE BAR CHART ================= */}
      {rangeChart.length > 0 && (
        <>
          <h5 className="mt-4">Range Trend (Day-wise)</h5>
          <DynamicChart
            data={rangeChart}
            xAxis="date"
            yAxes={["qty", "amount"]}
            colors={colors}
          />
        </>
      )}

      <hr className="my-4" />

      {/* ================= CUSTOM CHART BUILDER ================= */}
      <h5 className="mt-3">🧩 Custom Chart Builder</h5>

      <ChartConfigurator
        xAxis={xAxis}
        setXAxis={setXAxis}
        yAxes={yAxes}
        setYAxes={setYAxes}
        colors={colors}
        setColors={setColors}
      />

      {(dailyChart.length > 0 || rangeChart.length > 0) && (
        <DynamicChart
          data={dailyChart.length ? dailyChart : rangeChart}
          xAxis={xAxis}
          yAxes={yAxes}
          colors={colors}
        />
      )}

      {/* ================= EXPORT ================= */}
      {fromDate && toDate && (
        <button
        className="btn btn-success mt-4"
        disabled={!fromDate || !toDate}
        onClick={() =>
          window.open(
            `${import.meta.env.VITE_API_BASE_URL}/reports/export-excel-range?from_date=${fromDate}&to_date=${toDate}`,
            "_blank"
          )
        }
      >
        📥 Export Range Excel
      </button>
      
      )}
    </div>
  );
}
