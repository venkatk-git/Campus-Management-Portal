const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const signToken = (email, role) => {
  return jwt.sign({ email, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  const token = signToken(newUser.email, newUser.role);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
      token,
    },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: "failed",
      message: "Provide email and password",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({
      status: "failed",
      message: "Invalid email or password",
    });
  }

  const token = await signToken(user.email, user.role);

  res.status(200).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
};
