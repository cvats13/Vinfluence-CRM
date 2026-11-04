import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ClientMaterials() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Logo");
  const [file, setFile] = useState(null);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await API.get(`/materials/${id}`);
      setMaterials(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("clientId", id);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("file", file);

    try {
      await API.post("/materials/upload", formData);

      alert("Material Uploaded Successfully");

      setTitle("");
      setCategory("Logo");
      setFile(null);

      fetchMaterials();
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  return (
    <div className="container-fluid mt-4">

      <div className="card shadow mb-4">
        <div className="card-body">

          <h3 className="text-center mb-4">
            📁 Client Materials
          </h3>

          <form onSubmit={handleSubmit}>

            <div className="row g-3">

              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Material Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-3">
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Logo</option>
                  <option>Banner</option>
                  <option>Poster</option>
                  <option>Social Post</option>
                  <option>Reel</option>
                  <option>Video</option>
                  <option>PDF</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="col-md-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>

              <div className="col-md-2">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Upload
                </button>
              </div>

            </div>

          </form>

        </div>
      </div>

      <div className="row">

        {materials.length > 0 ? (

          materials.map((item) => (

            <div
              className="col-md-4 mb-4"
              key={item._id}
            >
              <div className="card shadow h-100">

                <div className="card-body">

                  <h5>{item.title}</h5>

                  <p>
                    <strong>Category:</strong>{" "}
                    {item.category}
                  </p>

                  <a
                    href={`http://localhost:5000/${item.filePath}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-success btn-sm me-2"
                  >
                    View
                  </a>

                  <button
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>

          ))

        ) : (

          <div className="text-center">
            <h5>No Materials Uploaded Yet</h5>
          </div>

        )}

      </div>

    </div>
  );
}

export default ClientMaterials;