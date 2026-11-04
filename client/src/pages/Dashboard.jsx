import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardChart from "../components/DashboardChart";
import API from "../services/api";

function Dashboard() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await API.get("/clients");
      setClients(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load dashboard data");
    }
  };

  const totalClients = clients.length;

  const activeClients = clients.filter(
    (client) => client.status === "Active"
  ).length;

  const inactiveClients = clients.filter(
    (client) => client.status === "Inactive"
  ).length;

  const totalServices = new Set(
    clients.map((client) => client.service)
  ).size;

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="text-center text-primary mb-4">
            📊 Dashboard
          </h2>

          <div className="row">

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body text-center">
                  <h5>Total Clients</h5>
                  <h2 className="text-primary">{totalClients}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body text-center">
                  <h5>Active Clients</h5>
                  <h2 className="text-success">{activeClients}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body text-center">
                  <h5>Inactive Clients</h5>
                  <h2 className="text-danger">{inactiveClients}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body text-center">
                  <h5>Total Services</h5>
                  <h2 className="text-warning">{totalServices}</h2>
                </div>
              </div>
            </div>

          </div>

          {/* Charts */}
          <DashboardChart
            total={totalClients}
            active={activeClients}
            inactive={inactiveClients}
          />

          {/* Recent Clients */}
          <div className="card shadow mt-5">

            <div className="card-body">

              <h4 className="mb-4">
                Recent Clients
              </h4>

              <table className="table table-bordered table-hover">

                <thead className="table-dark">

                  <tr>
                    <th>Company</th>
                    <th>Owner</th>
                    <th>Service</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {clients.slice(0, 5).map((client) => (
                    <tr key={client._id}>
                      <td>{client.companyName}</td>
                      <td>{client.ownerName}</td>
                      <td>{client.service}</td>
                      <td>
                        <span
                          className={`badge ${
                            client.status === "Active"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {client.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;