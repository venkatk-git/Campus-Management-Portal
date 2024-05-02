const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasks.controller")

router.route("/").get(tasksController.getAllTasks).post(tasksController.postTask);
router.route("/:id").get(tasksController.getTask);

module.exports = router;
