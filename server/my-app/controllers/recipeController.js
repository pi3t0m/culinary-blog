const Recipe = require("../models/recipe");

const createRecipe = async (req, res) => {
  const { title, description, ingredients, steps, imageUrl } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      imageUrl,
    });

    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: "Error saving recipe", error: err });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipes", error: err });
  }
};

const getPopularRecipes = async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || "6", 10), 50);

  try {
    const recipes = await Recipe.find().sort({ views: -1 }).limit(limit);

    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching popular recipes", error: err });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipe", error: err });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ message: "Error updating recipe", error: err });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting recipe", error: err });
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