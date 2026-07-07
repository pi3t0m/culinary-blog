const mongoose = require("mongoose");
const logger = require("./logger");

async function connectDatabase() {
  if (process.env.NODE_ENV === "test") {
    logger.warn("MONGO_URI is not set. Skipping MongoDB connection.");
    return;
  }

  const uri = process.env.MONGO_URI;

  if (!uri) {
    logger.warn("MONGO_URI is not set. Skipping MongoDB connection.");
    return;
  }

  try {
    await mongoose.connect(uri);
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error({ err }, "Error connecting to MongoDB");
    process.exit(1);
  }
}

module.exports = connectDatabase;