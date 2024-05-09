const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  id: {
    type: String,
    require: [true, "A faculty must have a id"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "A faculty must have a name"],
  },
  age: {
    type: Number,
    require: [true, "A faculty must have a age"],
  },
  gender: {
    type: String,
    required: [true, "A faculty must have a gender"],
  },
  details: {
    type: String,
    default: "Faculty",
  },
  contact: {
    type: Number,
    required: [true, "A faculty must have a contact number"],
  },
});

module.exports = mongoose.model("Faculty", facultySchema);
