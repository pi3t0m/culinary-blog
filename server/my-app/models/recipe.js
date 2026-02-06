// server/my-app/models/Recipe.js
const mongoose = require('mongoose');

// Tworzenie schematu dla przepisu
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String], // Lista składników
    required: true
  },
  steps: {
    type: [String], // Lista kroków przepisu
    required: true
  }
});

// Tworzenie modelu
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;