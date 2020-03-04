var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const { Pool } = require('pg');

var app = express();

// Connection to PostgreSQL on Docker container
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'docker',
  port: 5432,
})

/**
 * TESTING CONNECTION
 */

// pool.query('SELECT $1::text as name', ['brianc'], (err, result) => {
//   if (err) {
//     return console.error('Error executing query', err.stack)
//   }
//   console.log(result.rows[0].name) // brianc
// })

// pool.query(`CREATE TABLE test (
//             id INTEGER, name CHAR(20))`,
//           (err, result) => {
//             if (err) {
//               return console.error('Error executing query', err.stack)
//             }
//             else {
//               console.log("Table should be made");
//             }
// });


// pool.query(`INSERT INTO test(id, name) VALUES (20, 'Tom')`, (err, result) => {
//   if (err) {
//     return console.error('Error executing query', err.stack)
//   }
//   else {
//     console.log("Tom should now be in the table");
//   }
// })

pool.query(`SELECT * FROM pg_stat_activity`, (err, result) => {
  if (err) {
    return console.log(err.stack);
  } 
  else {
    console.log(result.rows);
  }
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
