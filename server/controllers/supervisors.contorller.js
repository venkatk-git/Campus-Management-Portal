const Supervisor = require("../models/supervisor.model");
const AppError = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");

exports.getAllSupervisors = catchAsync(async (req, res) => {
  const supervisors = await Supervisor.find();
  res.status(200).json({
    status: "success",
    results: supervisors.length,
    data: {
      supervisors,
    },
  });
});

exports.getSupervisor = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const supervisor = await Supervisor.find({ id });

  if (!supervisor || supervisor.length == 0) {
    return next(new AppError("No supervisor found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      supervisor,
    },
  });
});

exports.postSupervisor = catchAsync(async (req, res) => {
  const supervisors = await Supervisor.find();
  const { name, age, gender, category, contact } = req.body;

  const supervisorId =
    "SP" + (Number(supervisors[supervisors.length - 1].id.split("P")[1]) + 1);
  const newSupervisor = new Supervisor(
    Object.assign(
      { id: supervisorId },
      {
        name,
        age,
        gender,
        category,
        contact,
      }
    )
  );

  await newSupervisor.save();

  res.status(201).json({
    status: "success",
    data: {
      newSupervisor,
    },
  });
});
