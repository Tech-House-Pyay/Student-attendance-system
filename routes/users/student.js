var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('user/student/home', { title: 'Express' });
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
