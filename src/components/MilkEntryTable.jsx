// // import { useEffect, useState } from "react";
// // import api from "../services/api";
// // import DailyChart from "./DailyChart";
// // import MonthlyChart from "./MonthlyChart";
// // import ChartConfigurator from "./ChartConfigurator";
// // import DynamicChart from "./DynamicChart";

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// // import DailyChart from "./DailyChart";
// // import MonthlyChart from "./MonthlyChart";
// // import ChartConfigurator from "./ChartConfigurator";
// // import DynamicChart from "./DynamicChart";


// export default function MilkEntryTable({ onEdit }) {

//   if (!api) {
//     console.error("VITE_API_BASE_URL is not defined");
//   }

//   const navigate = useNavigate();
//   const [entries, setEntries] = useState([]);
//   // const [filterDate, setFilterDate] = useState("");
//   // const [dailyTotal, setDailyTotal] = useState(null);

//   // const [dailyChart, setDailyChart] = useState([]);
//   // const [monthlyChart, setMonthlyChart] = useState([]);
//   // const [year, setYear] = useState("");
//   // const [month, setMonth] = useState("");

//   // const [xAxis, setXAxis] = useState("");
//   // const [yAxes, setYAxes] = useState([]);
//   // const [colors, setColors] = useState({
//   //   qty: "#0d6efd",
//   //   amount: "#dc3545",
//   //   fat: "#198754",
//   //   snf: "#6f42c1",
//   //   clr: "#fd7e14",
//   //   rate_per_litre: "#20c997"
//   // });


//   // const fetchEntries = async () => {
//   //   const res = await api.get(`${API_BASE}/milk-entry`);
//   //   setEntries(res.data);
//   //   setDailyTotal(null);
//   //   setDailyChart([]);
//   // };

//   // const fetchByDate = async () => {
//   //   if (!filterDate) {
//   //     fetchEntries();
//   //     return;
//   //   }

//   //   const entriesRes = await api.get(
//   //     `${API_BASE}/milk-entry/by-date/${filterDate}`
//   //   );

//   //   const totalRes = await api.get(
//   //     `${API_BASE}/reports/daily-total/${filterDate}`
//   //   );

//   //   const chartRes = await api.get(
//   //     `${API_BASE}/charts/daily/${filterDate}`
//   //   );

//   //   setEntries(entriesRes.data);
//   //   setDailyTotal(totalRes.data);
//   //   setDailyChart(chartRes.data);
//   // };

//   // const fetchMonthlyChart = async () => {
//   //   if (!year || !month) return;

//   //   const res = await api.get(
//   //     `${API_BASE}/charts/monthly/${year}/${month}`
//   //   );    
//   //   setMonthlyChart(res.data);
//   // };

//   // const deleteEntry = async (id) => {
//   //   if (!window.confirm("Are you sure you want to delete?")) return;
//   //   await api.delete(`${API_BASE}/milk-entry/${id}`);
//   //   fetchEntries();
//   // };
//   // const fetchEntries = async () => {
//   //   const res = await api.get("/milk-entry");
//   //   setEntries(res.data);
//   //   setDailyTotal(null);
//   //   setDailyChart([]);
//   // };
//     const fetchEntries = async () => {
//       const res = await api.get("/milk-entry");
//       setEntries(res.data);
//     };
    
  
//   // const fetchByDate = async () => {
//   //   if (!filterDate) {
//   //     fetchEntries();
//   //     return;
//   //   }
  
//   //   const entriesRes = await api.get(`/milk-entry/by-date/${filterDate}`);
//   //   const totalRes = await api.get(`/reports/daily-total/${filterDate}`);
//   //   const chartRes = await api.get(`/charts/daily/${filterDate}`);
  
//   //   setEntries(entriesRes.data);
//   //   setDailyTotal(totalRes.data);
//   //   setDailyChart(chartRes.data);
//   // };
  
//   // const fetchMonthlyChart = async () => {
//   //   if (!year || !month) return;
  
//   //   const res = await api.get(`/charts/monthly/${year}/${month}`);
//   //   setMonthlyChart(res.data);
//   // };
  
//   const deleteEntry = async (id) => {
//     if (!window.confirm("Are you sure you want to delete?")) return;
//     await api.delete(`/milk-entry/${id}`);
//     fetchEntries();
//   };
  

//   // {(dailyChart.length || monthlyChart.length) && (
//   //   <DynamicChart
//   //     data={dailyChart.length ? dailyChart : monthlyChart}
//   //     xAxis={xAxis}
//   //     yAxes={yAxes}
//   //     colors={colors}
//   //   />
//   // )}
//   {(dailyChart.length || monthlyChart.length) && (
//     <DynamicChart
//       data={dailyChart.length ? dailyChart : monthlyChart}
//       xAxis={xAxis}
//       yAxes={yAxes}
//       colors={colors}
//     />
//   )}
  
  

//   useEffect(() => {
//     fetchEntries();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h4 className="mb-3">Milk Entries</h4>

