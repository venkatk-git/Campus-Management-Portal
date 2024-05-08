const Task = require("../models/task.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appErrors");
const util = require("util");
const jwt = require("jsonwebtoken");

exports.checkId = (req, res, next) => {
  const id = req.params.id * 1;
  if (id < 0) {
    return next(new AppError("Invalid ID", 400));
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

exports.getTask = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;
  const task = await Task.findOne({ id: id });

  if (!task) {
    return next(new AppError("Task not found with that id", 404));
  }

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

  const token = req.headers.authorization.split(" ")[1];

  let decoded;
  try {
    decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      message: error.message,
    });
  }

  // const user = await User.findOne({ email: decoded.email });

  const newTask = new Task(
    Object.assign({ id: taskId, supervisor_id: "SP003" }, req.body)
  );

  await newTask.save();

  res.status(201).json({
    status: "success",
    data: newTask,
  });
});
