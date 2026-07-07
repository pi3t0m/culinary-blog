const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const pinoHttp = require("pino-http");
const appLogger = require("./config/logger");

const connectDatabase = require("./config/database");
const swaggerSpec = require("./config/swagger");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const recipesRouter = require("./routes/recipes");

const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

connectDatabase();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(pinoHttp({ logger: appLogger }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/recipes", recipesRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;