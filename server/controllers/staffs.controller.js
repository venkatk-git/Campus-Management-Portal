const Staff = require("../models/staff.model");

exports.checkId = async (req, res, next) => {
  const staffs = await Staff.find();
  const id = req.params.id * 1;
  const staff = staffs.find((t) => t.id == id);

  if (!staff) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }

  next();
};

exports.getAllStaffs = async (req, res) => {
  const staffs = await Staff.find();
  res.status(200).json({
    status: "success",
    results: staffs.length,
    data: {
      staffs,
    },
  });
};

exports.getStaff = async (req, res) => {
  const staffs = await Staff.find();

  const id = req.params.id * 1;
  const staff = staffs.find((t) => t.id == id);
  res.status(200).json({
    status: "success",
    results: staff.length,
    data: {
      staff,
    },
  });
};

exports.postStaff = async (req, res) => {
  const staffs = await Staff.find();

  const staffId = staffs[staffs.length - 1].id + 5;
  const newStaff = new Staff(Object.assign({ id: staffId }, req.body));

  await newStaff.save();

  res.status(201).json({
    status: "success",
    data: {
      newStaff,
    },
  });
};
