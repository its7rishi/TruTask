const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

// Get All Tasks
router.route("/").get(getTasks);

// Create Task
router.route("/create-task").post(createTask);

// Update Task OR DELETE TASK
router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
