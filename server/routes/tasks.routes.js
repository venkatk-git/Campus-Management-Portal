const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasks.controller");
const authController = require("../controllers/auth.controller");

router.param("id", tasksController.checkId);

router
  .route("/")
  .get(authController.protect, tasksController.getAllTasks)
  .post(
    authController.protect,
    authController.restrictTo("supervisor", "admin"),
    tasksController.postTask
  );
router.route("/:id").get(authController.protect, tasksController.getTask);

module.exports = router;
