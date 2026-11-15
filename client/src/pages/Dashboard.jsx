
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardChart from "../components/DashboardChart";
import API from "../services/api";

function Dashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await API.get("/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Dashboard error:", error);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // Client Statistics
  const totalClients = clients.length;

  const activeClients = clients.filter(
    (client) => client.status === "Active"
  ).length;

  const inactiveClients = clients.filter(
    (client) => client.status === "Inactive"
  ).length;

  const totalServices = new Set(
    clients.map((client) => client.service).filter(Boolean)
  ).size;

  // Financial Calculations
  const totalRevenue = clients.reduce(
    (total, client) => total + Number(client.totalAmount || 0),
    0
  );

  const amountReceived = clients.reduce(
    (total, client) => total + Number(client.paidAmount || 0),
    0
  );

  const outstandingAmount = clients.reduce(
    (total, client) => total + Number(client.dueAmount || 0),
    0
  );

  const collectionRate =
    totalRevenue > 0
      ? Math.min((amountReceived / totalRevenue) * 100, 100)
      : 0;

  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  // Client Statistics Cards
  const stats = [
    {
      title: "Total Clients",
      value: totalClients,
      color: "#2563eb",
      background: "#eff6ff",
      icon: "TC",
    },
    {
      title: "Active Clients",
      value: activeClients,
      color: "#16a34a",
      background: "#f0fdf4",
      icon: "AC",
    },
    {
      title: "Inactive Clients",
      value: inactiveClients,
      color: "#dc2626",
      background: "#fef2f2",
      icon: "IC",
    },
    {
      title: "Total Services",
      value: totalServices,
      color: "#d97706",
      background: "#fffbeb",
      icon: "TS",
    },
  ];

  // Financial Cards
  const financialStats = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      description: "Total client contract value",
      color: "#2563eb",
      background: "#eff6ff",
      icon: "TR",
    },
    {
      title: "Amount Received",
      value: formatCurrency(amountReceived),
      description: "Total payments collected",
      color: "#16a34a",
      background: "#f0fdf4",
      icon: "AR",
    },
    {
      title: "Outstanding Payments",
      value: formatCurrency(outstandingAmount),
      description: "Amount pending from clients",
      color: "#dc2626",
      background: "#fef2f2",
      icon: "OP",
    },
    {
      title: "Collection Rate",
      value: `${collectionRate.toFixed(1)}%`,
      description: "Revenue collection progress",
      color: "#d97706",
      background: "#fffbeb",
      icon: "CR",
    },
  ];

  const recentClients = clients.slice(0, 5);

  return (
    <>
      <Navbar />

      <div className="d-flex crm-dashboard-layout">
        <Sidebar />

        <main className="container-fluid p-3 p-md-4">

          {/* Dashboard Header */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <div>
              <h2 className="fw-bold text-primary mb-1">
                Dashboard
              </h2>
              <p className="text-muted mb-0">
                Welcome back! Here's your business overview.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/add-client")}
            >
              + Add New Client
            </button>
          </div>

          {loading ? (
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                Loading dashboard...
              </div>
            </div>
          ) : (
            <>
              {/* Client Statistics */}
              <h5 className="fw-bold mb-3">
                Client Overview
              </h5>

              <div className="row g-3 mb-4">
                {stats.map((stat) => (
                  <div
                    className="col-6 col-md-6 col-xl-3"
                    key={stat.title}
                  >
                    <div
                      className="card h-100 border-0 shadow-sm"
                      style={{
                        borderRadius: "14px",
                        borderLeft: `4px solid ${stat.color}`,
                      }}
                    >
                      <div className="card-body p-3 p-md-4">
                        <div className="d-flex align-items-center mb-3">
                          <span
                            className="rounded-3 d-flex align-items-center justify-content-center fw-bold"
                            style={{
                              width: "38px",
                              height: "38px",
                              background: stat.background,
                              color: stat.color,
                              fontSize: "12px",
                            }}
                          >
                            {stat.icon}
                          </span>
                        </div>

                        <p className="text-muted mb-1 small">
                          {stat.title}
                        </p>

                        <h2
                          className="fw-bold mb-0"
                          style={{ color: stat.color }}
                        >
                          {stat.value}
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Overview */}
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3 mt-4">
                <div>
                  <h5 className="fw-bold mb-1">
                    Financial Overview
                  </h5>
                  <p className="text-muted small mb-0">
                    Revenue and payment performance
                  </p>
                </div>
              </div>

              <div className="row g-3 mb-4">
                {financialStats.map((stat) => (
                  <div
                    className="col-6 col-xl-3"
                    key={stat.title}
                  >
                    <div
                      className="card h-100 border-0 shadow-sm"
                      style={{
                        borderRadius: "14px",
                        borderLeft: `4px solid ${stat.color}`,
                      }}
                    >
                      <div className="card-body p-3 p-md-4">
                        <span
                          className="rounded-3 d-flex align-items-center justify-content-center fw-bold mb-3"
                          style={{
                            width: "38px",
                            height: "38px",
                            background: stat.background,
                            color: stat.color,
                            fontSize: "12px",
                          }}
                        >
                          {stat.icon}
                        </span>

                        <p className="text-muted small mb-1">
                          {stat.title}
                        </p>

                        <h4
                          className="fw-bold mb-2"
                          style={{
                            color: stat.color,
                            fontSize: "clamp(16px, 2vw, 24px)",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {stat.value}
                        </h4>

                        <small className="text-muted">
                          {stat.description}
                        </small>

                        {stat.title === "Collection Rate" && (
                          <div
                            className="progress mt-3"
                            style={{ height: "7px" }}
                          >
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{
                                width: `${collectionRate}%`,
                                backgroundColor: stat.color,
                              }}
                              aria-valuenow={collectionRate}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dashboard Chart */}
              <div className="mb-4">
                <DashboardChart
                  total={totalClients}
                  active={activeClients}
                  inactive={inactiveClients}
                />
              </div>

              {/* Recent Clients */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-3 p-md-4">

                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                    <div>
                      <h4 className="fw-bold mb-1">
                        Recent Clients
                      </h4>
                      <p className="text-muted small mb-0">
                        Your latest client records
                      </p>
                    </div>

                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => navigate("/clients")}
                    >
                      View All Clients
                    </button>
                  </div>

                  {recentClients.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-muted mb-3">
                        No clients added yet.
                      </p>

                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate("/add-client")}
                      >
                        Add Your First Client
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Desktop Table */}
                      <div className="table-responsive d-none d-md-block">
                        <table className="table table-hover align-middle mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Company</th>
                              <th>Owner</th>
                              <th>Service</th>
                              <th>Status</th>
                            </tr>
                          </thead>

                          <tbody>
                            {recentClients.map((client) => (
                              <tr key={client._id}>
                                <td className="fw-semibold">
                                  {client.companyName}
                                </td>
                                <td>{client.ownerName}</td>
                                <td>{client.service || "-"}</td>
                                <td>
                                  <span
                                    className={`badge ${
                                      client.status === "Active"
                                        ? "bg-success"
                                        : "bg-danger"
                                    }`}
                                  >
                                    {client.status || "Inactive"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Client Cards */}
                      <div className="d-md-none">
                        <div className="d-flex flex-column gap-3">
                          {recentClients.map((client) => (
                            <div
                              key={client._id}
                              className="p-3 rounded-3 border"
                            >
                              <div className="d-flex justify-content-between align-items-start gap-2">
                                <div>
                                  <h6 className="fw-bold mb-1">
                                    {client.companyName}
                                  </h6>
                                  <p className="text-muted small mb-2">
                                    {client.ownerName}
                                  </p>
                                </div>

                                <span
                                  className={`badge ${
                                    client.status === "Active"
                                      ? "bg-success"
                                      : "bg-danger"
                                  }`}
                                >
                                  {client.status || "Inactive"}
                                </span>
                              </div>

                              <div className="text-muted small">
                                Service: {client.service || "-"}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

        </main>
      </div>
    </>
  );
}

export default Dashboard;
