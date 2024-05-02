const express = require("express");
const router = express.Router();
const fs = require("fs");

const tasks = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/SampleTasksData.json`)
);

const getAllTasks = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: {
      tasks,
    },
  });
};

const getTask = (req, res) => {
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

const postTask = (req, res) => {
  const taskId = tasks[tasks.length - 1].id + 1;
  const newTask = Object.assign({ id: taskId }, req.body);

  res.status(201).json({
    status: "succes",
    data: {
      newTask,
    },
  });
};

router.route("/").get(getAllTasks).post(postTask);
router.route("/:id").get(getTask);

module.exports = router;
