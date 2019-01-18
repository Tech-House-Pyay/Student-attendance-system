var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('user/login');
});

router.get('/signin', function(req, res, next) {
  res.render('user/signin');
});

module.exports = router;
