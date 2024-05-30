const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post(
  "/signup",
  authController.protect,
  authController.restrictTo("admin"),
  authController.signup
);
router.post("/login", authController.login);

module.exports = router;
