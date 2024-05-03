const express = require("express");
const app = express();
const tasksRoute = require("./routes/tasks.routes..js");
const staffsRoute = require("./routes/staffs.routes.js");

app.use(express.json());

app.use("/api/v1/tasks", tasksRoute);
app.use("/api/v1/staffs", staffsRoute);

module.exports = app;
