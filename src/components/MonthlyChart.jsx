import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function MonthlyChart({ data }) {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: "Quantity (L)",
        data: data.map(d => d.qty),
        borderColor: "#0d6efd",
        tension: 0.3,        // smooth line
        fill: false
      },
      {
        label: "Amount (₹)",
        data: data.map(d => d.amount),
        borderColor: "#dc3545",
        tension: 0.3,
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top"
      }
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0
        }
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "320px"   // 👈 mobile-friendly height
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
}
