
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";
import "./DashboardChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function DashboardChart({ total, active, inactive }) {
  const barData = {
    labels: ["Clients"],
    datasets: [
      {
        label: "Total Clients",
        data: [total],
        backgroundColor: "#3B82F6",
        borderRadius: 6,
      },
      {
        label: "Active Clients",
        data: [active],
        backgroundColor: "#10B981",
        borderRadius: 6,
      },
      {
        label: "Inactive Clients",
        data: [inactive],
        backgroundColor: "#EF4444",
        borderRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [active, inactive],
        backgroundColor: ["#10B981", "#EF4444"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 15,
          boxWidth: 8,
          font: {
            size: 11,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 15,
          boxWidth: 8,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="dashboard-charts">

      <div className="chart-card">

        <h4>Client Overview</h4>

        <div className="chart-container">
          <Bar data={barData} options={barOptions} />
        </div>

      </div>

      <div className="chart-card">

        <h4>Active vs Inactive</h4>

        <div className="chart-container pie-container">
          <Pie data={pieData} options={pieOptions} />
        </div>

      </div>

    </div>
  );
}

export default DashboardChart;
