import { useEffect, useState } from "react";
import API from "../services/api";

function Notes({ client }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (client?._id) {
      fetchNotes();
    }
  }, [client]);

  const fetchNotes = async () => {
    try {
      const response = await API.get(`/notes/${client._id}`);
      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (e) => {
    e.preventDefault();

    try {
      await API.post("/notes", {
        clientId: client._id,
        title,
        description,
      });

      alert("Note Added Successfully");

      setTitle("");
      setDescription("");

      fetchNotes();

    } catch (error) {
      console.log(error);
      alert("Failed to Add Note");
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await API.delete(`/notes/${id}`);

      alert("Note Deleted");

      fetchNotes();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <div className="card shadow mb-4">

        <div className="card-body">

          <h3 className="mb-4">📝 Client Notes</h3>

          <form onSubmit={addNote}>

            <input
              className="form-control mb-3"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              className="form-control mb-3"
              rows="4"
              placeholder="Write note..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <button
              className="btn btn-primary"
              type="submit"
            >
              Add Note
            </button>

          </form>

        </div>

      </div>

      {notes.map((note) => (

        <div
          className="card shadow mb-3"
          key={note._id}
        >

          <div className="card-body">

            <h5>{note.title}</h5>

            <p>{note.description}</p>

            <small className="text-muted">
              {new Date(note.createdAt).toLocaleString()}
            </small>

            <br />

            <button
              className="btn btn-danger btn-sm mt-3"
              onClick={() => deleteNote(note._id)}
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}

export default Notes;