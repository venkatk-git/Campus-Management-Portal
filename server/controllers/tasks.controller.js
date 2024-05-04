const Task = require("../models/task.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appErrors");

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

exports.getTask = catchAsync(async (req, res,next) => {
  const id = req.params.id * 1;
  const task = await Task.findOne({ id: id });

  if(!task ){
    return next(new AppError("Task not found with that id",404))
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
  const newTask = new Task(Object.assign({ id: taskId }, req.body));

  await newTask.save();

  res.status(201).json({
    status: "success",
    data: newTask,
  });
});
