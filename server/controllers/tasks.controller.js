const Task = require("../models/task.model");
const catchAsync = require("../utils/catchAsync");

exports.checkId = (req, res, next) => {
  const id = req.params.id * 1;

  if (!id < 0) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }

  next();
};

exports.getAllTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: {
      tasks,
    },
  });
});

exports.getTask = catchAsync(async (req, res) => {
  const id = req.params.id * 1;
  const task = await Task.findOne({ id: id });

  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});

exports.postTask = catchAsync(async (req, res) => {
  const tasks = await Task.find();
  const taskId = tasks[tasks.length - 1].id + 8;
  const newTask = new Task(Object.assign({ id: taskId }, req.body));

  await newTask.save();

  res.status(201).json({
    status: "success",
    data: newTask,
  });
});
