const Task = require("../models/Task");

// ==========================
// Add Task
// ==========================
const addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({
      message: "Task Added Successfully",
      task,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ==========================
// Get Client Tasks
// ==========================
const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      clientId: req.params.clientId,
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ==========================
// Update Task Status
// ==========================
const updateTask = async (req, res) => {
  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Task Updated Successfully",
      task,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ==========================
// Delete Task
// ==========================
const deleteTask = async (req, res) => {
  try {

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
};