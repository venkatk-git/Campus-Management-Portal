const express = require("express");
const router = express.Router();

const facultyController = require("../controllers/faculty.controller");
const authController = require("../controllers/auth.controller");

router
  .route("/")
  .get(authController.protect, facultyController.getAllFaculty)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    facultyController.postFaculty
  );
router.route("/:id").get(authController.protect, facultyController.getFaculty);

module.exports = router;
