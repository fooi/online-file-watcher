var express = require('express');
var path = require('path');
var createError = require('http-errors');
var logger = require('morgan');
var events = require('events');

// var indexRouter = require('./routes/index');
var inspectRouter = require('./routes/inspect');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/inspect', inspectRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.redirect(err.status || 500, '/');
});

module.exports = app;
