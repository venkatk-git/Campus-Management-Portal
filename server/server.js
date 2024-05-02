const express = require("express");
const app = require("./app.js");
const dotenv = require("dotenv");
const PORT = dotenv.PORT || 3000;
const tasksRoute = require("./routes/tasks.routes..js");
const staffsRoute = require("./routes/staffs.routes.js");

app.use(express.json());

app.use("/api/v1/tasks", tasksRoute);
app.use("/api/v1/staffs", staffsRoute);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
