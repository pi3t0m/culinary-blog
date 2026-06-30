var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recipesRouter = require('./routes/recipes');

var app = express();
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/culinary_blog';
const clientUrl = process.env.CLIENT_URL;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: clientUrl ? clientUrl.split(',').map((url) => url.trim()) : true,
}));

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/recipes', recipesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// MongoDB connection
mongoose.connect(mongoUri)
  .then(() => console.log(`MongoDB connected: ${mongoUri}`))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exitCode = 1;
  });

module.exports = app;
