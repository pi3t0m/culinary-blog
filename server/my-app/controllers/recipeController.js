const recipeService = require("../services/recipeService");

const createRecipe = async (req, res, next) => {
  try {
    const newRecipe = await recipeService.createRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
};

const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
};

const getPopularRecipes = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "6", 10), 50);
    const recipes = await recipeService.getPopularRecipes(limit);

    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await recipeService.getRecipeByIdAndIncrementViews(req.params.id);

    if (!recipe) {
      const error = new Error("Recipe not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const updatedRecipe = await recipeService.updateRecipe(req.params.id, req.body);

    if (!updatedRecipe) {
      const error = new Error("Recipe not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(updatedRecipe);
  } catch (err) {
    next(err);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const deletedRecipe = await recipeService.deleteRecipe(req.params.id);

    if (!deletedRecipe) {
      const error = new Error("Recipe not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getPopularRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};