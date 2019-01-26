var express = require('express');
var router = express.Router();
// var Student = require('../model/Student');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('user/login');
});

router.get('/', function(req, res, next) {
  res.render('index');
});



module.exports = router;