//       {/* Filter */}
//       <div className="row g-2 mb-3">
//         <div className="col-12 col-md-4">
//           <input
//             type="date"
//             className="form-control"
//             value={filterDate}
//             onChange={(e) => setFilterDate(e.target.value)}
//           />
//         </div>

//         <div className="col-12 col-md-8 d-grid d-md-flex gap-2">
//           <button className="btn btn-secondary" onClick={fetchByDate}>
//             Filter
//           </button>
//           <button
//             className="btn btn-outline-secondary"
//             onClick={() => {
//               setFilterDate("");
//               fetchEntries();
//             }}
//           >
//             Clear
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="table-responsive">
//         <table className="table table-bordered table-striped table-sm">
//           <thead className="table-dark">
//             <tr>
//               <th>Date</th>
//               <th>Shift</th>
//               <th>Qty</th>
//               <th>Fat</th>
//               <th>SNF</th>
//               <th>CLR</th>
//               <th>Rate</th>
//               <th>Amount</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {entries.length === 0 ? (
//               <tr>
//                 <td colSpan="9" className="text-center">
//                   No entries found
//                 </td>
//               </tr>
//             ) : (
//               entries.map((e) => (
//                 <tr key={e.id}>
//                   <td>{e.date}</td>
//                   <td>{e.shift}</td>
//                   <td>{e.qty}</td>
//                   <td>{e.fat}</td>
//                   <td>{e.snf}</td>
//                   <td>{e.clr}</td>
//                   <td>{e.rate_per_litre}</td>
//                   <td>₹{e.amount}</td>
//                   <td>
//                   <button
//                       className="btn btn-sm btn-warning me-1"
//                       onClick={() => {
//                         onEdit(e);
//                         navigate("/");
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => deleteEntry(e.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Daily Total */}
//       {dailyTotal && (
//         <div className="alert alert-info mt-3">
//           <strong>Date:</strong> {dailyTotal.date} <br />
//           <strong>Total Quantity:</strong> {dailyTotal.total_qty} L <br />
//           <strong>Total Amount:</strong> ₹{dailyTotal.total_amount}
//         </div>
//       )}

//       {dailyChart.length > 0 && (
//         <>
//           <h5 className="mt-4">Daily Analysis</h5>
//           <DailyChart data={dailyChart} />
//         </>
//       )}

//       <div className="row g-2 mt-4">
//         <div className="col-6 col-md-3">
//           <input
//             className="form-control"
//             placeholder="Year"
//             onChange={(e) => setYear(e.target.value)}
//           />
//         </div>
//         <div className="col-6 col-md-3">
//           <input
//             className="form-control"
//             placeholder="Month"
//             onChange={(e) => setMonth(e.target.value)}
//           />
//         </div>
//         {/* <div className="col-12 col-md-3">
//           <button className="btn btn-primary w-100" onClick={fetchMonthlyChart}>
//             Monthly Chart
//           </button>
//         </div> */}
//         <button
//           className="btn btn-primary w-100"
//           onClick={fetchMonthlyChart}
//           disabled={!year || !month}
//         >
//           Monthly Chart
//         </button>

//       </div>

//       {monthlyChart.length > 0 && (
//         <>
//           <h5 className="mt-4">Monthly Trend</h5>
//           <MonthlyChart data={monthlyChart} />
//         </>
//       )}

//       <ChartConfigurator
//         xAxis={xAxis}
//         setXAxis={setXAxis}
//         yAxes={yAxes}
//         setYAxes={setYAxes}
//         colors={colors}
//         setColors={setColors}
//       />

//       <DynamicChart
//         data={dailyChart.length ? dailyChart : monthlyChart}
//         xAxis={xAxis}
//         yAxes={yAxes}
//         colors={colors}
//       />


//       <a
//         href={`${import.meta.env.VITE_API_BASE_URL}/reports/export-excel`}
//         className="btn btn-success mt-4"
//       >
//         Export to Excel
//       </a>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function MilkEntryTable({ onEdit }) {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    const res = await api.get("/milk-entry");
    setEntries(res.data);
  };

  const deleteEntry = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    await api.delete(`/milk-entry/${id}`);
    fetchEntries();
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Milk Reports</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-sm">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Shift</th>
              <th>Qty</th>
              <th>Fat</th>
              <th>SNF</th>
              <th>CLR</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">
                  No entries found
                </td>
              </tr>
            ) : (
              entries.map((e) => (
                <tr key={e.id}>
                  <td>{e.date}</td>
                  <td>{e.shift}</td>
                  <td>{e.qty}</td>
                  <td>{e.fat}</td>
                  <td>{e.snf}</td>
                  <td>{e.clr}</td>
                  <td>{e.rate_per_litre}</td>
                  <td>₹{e.amount}</td>
                  <td style={{ maxWidth: "200px", whiteSpace: "pre-wrap" }}>
                    {e.note || "-"}
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => {
                        onEdit(e);
                        navigate("/");
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteEntry(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
