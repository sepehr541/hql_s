const dotenv = require('dotenv');
dotenv.config();

var createError = require('http-errors');
var jade = require('jade');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var body_parser=require("body-parser")
var reservation = require("./routes/finalReservation")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');
var loginRouter = require('./routes/login');
var {router: restrictedRouter, verifyToken} = require('./routes/restricted');
var orderconf=require('./routes/orderConf')
var cors = require("cors")
var dotnv=require('dotenv')
var app = express();
dotnv.config()
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); app.use(logger('dev'));
app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(body_parser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/rooms', roomsRouter);
app.use('/Reservation', reservation);
app.use('/api/login', loginRouter);
app.use('/api/restricted', verifyToken,restrictedRouter);
app.use('/api/login', loginRouter)
app.use('/api/orderconf',orderconf)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
