const fs = require("fs");

const tasks = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/SampleTasksData.json`)
);

exports.getAllTasks = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: {
      tasks,
    },
  });
};

exports.getTask = (req, res) => {
  const id = req.params.id * 1;

  const task = tasks.find((t) => t.id == id);

  if (!task) {
    res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    results: task.length,
    data: {
      task,
    },
  });
};

exports.postTask = (req, res) => {
  const taskId = tasks[tasks.length - 1].id + 1;
  const newTask = Object.assign({ id: taskId }, req.body);

  res.status(201).json({
    status: "success",
    data: {
      newTask,
    },
  });
};
