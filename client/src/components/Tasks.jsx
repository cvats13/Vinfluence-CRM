import { useEffect, useState } from "react";
import API from "../services/api";

function Tasks({ client }) {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (client?._id) loadTasks();
  }, [client]);

  const loadTasks = async () => {
    const res = await API.get(`/tasks/${client._id}`);
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();

    await API.post("/tasks", {
      clientId: client._id,
      title,
      deadline: "",
      priority: "Medium",
    });

    setTitle("");
    loadTasks();
  };

  const updateTask = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    loadTasks();
  };

  return (
    <div>

      <form onSubmit={addTask} className="mb-3 d-flex gap-2">

        <input
          className="form-control"
          placeholder="Enter Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <button className="btn btn-primary">
          Add
        </button>

      </form>

      <table className="table table-bordered">

        <thead>

          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {tasks.map((task) => (

            <tr key={task._id}>

              <td>{task.title}</td>

              <td>

                <select
                  className="form-select"
                  value={task.status}
                  onChange={(e) =>
                    updateTask(task._id, e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>

              </td>

              <td>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Tasks;