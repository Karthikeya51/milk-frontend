import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DailyChart({ data }) {
  const chartData = {
    labels: data.map(d => d.shift),
    datasets: [
      {
        label: "Quantity (L)",
        data: data.map(d => d.qty),
        backgroundColor: "#0d6efd"
      },
      {
        label: "Amount (₹)",
        data: data.map(d => d.amount),
        backgroundColor: "#198754"
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
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "300px"   // 👈 controls mobile height
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
}
