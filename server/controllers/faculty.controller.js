const Faculty = require("../models/faculty.model");
const AppError = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");

exports.getAllFaculty = catchAsync(async (req, res) => {
  const faculty = await Faculty.find();
  res.status(200).json({
    status: "success",
    results: faculty.length,
    data: {
      faculty,
    },
  });
});

exports.getFaculty = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const faculty = await Faculty.findOne({ id });

  if (!faculty || faculty.length == 0) {
    return next(new AppError("No faculty found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      faculty,
    },
  });
});

exports.postFaculty = catchAsync(async (req, res) => {
  const faculty = await Faculty.find();
  const { name, age, gender, details, contact } = req.body;

  const facultyId =
    "FC" + (Number(faculty[faculty.length - 1].id.split("C")[1]) + 1);
  const newFaculty = new Faculty(
    Object.assign(
      { id: facultyId },
      {
        name,
        age,
        gender,
        details,
        contact,
      }
    )
  );

  await newFaculty.save();

  res.status(201).json({
    status: "success",
    data: {
      newFaculty,
    },
  });
});
