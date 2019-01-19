var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('user/teacher/home', { title: 'Express' });
});

router.get('/timeTab', function(req, res, next) {
  res.render('user/teacher/time-table', { title: 'Express' });
});

router.get('/callAtt', function(req, res, next) {
  res.render('user/teacher/call-att', { title: 'Express' });
});

router.get('/manageAtt', function(req, res, next) {
  res.render('user/teacher/manage-att', { title: 'Express' });
});

module.exports = router;
