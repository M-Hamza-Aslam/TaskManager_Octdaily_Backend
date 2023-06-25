const router = require("express").Router();

// task controllers
const {
  addNewTask,
  taskList,
  updateTask,
  deleteTask,
} = require("../controllers/task");

//task validation
const { validateTask } = require("../../util/taskValidation");

//routes
router.post("/add-new", validateTask, addNewTask);
router.get("/list", taskList);
router.post("/update", validateTask, updateTask);
router.delete("/delete", deleteTask);

module.exports = router;
