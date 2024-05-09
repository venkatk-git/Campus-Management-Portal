const express = require("express");
const app = express();
const tasksRoute = require("./routes/tasks.routes.js");
const staffsRoute = require("./routes/staffs.routes.js");
const usersRoute = require("./routes/users.routes.js");
const supervisorsRoute = require("./routes/supervisors.routes.js");
const facultyRoute = require("./routes/faculty.routes.js");
const cors = require("cors");

const AppError = require("./utils/appErrors.js");

const globalErrorHandler = require("./controllers/errors.controller.js");

app.use(express.json());

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:5173"],
};

app.use(cors(corsOptions));

app.use("/api/v1/tasks", tasksRoute);
app.use("/api/v1/staffs", staffsRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/supervisors", supervisorsRoute);
app.use("/api/v1/faculty", facultyRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} not found`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
