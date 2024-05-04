const Staff = require("../models/staff.model");
const AppError = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");

exports.checkId = (req, res, next) => {
  const id = req.params.id * 1;
  if (id < 0) {
    return next(new AppError("Invalid ID", 400));
  }
  next();
};

exports.getAllStaffs = catchAsync(async (req, res) => {
  const staffs = await Staff.find();
  res.status(200).json({
    status: "success",
    results: staffs.length,
    data: {
      staffs,
    },
  });
});

exports.getStaff = catchAsync(async (req, res, next) => {
  const staffs = await Staff.find();
  const id = req.params.id * 1;
  const staff = staffs.find((t) => t.id == id);

  if (!staff) {
    return next(new AppError("No staff found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    results: staff.length,
    data: {
      staff,
    },
  });
});

exports.postStaff = catchAsync(async (req, res) => {
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
});
