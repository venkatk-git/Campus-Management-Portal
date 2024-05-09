const mongoose = require("mongoose");

const supervisorSchema = new mongoose.Schema({
  id: {
    type: String,
    require: [true, "A supervisor must have a id"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "A supervisor must have a name"],
  },
  age: {
    type: Number,
    require: [true, "A supervisor must have a age"],
  },
  gender: {
    type: String,
    required: [true, "A supervisor must have a gender"],
  },
  category: {
    type: String,
    required: [true, "A supervisor must have a category"],
  },
  contact: {
    type: Number,
    required: [true, "A supervisor must have a contact number"],
  },
});

module.exports = mongoose.model("Supervisor", supervisorSchema);
