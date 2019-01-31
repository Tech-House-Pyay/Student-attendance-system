var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');

var indexRouter = require('./routes/index');
var admin = require('./routes/admin');
var users = require('./routes/users');

var app = express();

mongoose.connect('mongodb://127.0.0.1/sasdb')
// mongoose.connect('mongodb://yethuaung:Zikimi95@ds125048.mlab.com:25048/studynode');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'));

app.use(session({
      secret: '@$TuD@ntA&tte!#$%^&09,',// any string for security
      resave: false,
      saveUninitialized : true
}));

app.use(function (req,res,next) {
  res.locals.user = req.session.user;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(function(req, res, next){
  if(req.session.users){
    next();
  }else {
    res.redirect('/');// redirect to other page
  }
});
app.use('/admin', admin);
app.use('/users', users);

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
