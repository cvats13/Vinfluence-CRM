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
        backgroundColor: "rgba(13,110,253,0.8)",
      },
      {
        label: "Active Clients",
        data: [active],
        backgroundColor: "rgba(25,135,84,0.8)",
      },
      {
        label: "Inactive Clients",
        data: [inactive],
        backgroundColor: "rgba(220,53,69,0.8)",
      },
    ],
  };

  const pieData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [active, inactive],
        backgroundColor: [
          "rgba(25,135,84,0.8)",
          "rgba(220,53,69,0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="row mt-5">
      <div className="col-md-6 mb-4">
        <div className="card shadow">
          <div className="card-body">
            <h4 className="text-center mb-3">
              Client Overview
            </h4>

            <Bar data={barData} options={options} />
          </div>
        </div>
      </div>

      <div className="col-md-6 mb-4">
        <div className="card shadow">
          <div className="card-body">
            <h4 className="text-center mb-3">
              Active vs Inactive
            </h4>

            <Pie data={pieData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardChart;