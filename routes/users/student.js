var express = require('express');
var router = express.Router();
var Student = require('../../model/Student');

/* GET home page. */
router.get('/home', function(req, res, next) {
  console.log(req.session.users);
  Student.findOne({email:req.session.users.email},function (err,rtn) {
    if(err) throw err;
    res.render('user/student/home', { title: 'Express' , user: rtn});
  });
});
router.get('/timeTab', function(req, res, next) {
  res.render('user/student/time-table', { title: 'Express' });
});
router.get('/attendance', function(req, res, next) {
  res.render('user/student/attendance', { title: 'Express' });
});
router.get('/calculator', function(req, res, next) {
  res.render('user/student/calculator', { title: 'Express' });
});

module.exports = router;
