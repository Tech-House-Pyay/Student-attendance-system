var express = require('express');
var router = express.Router();
var Student = require('../model/Student');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('user/login');
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
      req.session.users = {email: rtn.email, name: rtn.name};
      res.redirect('/users/students/home');

    }
  });
});

module.exports = router;
