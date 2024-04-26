const Task = require("../models/Task");
const asyncHandler = require("../middleware/async");

// @desc Get All Tasks
// route GET /api/v1/tasks
// access PRIVATE
exports.getTasks = asyncHandler(async (req, res, next) => {
  try {
    const tasks = await Task.find();

    if (tasks)
      res.status(200).json({ status: "ok", count: tasks.length, data: tasks });
  } catch (error) {
    res.status(400).status({ status: "error", message: error.message });
  }
});

// @desc Get All Tasks
// route GET /api/v1/tasks/:id
// access PRIVATE

exports.getSingleTask = asyncHandler(async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    res.status(200).json({ status: "ok", data: task });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

// @desc Create Task
// route POST /api/v1/tasks/create-task
// access PRIVATE
exports.createTask = asyncHandler(async (req, res, next) => {
  try {
    const { title, isFlagged, isCompleted, dueDate, createdBy } = req.body;

    const newTask = {
      title,
      isFlagged,
      isCompleted,
      dueDate,
      createdBy,
    };

    const task = await Task.create(newTask);

    if (task) {
      res
        .status(201)
        .json({ status: "ok", data: task, message: "Task Added!!!" });
    } else {
      res
        .status(500)
        .json({ status: "error", message: "Something went wrong" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

// @desc Update Task
// route PUT /api/v1/tasks/:id
// access PRIVATE

exports.updateTask = asyncHandler(async (req, res, next) => {
  try {
    const { title, isFlagged, isCompleted, dueDate, createdBy } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (updatedTask) {
      res.status(200).json({ status: "ok", data: updatedTask });
    } else {
      res
        .status(500)
        .json({ status: "error", message: "Something went wrong" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

// @desc Delete Task
// route DELETE /api/v1/tasks/:id
// access PRIVATE

exports.deleteTask = asyncHandler(async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ status: "ok", message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});
