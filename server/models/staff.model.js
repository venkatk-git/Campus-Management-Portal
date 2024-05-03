const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: [true, "A staff must have a id"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "A staff must have a name"],
  },
  age: {
    type: Number,
    require: [true, "A staff must have a age"],
  },
  gender: {
    type: String,
    required: [true, "A staff must have a gender"],
  },
  category: {
    type: String,
    required: [true, "A staff must have a category"],
  },
  location: {
    type: String,
    default: "Sathy",
  },
  level: {
    type: String,
    default: "I",
  },
  contact: {
    type: Number,
    required: [true, "A staff must have a contact number"],
  },
});

module.exports = mongoose.model("Staff", staffSchema);
