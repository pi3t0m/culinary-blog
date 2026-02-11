// server/my-app/models/recipe.js
const mongoose = require('mongoose');

// Tworzenie schematu dla przepisu
const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true },
    imageUrl: { type: String, default: "" },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Tworzenie modelu
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;