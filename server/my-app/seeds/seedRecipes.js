const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Recipe = require("../models/recipe");

dotenv.config();

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/culinary_blog";

const recipes = [
  {
    title: "Protein pancakes",
    description: "Puszyste pankejki białkowe idealne na śniadanie.",
    ingredients: ["2 jajka", "50 g płatków owsianych", "100 g skyru", "1 banan"],
    steps: ["Zblenduj składniki.", "Smaż na małym ogniu.", "Podawaj z owocami."],
    imageUrl: "",
  },
  {
    title: "Makaron carbonara",
    description: "Klasyczny makaron z jajkiem, serem i pieprzem.",
    ingredients: ["makaron", "jajka", "parmezan", "boczek", "pieprz"],
    steps: ["Ugotuj makaron.", "Podsmaż boczek.", "Wymieszaj z jajkiem i serem."],
    imageUrl: "",
  },
  {
    title: "Sałatka cezar",
    description: "Lekka sałatka z kurczakiem i sosem cezar.",
    ingredients: ["sałata", "kurczak", "grzanki", "parmezan", "sos cezar"],
    steps: ["Usmaż kurczaka.", "Pokrój składniki.", "Wymieszaj z sosem."],
    imageUrl: "",
  },
];

async function seed() {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");

    await Recipe.deleteMany({});
    await Recipe.insertMany(recipes);

    console.log(`Seeded ${recipes.length} recipes`);
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();