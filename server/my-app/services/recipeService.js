const Recipe = require("../models/recipe");

const createRecipe = async (recipeData) => {
  return Recipe.create(recipeData);
};

const getAllRecipes = async () => {
  return Recipe.find();
};

const getPopularRecipes = async (limit) => {
  return Recipe.find().sort({ views: -1 }).limit(limit);
};

const getRecipeByIdAndIncrementViews = async (id) => {
  return Recipe.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  );
};

const updateRecipe = async (id, recipeData) => {
  return Recipe.findByIdAndUpdate(id, recipeData, {
    new: true,
  });
};

const deleteRecipe = async (id) => {
  return Recipe.findByIdAndDelete(id);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getPopularRecipes,
  getRecipeByIdAndIncrementViews,
  updateRecipe,
  deleteRecipe,
};