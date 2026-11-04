const express = require("express");

const router = express.Router();

const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Add Task
router.post("/", addTask);

// Get Tasks of One Client
router.get("/:clientId", getTasks);

// Update Task
router.put("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

module.exports = router;
