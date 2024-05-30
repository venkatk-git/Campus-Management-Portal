const util = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

const signToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: "failed",
      message: "Provide email and password",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid email or password",
    });
  }

  const token = signToken(user.email);

  return res.status(200).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "failed",
      message: "You are not logged in ",
    });
  }

  let decoded;
  try {
    decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      message: error.message,
    });
  }

  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    return res.status(401).json({
      status: "failed",
      message: "User not found",
    });
  }

  req.user = user;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "failed",
        message: "You don't have the permission to perform this action",
      });
    }

    next();
  };
};
