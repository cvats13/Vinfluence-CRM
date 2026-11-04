import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function AddClient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    email: "",
    phone: "",
    service: "",

    totalAmount: "",
    paidAmount: "",
    dueAmount: "",
    paymentStatus: "Pending",
    paymentDate: "",
    nextDueDate: "",
    paymentMethod: "UPI",
    invoiceNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = {
      ...formData,
      [name]: value,
    };

    if (
      name === "totalAmount" ||
      name === "paidAmount"
    ) {
      const total =
        Number(
          name === "totalAmount"
            ? value
            : updatedData.totalAmount
        ) || 0;

      const paid =
        Number(
          name === "paidAmount"
            ? value
            : updatedData.paidAmount
        ) || 0;

      updatedData.dueAmount = total - paid;

      if (paid === 0) {
        updatedData.paymentStatus = "Pending";
      } else if (paid >= total) {
        updatedData.paymentStatus = "Paid";
      } else {
        updatedData.paymentStatus = "Partial";
      }
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/clients", formData);

      alert("Client Added Successfully");

      navigate("/clients");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="container mt-4">

          <div className="card shadow">

            <div className="card-body">

              <h2 className="text-center mb-4">
                Add New Client
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label>Company Name</label>

                    <input
                      type="text"
                      className="form-control"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Owner Name</label>

                    <input
                      type="text"
                      className="form-control"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Email</label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Phone</label>

                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Service</label>

                    <input
                      type="text"
                      className="form-control"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Invoice Number</label>

                    <input
                      type="text"
                      className="form-control"
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Total Amount (₹)</label>

                    <input
                      type="number"
                      className="form-control"
                      name="totalAmount"
                      value={formData.totalAmount}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Paid Amount (₹)</label>

                    <input
                      type="number"
                      className="form-control"
                      name="paidAmount"
                      value={formData.paidAmount}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Due Amount (₹)</label>

                    <input
                      type="number"
                      className="form-control"
                      name="dueAmount"
                      value={formData.dueAmount}
                      readOnly
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Payment Status</label>

                    <input
                      type="text"
                      className="form-control"
                      value={formData.paymentStatus}
                      readOnly
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Payment Date</label>

                    <input
                      type="date"
                      className="form-control"
                      name="paymentDate"
                      value={formData.paymentDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Next Due Date</label>

                    <input
                      type="date"
                      className="form-control"
                      name="nextDueDate"
                      value={formData.nextDueDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Payment Method</label>

                    <select
                      className="form-select"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                    >
                      <option>UPI</option>
                      <option>Cash</option>
                      <option>Bank Transfer</option>
                      <option>Card</option>
                    </select>
                  </div>

                </div>

                <button
                  className="btn btn-primary mt-3"
                  type="submit"
                >
                  Add Client
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default AddClient;