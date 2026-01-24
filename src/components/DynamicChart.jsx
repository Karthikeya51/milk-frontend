import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

export default function DynamicChart({
  data,
  xAxis,
  yAxes,
  colors,
  type = "line"
}) {
  if (!xAxis || yAxes.length === 0) return null;

  const chartData = {
    labels: data.map(d => d[xAxis]),
    datasets: yAxes.map(param => ({
      label: param.toUpperCase(),
      data: data.map(d => d[param]),
      borderColor: colors[param],
      backgroundColor: colors[param],
      tension: 0.3,
      fill: false
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div style={{ height: "320px", width: "100%" }}>
      {type === "bar" ? (
        <Bar data={chartData} options={options} />
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
}
