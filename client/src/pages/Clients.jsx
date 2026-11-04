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

const clientsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await API.get("/clients");
      setClients(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load clients");
    }
  };

  const deleteClient = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/clients/${id}`);
      alert("Client Deleted Successfully");
      fetchClients();
    } catch (error) {
      console.log(error);
      alert("Failed to delete client");
    }
  };

  const filteredClients = clients.filter((client) => {
  const matchesSearch =
    client.companyName.toLowerCase().includes(search.toLowerCase()) ||
    client.ownerName.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || client.status === statusFilter;

  return matchesSearch && matchesStatus;
});
const indexOfLastClient = currentPage * clientsPerPage;

const indexOfFirstClient = indexOfLastClient - clientsPerPage;

const currentClients = filteredClients.slice(
  indexOfFirstClient,
  indexOfLastClient
);

const totalPages = Math.ceil(
  filteredClients.length / clientsPerPage
);
  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="text-primary text-center mb-4">
            📋 Clients Management
          </h2>

      <div className="row mb-4">

  <div className="col-md-5">

    <input
      type="text"
      className="form-control"
      placeholder="🔍 Search by Company, Owner or Email..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

  </div>

  <div className="col-md-3">

    <select
      className="form-select"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="All">All Clients</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>

  </div>

  <div className="col-md-4 text-end">

    <button
      className="btn btn-primary"
      onClick={() => navigate("/add-client")}
    >
      + Add Client
    </button>

  </div>

</div>

          <div className="card shadow">

            <div className="card-body">

              <table className="table table-striped table-hover table-bordered align-middle">

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

<th width="180">Actions</th>

</tr>

</thead>

                <tbody>

                  {filteredClients.length > 0 ? (

                  currentClients.map((client) => (

                      <tr key={client._id}>

                       <td>{client.companyName}</td>

<td>{client.ownerName}</td>

<td>{client.service}</td>

<td>
<strong className="text-primary">
₹{client.totalAmount}
</strong>
</td>

<td>
<strong className="text-success">
₹{client.paidAmount}
</strong>
</td>

<td>
<strong className="text-danger">
₹{client.dueAmount}
</strong>
</td>

<td>

{client.paymentStatus === "Paid" && (
<span className="badge bg-success">
Paid
</span>
)}

{client.paymentStatus === "Partial" && (
<span className="badge bg-warning text-dark">
Partial
</span>
)}

{client.paymentStatus === "Pending" && (
<span className="badge bg-danger">
Pending
</span>
)}

</td>

<td>{client.paymentMethod}</td>

                        <td>

                          {client.status === "Active" ? (

                            <span className="badge bg-success">
                              Active
                            </span>

                          ) : (

                            <span className="badge bg-danger">
                              Inactive
                            </span>

                          )}

                        </td>
<button
  className="btn btn-info btn-sm me-2"
  onClick={() =>
   navigate(`/client/${client._id}`)
  }
>
  📁 Materials
</button>
                        <td>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              navigate(`/edit-client/${client._id}`)
                            }
                          >
                            ✏ Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              deleteClient(client._id)
                            }
                          >
                            🗑 Delete
                          </button>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="100"
                        className="text-center text-danger"
                      >
                        No Clients Found
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>
              <div className="d-flex justify-content-center align-items-center mt-4">

  <button
    className="btn btn-secondary me-3"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    ⬅ Previous
  </button>

  <h5 className="mb-0">
    Page {currentPage} of {totalPages || 1}
  </h5>

  <button
    className="btn btn-secondary ms-3"
    disabled={currentPage === totalPages || totalPages === 0}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next ➡
  </button>

</div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Clients;