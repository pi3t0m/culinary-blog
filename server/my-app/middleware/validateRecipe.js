const { body, validationResult } = require("express-validator");

const recipeValidationRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("ingredients")
    .isArray({ min: 1 })
    .withMessage("Ingredients must be a non-empty array"),

  body("steps")
    .isArray({ min: 1 })
    .withMessage("Steps must be a non-empty array"),

  body("imageUrl")
    .optional()
    .isString()
    .withMessage("Image URL must be a string"),
];

const validateRecipe = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.status = 400;
    error.errors = errors.array();
    return next(error);
  }

  next();
};

module.exports = {
  recipeValidationRules,
  validateRecipe,
};