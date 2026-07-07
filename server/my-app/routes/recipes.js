const express = require("express");
const {
  createRecipe,
  getAllRecipes,
  getPopularRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

const router = express.Router();

const {
  recipeValidationRules,
  validateRecipe,
} = require("../middleware/validateRecipe");

router.post("/", recipeValidationRules, validateRecipe, createRecipe);
router.get("/", getAllRecipes);
router.get("/popular", getPopularRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", recipeValidationRules, validateRecipe, updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;