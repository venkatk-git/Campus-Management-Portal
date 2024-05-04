const express = require("express");
const router = express.Router();

const staffsController = require("../controllers/staffs.controller");
const authController = require("../controllers/auth.controller");

router.param("id", staffsController.checkId);

router
  .route("/")
  .get(authController.protect, staffsController.getAllStaffs)
  .post(
    authController.protect,
    authController.restrictTo("supervisor", "admin"),
    staffsController.postStaff
  );

router.route("/:id").get(authController.protect, staffsController.getStaff);

module.exports = router;
