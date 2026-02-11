const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const recipesRouter = require("./routes/recipes");

dotenv.config();

const app = express();

// View engine (jeśli używasz pug z express-generator)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/recipes", recipesRouter);

// 404
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Jeśli wolisz JSON zamiast pug, można tu zrobić res.json(...)
  res.status(err.status || 500);
  res.render("error");
});

// MongoDB: nie łącz w czasie testów (CI/Jest)
if (process.env.NODE_ENV !== "test") {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.log("MONGO_URI is not set. Skipping MongoDB connection.");
  } else {
    mongoose
      .connect(uri)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.log("Error connecting to MongoDB:", err));
  }
}

module.exports = app;
