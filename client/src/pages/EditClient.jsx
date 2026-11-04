import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function EditClient() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    email: "",
    phone: "",
    service: "",
    status: "",
  });

  useEffect(() => {
    fetchClient();
  }, []);

  const fetchClient = async () => {
    try {
      const response = await API.get("/clients");

      const client = response.data.find((item) => item._id === id);

      if (client) {
        setFormData(client);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to load client");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/clients/${id}`, formData);

      alert("Client Updated Successfully");

      navigate("/clients");
    } catch (error) {
      console.log(error);

      alert("Update Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", width: "100%" }}>
          <h1>Edit Client</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
            />

            <br />
            <br />

            <input
              type="text"
              name="ownerName"
              placeholder="Owner Name"
              value={formData.ownerName}
              onChange={handleChange}
            />

            <br />
            <br />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <br />
            <br />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <br />
            <br />

            <input
              type="text"
              name="service"
              placeholder="Service"
              value={formData.service}
              onChange={handleChange}
            />

            <br />
            <br />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <br />
            <br />

            <button type="submit">Update Client</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditClient;