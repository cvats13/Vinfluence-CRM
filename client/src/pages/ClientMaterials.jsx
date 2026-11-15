
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function getMediaUrl(filePath) {
  if (!filePath) return "#";

  const backendUrl = API.defaults.baseURL.replace(/\/api\/?$/, "");

  if (/^https?:\/\//i.test(filePath)) {
    try {
      const url = new URL(filePath);

      if (
        url.hostname === "localhost" ||
        url.hostname === "127.0.0.1"
      ) {
        return `${backendUrl}${url.pathname}${url.search}`;
      }

      return filePath;
    } catch {
      return "#";
    }
  }

  const cleanPath = filePath
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");

  return `${backendUrl}/${cleanPath}`;
}

function ClientMaterials() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Logo");
  const [file, setFile] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, [id]);

  const fetchMaterials = async () => {
    try {
      setFetching(true);
      const response = await API.get(`/materials/${id}`);
      setMaterials(response.data);
    } catch (error) {
      console.error("Failed to load materials:", error);
      alert("Failed to load materials.");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("clientId", id);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("file", file);

    try {
      setLoading(true);

      await API.post("/materials/upload", formData);

      alert("Material uploaded successfully.");

      setTitle("");
      setCategory("Logo");
      setFile(null);
      e.target.reset();

      await fetchMaterials();
    } catch (error) {
      console.error("Upload failed:", error);
      alert(
        error.response?.data?.message ||
          "Upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (materialId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this material?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(materialId);

      await API.delete(`/materials/${materialId}`);

      alert("Material deleted successfully.");

      await fetchMaterials();
    } catch (error) {
      console.error("Delete failed:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete material. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container-fluid mt-4 px-3 px-md-4">

      <div className="card shadow-sm mb-4">
        <div className="card-body p-3 p-md-4">

          <h3 className="mb-4">Client Materials</h3>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-12 col-md-4">
                <label className="form-label">Material Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter material title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Logo">Logo</option>
                  <option value="Image">Image</option>
                  <option value="Reel">Reel</option>
                  <option value="Video">Video</option>
                  <option value="PDF">PDF</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label">Choose File</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setFile(e.target.files[0] || null)
                  }
                  required
                />
              </div>

              <div className="col-12 col-md-2 d-flex align-items-end">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>

      <div className="row g-3">

        {fetching ? (
          <div className="col-12 text-center py-4">
            Loading materials...
          </div>
        ) : materials.length > 0 ? (

          materials.map((item) => (
            <div
              className="col-12 col-sm-6 col-lg-4"
              key={item._id}
            >
              <div className="card shadow-sm h-100">
                <div className="card-body">

                  <h5 className="card-title">{item.title}</h5>

                  <p className="text-muted mb-3">
                    <strong>Category:</strong> {item.category}
                  </p>

                  <div className="d-flex flex-wrap gap-2">

                    <a
                      href={getMediaUrl(item.filePath)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success btn-sm"
                    >
                      View Material
                    </a>

                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                    >
                      {deletingId === item._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))

        ) : (
          <div className="col-12 text-center py-4">
            <h5>No materials uploaded yet</h5>
          </div>
        )}

      </div>
    </div>
  );
}

export default ClientMaterials;
