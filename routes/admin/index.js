var express = require('express');
var router = express.Router();

var attendance = require('./attendance');
var student = require('./student');
var subject = require('./subject');
var teacher = require('./teacher');
var timetable = require('./timetable');

var Student = require('../../model/Student');
var Teacher = require('../../model/Teacher');
/* GET users listing. */

var auth = function(req, res, next) {
  if (req.session.users.roll == "admin") {
    return next();
  } else{
    res.redirect('/adsignin');
    }
};

router.get('/login', function(req, res, next) {
  res.render('user/login');
});

router.get('/',auth, function(req, res, next) {
  res.render('admin/index');
});

router.get('/signin', function(req, res, next) {
  res.render('user/signin');
});

router.post('/signin', function(req, res, next) {
  Student.findOne({email:req.body.email},function(err,rtn){
    if(err) throw err;
    console.log(rtn,req.body.password);
    if(rtn == null || rtn.password != req.body.password){
      res.redirect('/users/signin')
    }else{
      req.session.users = {email: rtn.email, name: rtn.name, roll: "student"};
      res.redirect('/users/students/home');

    }
  });
});

router.post('/login', function(req, res, next) {
  Teacher.findOne({email:req.body.email},function(err,rtn){
    if(err) throw err;
    console.log(rtn,req.body.password);
    if(rtn == null || rtn.password != req.body.password){
      res.redirect('/users/login')
    }else{
      req.session.users = {email: rtn.email, name: rtn.name, roll: "teacher"};
      res.redirect('/users/teachers/home');

    }
  });
});

router.use('/teachers',auth, teacher);
router.use('/students',auth, student);
router.use('/attendances',auth, attendance);
router.use('/subjects',auth, subject);
router.use('/timetables',auth, timetable)

module.exports = router;
