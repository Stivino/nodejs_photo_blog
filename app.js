// load modules
var mongoose = require("mongoose");
var createError = require('http-errors');
var dateformat = require('dateFormat');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');

// define routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authorsRouter = require('./routes/authors');
var blogRouter = require('./routes/blogs');
var photoRouter = require('./routes/photos');
var config = require('./config');

// express
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connecting the database
const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
mongoose.connect(connectionString);

// define routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authors', authorsRouter);
app.use('/blog', blogRouter);
app.use('/photos', photoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
