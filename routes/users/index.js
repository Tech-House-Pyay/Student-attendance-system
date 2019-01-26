var express = require('express');
var router = express.Router();

var teachers = require('./teacher');
var students = require('./student');

/* GET users listing. */
var auth_stu = function(req, res, next) {
  if (req.session.users.roll == "student") {
    return next();
  } else{
    res.redirect('/signup');
    }
};

var auth_tea = function(req, res, next) {
  if (req.session.users.roll == "teacher") {
    return next();
  } else{
    res.redirect('/login');
    }
};


router.use('/teachers',auth_tea, teachers);
router.use('/students',auth_stu, students);

module.exports = router;
