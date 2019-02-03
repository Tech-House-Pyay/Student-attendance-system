var express = require('express');
var router = express.Router();

var Student = require('../model/Student');
var Teacher = require('../model/Teacher');
var Admin = require('../model/Admin');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('user/login');
});

router.get('/signin', function(req, res, next) {
  res.render('user/signin');
});

router.get('/adsignin', function(req, res, next) {
  res.render('admin/adSignIn');
});

router.get('/signup', function(req, res, next) {
  res.render('admin/signup',{key:'security123'});
});

router.post('/signup', function(req, res, next) {
  var admin = new Admin();
  Admin.findOne({email:req.body.email},function(err,rtn){
    if(err) throw err;
    if(rtn == null){
      admin.name = req.body.name;
      admin.email = req.body.email;
      admin.password = req.body.password;
      admin.save(function (err2,rtn2) {
        if(err2) throw err2;
        res.redirect('/adsignin');
      })
    }else{
      res.redirect('/signup');
    }
  });
});


router.post('/signin', function(req, res, next) {
  Student.findOne({email:req.body.email},function(err,rtn){
    if(err) throw err;
    console.log(rtn,req.body.password);
    if(rtn == null || rtn.password != req.body.password){
      res.redirect('/signin')
    }else{
      req.session.users = {email: rtn.email, name: rtn.name, roll: "student", cla: rtn.class, id:rtn._id};
      res.redirect('/users/students/home');

    }
  });
});

router.post('/adsignin', function(req, res, next) {
  Admin.findOne({email:req.body.email},function(err,rtn){
    if(err) throw err;
    console.log(rtn,req.body.password);
    if(rtn == null || rtn.password != req.body.password){
      res.redirect('/adsignin')
    }else{
      req.session.users = {email: rtn.email, name: rtn.name, roll: "admin"};
      res.redirect('/admin/');

    }
  });
});

router.post('/login', function(req, res, next) {
  Teacher.findOne({email:req.body.email},function(err,rtn){
    if(err) throw err;
    console.log(rtn,req.body.password);
    if(rtn == null || rtn.password != req.body.password){
      res.redirect('/login')
    }else{
      req.session.users = {email: rtn.email, name: rtn.name, roll: "teacher", id: rtn._id};
      res.redirect('/users/teachers/home');

    }
  });
});
module.exports = router;
