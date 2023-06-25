const { body } = require("express-validator");

module.exports = {
  validateTask: [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long"),
    body("asignee")
      .isLength({ min: 5 })
      .withMessage("Asignee must be at least 5 characters long"),
    body("status").notEmpty().withMessage("Status is required"),
    body("description")
      .isLength({ min: 20 })
      .withMessage("Description must be at least 20 characters long"),
  ],
};
