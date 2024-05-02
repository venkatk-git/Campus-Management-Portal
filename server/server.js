const express = require("express");
const app = require("./app.js");

const tasksRoute = require("./routes/tasksRoutes.js");

app.use(express.json());

app.use("/api/v1/tasks", tasksRoute);

app.listen("3000", () => {
  console.log("Server listening on PORT:3000");
});
