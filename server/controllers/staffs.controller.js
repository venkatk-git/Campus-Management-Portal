const fs = require("fs");

const staffs = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/SampleStaffsData.json`)
);

exports.checkId = (req, res, next) => {
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

exports.getAllStaffs = (req, res) => {
  res.status(200).json({
    status: "success",
    results: staffs.length,
    data: {
      staffs,
    },
  });
};

exports.getStaff = (req, res) => {
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

exports.postStaff = (req, res) => {
  const staffId = staffs[staffs.length - 1].id + 1;
  const newStaff = Object.assign({ id: staffId }, req.body);

  res.status(201).json({
    status: "success",
    data: {
      newStaff,
    },
  });
};
