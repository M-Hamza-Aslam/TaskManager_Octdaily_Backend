// input validation
const { validationResult } = require("express-validator");
//model
const Task = require("../models/task");

module.exports = {
  taskList: async (req, res) => {
    try {
      //get all tasks
      const tasks = await Task.find();
      //return response
      res.status(200).json({
        message: "Fetched tasks successfully.",
        tasks: tasks,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong. Please try again later",
      });
    }
  },
  addNewTask: async (req, res) => {
    try {
      //data coming with the request
      const { title, asignee, status, description } = req.body;
      //input validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: "Validation failed, entered data is incorrect.",
          errors: errors.array(),
        });
      }
      //create new task
      const task = new Task({
        title: title,
        asignee: asignee,
        status: status,
        description: description,
      });
      //save task
      const result = await task.save();
      //return response
      const newTask = {
        _id: result._id.toString(),
        title: result.title,
        asignee: result.asignee,
        status: result.status,
        description: result.description,
      };
      res.status(201).json({
        message: "Task created successfully!",
        task: newTask,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong. Please try again later",
      });
    }
  },
  updateTask: async (req, res) => {
    try {
      //data coming with the request
      const { title, asignee, status, description } = req.body;
      const { id } = req.query;
      //input validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: "Validation failed, entered data is incorrect.",
          errors: errors.array(),
        });
      }
      //update task
      const updateTask = {
        title: title,
        asignee: asignee,
        status: status,
        description: description,
      };
      const result = await Task.findByIdAndUpdate(id, updateTask, {
        new: true,
      });
      if (result.n === 0) {
        return res.status(404).json({ message: "Task not found." });
      }
      //return response
      const updatedTask = {
        _id: result._id.toString(),
        title: result.title,
        asignee: result.asignee,
        status: result.status,
        description: result.description,
      };
      res.status(201).json({
        message: "Task updated successfully!",
        task: updatedTask,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong. Please try again later",
      });
    }
  },
  deleteTask: async (req, res) => {
    try {
      //data coming with the request
      const { id } = req.query;
      //delete task
      const result = await Task.deleteOne({ _id: id });
      if (result.n === 0) {
        return res.status(404).json({ message: "Task not found." });
      }
      //return response
      res.status(200).json({ message: "Task deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong. Please try again later",
      });
    }
  },
};
