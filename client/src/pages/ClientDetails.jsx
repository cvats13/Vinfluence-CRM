import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ClientMaterials from "./ClientMaterials";
import Payments from "../components/Payments";
import API from "../services/api";
import Notes from "../components/Notes";
import Tasks from "../components/Tasks";

function ClientDetails() {
  const { id } = useParams();

  const [client, setClient] = useState(null);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    fetchClient();
  }, []);

  const fetchClient = async () => {
    try {
      const response = await API.get(`/clients/${id}`);
      setClient(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load client");
    }
  };

  if (!client) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="text-primary mb-4">
            {client.companyName}
          </h2>

          <div className="mb-4">

            <button
              className={`btn me-2 ${tab === "overview" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setTab("overview")}
            >
              Overview
            </button>

            <button
              className={`btn me-2 ${tab === "materials" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setTab("materials")}
            >
              Materials
            </button>

            <button
              className={`btn me-2 ${tab === "payments" ? "btn-warning" : "btn-outline-warning"}`}
              onClick={() => setTab("payments")}
            >
              Payments
            </button>

            <button
              className={`btn me-2 ${tab === "notes" ? "btn-info" : "btn-outline-info"}`}
              onClick={() => setTab("notes")}
            >
              Notes
            </button>

            <button
              className={`btn ${tab === "tasks" ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setTab("tasks")}
            >
              Tasks
            </button>

          </div>

          {/* OVERVIEW */}

          {tab === "overview" && (

            <div className="row">

              <div className="col-md-6">

                <div className="card shadow">

                  <div className="card-body">

                    <h4>Client Information</h4>

                    <hr />

                    <p><b>Company:</b> {client.companyName}</p>
                    <p><b>Owner:</b> {client.ownerName}</p>
                    <p><b>Email:</b> {client.email}</p>
                    <p><b>Phone:</b> {client.phone}</p>
                    <p><b>Service:</b> {client.service}</p>

                    <p>
                      <b>Status:</b>{" "}
                      <span
                        className={
                          client.status === "Active"
                            ? "badge bg-success"
                            : "badge bg-danger"
                        }
                      >
                        {client.status}
                      </span>
                    </p>

                  </div>

                </div>

              </div>

              <div className="col-md-6">

                <div className="card bg-primary text-white mb-3 shadow">
                  <div className="card-body">
                    <h5>Total Amount</h5>
                    <h2>₹{client.totalAmount || 0}</h2>
                  </div>
                </div>

                <div className="card bg-success text-white mb-3 shadow">
                  <div className="card-body">
                    <h5>Paid Amount</h5>
                    <h2>₹{client.paidAmount || 0}</h2>
                  </div>
                </div>

                <div className="card bg-danger text-white shadow">
                  <div className="card-body">
                    <h5>Due Amount</h5>
                    <h2>₹{client.dueAmount || 0}</h2>
                  </div>
                </div>

              </div>

            </div>

          )}

          {/* MATERIALS */}

          {tab === "materials" && (
            <ClientMaterials />
          )}

          {/* PAYMENTS */}

          {tab === "payments" && (
            <Payments client={client} />
          )}

          {/* NOTES */}

          {tab === "notes" && (
  <Notes client={client} />
)}

          {/* TASKS */}

          {tab === "tasks" && (
  <Tasks client={client} />
)}

        </div>

      </div>

    </>
  );
}

export default ClientDetails;