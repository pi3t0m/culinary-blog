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

router.post("/", createRecipe);
router.get("/", getAllRecipes);
router.get("/popular", getPopularRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;