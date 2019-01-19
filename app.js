var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var student = require('./routes/admin/student');
var teacher = require('./routes/admin/teacher');
var subject = require('./routes/admin/subject');
var attendance = require('./routes/admin/attendance');
var teacherU = require('./routes/users/teacher');
var studentU = require('./routes/users/student');

var app = express();

mongoose.connect('mongodb://127.0.0.1/sasdb')
// mongoose.connect('mongodb://yethuaung:Zikimi95@ds125048.mlab.com:25048/studynode');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/admin/students', student);
app.use('/admin/teachers', teacher);
app.use('/admin/subjects', subject);
app.use('/admin/attendances', attendance);
app.use('/users/teachers', teacherU);
app.use('/users/students', studentU);


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
