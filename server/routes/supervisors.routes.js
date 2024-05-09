const express = require("express");
const router = express.Router();

const supervisorsController = require("../controllers/supervisors.contorller");
const authController = require("../controllers/auth.controller");

router
  .route("/")
  .get(authController.protect, supervisorsController.getAllSupervisors)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    supervisorsController.postSupervisor
  );
router
  .route("/:id")
  .get(authController.protect, supervisorsController.getSupervisor);

module.exports = router;
