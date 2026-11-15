
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Clients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const clientsPerPage = 5;
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
      console.error("Failed to load clients:", error);
      alert("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/clients/${id}`);
      alert("Client deleted successfully.");
      await fetchClients();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete client");
    }
  };

  const filteredClients = clients.filter((client) => {
    const company = (client.companyName || "").toLowerCase();
    const owner = (client.ownerName || "").toLowerCase();
    const email = (client.email || "").toLowerCase();
    const searchValue = search.toLowerCase();

    const matchesSearch =
      company.includes(searchValue) ||
      owner.includes(searchValue) ||
      email.includes(searchValue);

    const matchesStatus =
      statusFilter === "All" ||
      client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(
    filteredClients.length / clientsPerPage
  );

  const safePage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const indexOfLastClient = safePage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;

  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const formatAmount = (amount) =>
    Number(amount || 0).toLocaleString("en-IN");

  const PaymentBadge = ({ status }) => {
    const styles = {
      Paid: "bg-success",
      Partial: "bg-warning text-dark",
      Pending: "bg-danger",
    };

    return (
      <span className={`badge ${styles[status] || "bg-secondary"}`}>
        {status || "Pending"}
      </span>
    );
  };

  const StatusBadge = ({ status }) => (
    <span
      className={`badge ${
        status === "Active" ? "bg-success" : "bg-danger"
      }`}
    >
      {status || "Inactive"}
    </span>
  );

  const ClientActions = ({ client }) => (
    <div className="d-flex flex-wrap gap-2">
      <button
        className="btn btn-info btn-sm text-white"
        onClick={() => navigate(`/client/${client._id}`)}
      >
        Materials
      </button>

      <button
        className="btn btn-warning btn-sm"
        onClick={() => navigate(`/edit-client/${client._id}`)}
      >
        Edit
      </button>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => deleteClient(client._id)}
      >
        Delete
      </button>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="d-flex crm-clients-layout">
        <Sidebar />

        <main className="container-fluid p-3 p-md-4 crm-clients-content">

          {/* Page Heading */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <div>
              <h2 className="text-primary fw-bold mb-1">
                Clients Management
              </h2>
              <p className="text-muted mb-0">
                Manage your clients, services and payments.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/add-client")}
            >
              + Add Client
            </button>
          </div>

          {/* Search and Filter */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <div className="row g-3">

                <div className="col-12 col-md-7">
                  <label className="form-label fw-semibold">
                    Search Clients
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search company, owner or email..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-5">
                  <label className="form-label fw-semibold">
                    Filter by Status
                  </label>

                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) =>
                      handleStatusFilter(e.target.value)
                    }
                  >
                    <option value="All">All Clients</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

              </div>
            </div>
          </div>

          {/* Client Count */}
          <div className="mb-3">
            <span className="text-muted">
              Showing {filteredClients.length} client(s)
            </span>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="card shadow-sm border-0">
              <div className="card-body text-center py-5">
                Loading clients...
              </div>
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="card shadow-sm border-0">
              <div className="card-body text-center py-5">
                <h5 className="text-muted">No Clients Found</h5>
                <p className="text-muted mb-0">
                  Try changing your search or filter.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="card shadow-sm border-0 d-none d-lg-block">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th>Company</th>
                          <th>Owner</th>
                          <th>Service</th>
                          <th>Total</th>
                          <th>Paid</th>
                          <th>Due</th>
                          <th>Payment</th>
                          <th>Method</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentClients.map((client) => (
                          <tr key={client._id}>
                            <td className="fw-semibold">
                              {client.companyName}
                            </td>

                            <td>{client.ownerName}</td>
                            <td>{client.service}</td>

                            <td className="text-primary fw-semibold">
                              ₹{formatAmount(client.totalAmount)}
                            </td>

                            <td className="text-success fw-semibold">
                              ₹{formatAmount(client.paidAmount)}
                            </td>

                            <td className="text-danger fw-semibold">
                              ₹{formatAmount(client.dueAmount)}
                            </td>

                            <td>
                              <PaymentBadge status={client.paymentStatus} />
                            </td>

                            <td>{client.paymentMethod || "-"}</td>

                            <td>
                              <StatusBadge status={client.status} />
                            </td>

                            <td>
                              <ClientActions client={client} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Mobile and Tablet Cards */}
              <div className="d-lg-none">
                <div className="row g-3">
                  {currentClients.map((client) => (
                    <div className="col-12 col-md-6" key={client._id}>
                      <div className="card shadow-sm border-0 h-100">
                        <div className="card-body">

                          <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                            <div>
                              <h5 className="fw-bold mb-1">
                                {client.companyName}
                              </h5>
                              <p className="text-muted small mb-0">
                                {client.ownerName}
                              </p>
                            </div>

                            <StatusBadge status={client.status} />
                          </div>

                          <hr />

                          <div className="row g-3 mb-3">
                            <div className="col-6">
                              <small className="text-muted">
                                Service
                              </small>
                              <div className="fw-semibold">
                                {client.service || "-"}
                              </div>
                            </div>

                            <div className="col-6">
                              <small className="text-muted">
                                Payment Method
                              </small>
                              <div className="fw-semibold">
                                {client.paymentMethod || "-"}
                              </div>
                            </div>

                            <div className="col-4">
                              <small className="text-muted">Total</small>
                              <div className="text-primary fw-bold">
                                ₹{formatAmount(client.totalAmount)}
                              </div>
                            </div>

                            <div className="col-4">
                              <small className="text-muted">Paid</small>
                              <div className="text-success fw-bold">
                                ₹{formatAmount(client.paidAmount)}
                              </div>
                            </div>

                            <div className="col-4">
                              <small className="text-muted">Due</small>
                              <div className="text-danger fw-bold">
                                ₹{formatAmount(client.dueAmount)}
                              </div>
                            </div>

                            <div className="col-12">
                              <small className="text-muted">
                                Payment Status
                              </small>
                              <div>
                                <PaymentBadge
                                  status={client.paymentStatus}
                                />
                              </div>
                            </div>
                          </div>

                          <hr />

                          <ClientActions client={client} />

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Pagination */}
          {!loading && filteredClients.length > 0 && (
            <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 mt-4">

              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={safePage === 1}
                onClick={() => setCurrentPage(safePage - 1)}
              >
                Previous
              </button>

              <span className="fw-semibold">
                Page {safePage} of {totalPages}
              </span>

              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage(safePage + 1)}
              >
                Next
              </button>

            </div>
          )}

        </main>
      </div>
    </>
  );
}

export default Clients;
