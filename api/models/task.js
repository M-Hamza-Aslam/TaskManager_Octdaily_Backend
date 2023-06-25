const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: "String",
    required: true,
  },
  asignee: {
    type: "String",
    required: true,
  },
  status: {
    type: "String",
    enum: ["In progress", "Complete"],
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
