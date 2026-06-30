const mongoose = require("mongoose");

async function connectDatabase() {
  if (process.env.NODE_ENV === "test") {
    console.log("Skipping MongoDB connection in test environment.");
    return;
  }

  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.log("MONGO_URI is not set. Skipping MongoDB connection.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

module.exports = connectDatabase;