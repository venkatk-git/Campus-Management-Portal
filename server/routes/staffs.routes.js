const express = require("express");
const router = express.Router();

const staffsController = require("../controllers/staffs.controller");

router
  .route("/")
  .get(staffsController.getAllStaffs)
  .post(staffsController.postStaff);
router.route("/:id").get(staffsController.getStaff);

module.exports = router;
