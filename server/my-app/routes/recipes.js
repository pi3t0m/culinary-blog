// server/my-app/routes/recipes.js
const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();

// Dodawanie nowego przepisu (POST)
router.post('/', async (req, res) => {
  const { title, description, ingredients, steps, imageUrl } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      imageUrl
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: 'Error saving recipe', error: err });
  }
});

// Pobranie wszystkich przepisów (GET)
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recipes', error: err });
  }
});

// GET /api/recipes/popular?limit=6
router.get('/popular', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || "6", 10), 50);

  try {
    const recipes = await Recipe.find()
      .sort({ views: -1 })
      .limit(limit);

    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching popular recipes', error: err });
  }
});

// Pobranie pojedynczego przepisu (GET)
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recipe', error: err });
  }
});


// Aktualizowanie przepisu (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ message: 'Error updating recipe', error: err });
  }
});

// Usuwanie przepisu (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting recipe', error: err });
  }
});

module.exports = router;
