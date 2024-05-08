const mongoose = require("mongoose");

const formatDate = (date) => {
  var date = date.split("/");
  if (date[0] < 10) {
    var day = "0" + date[0];
  }
  if (date[1] < 10) {
    var month = "0" + date[1];
  }
  return [day, month, date[2]].join("/");
};

const taskSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: [true, "A task must have a id"],
    unique: true,
  },
  supervisor_id: {
    type: String,
    required: [true, "A task must have a supervisor id"],
  },
  date: {
    type: String,
    default: formatDate(new Date().toLocaleDateString("en-IN")),
  },
  name: {
    type: String,
    required: [true, "A task must have a name"],
  },
  category: {
    type: String,
    required: [true, "A task must have a category"],
  },
  location: {
    type: String,
    required: [true, "A task must have a location"],
  },
  staffsCount: {
    type: Number,
    require: [true, "A task must have the number of staffs working"],
  },
  staffsId: {
    type: Array,
    default: ["01", "02"],
  },
  eta: {
    type: Number,
    require: [true, "A task must have a estimated time"],
  },
  status: {
    type: String,
    default: "Pending",
  },
  remarks: {
    type: String,
    default: "Not yet added",
  },
});

module.exports = mongoose.model("Task", taskSchema);
