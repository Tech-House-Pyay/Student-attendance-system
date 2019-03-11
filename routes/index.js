var express = require('express');
var router = express.Router();

var Student = require('../model/Student');
var Teacher = require('../model/Teacher');
var Admin = require('../model/Admin');

/* GET home page. */

router.get('/', function(req, res, next) {
  Student.count({$or:[{class:'1csta'},{class:'1cstb'},{class:'1cstc'}]},function(err,rtn){
    if(err) throw err;
    console.log('CST ',rtn);
    Student.count({$or:[{class:'2ct'},{class:'3ct'},{class:'4ct'},{class:'5ct'}]},function(err2,rtn2){
      if(err2) throw err2;
      Student.count({$or:[{class:'2csa'},{class:'2csb'},{class:'3csa'},{class:'3csb'},{class:'4csa'},{class:'4csb'},{class:'5csa'},{class:'5csb'}]},function(err3,rtn3){
        if(err3) throw err3;
        Teacher.count({deperment:'software'},function (err4,rtn4) {
          if(err4) throw err4;
          Teacher.count({deperment:'physic'},function (err5,rtn5) {
            if(err5) throw err5;
            Teacher.count({deperment:'maths'},function (err6,rtn6) {
              if(err6) throw err6;
              Teacher.count({deperment:'hardware'},function (err7,rtn7) {
                if(err7) throw err7;
                Teacher.count({deperment:'english'},function (err8,rtn8) {
                  if(err8) throw err8;
                  Teacher.count({deperment:'myanmar'},function (err9,rtn9) {
                    if(err9) throw err9;
                    Teacher.count({deperment:'is'},function (err10,rtn10) {
                      if(err10) throw err10;
                      Teacher.count({deperment:'applicaton'},function (err11,rtn11) {
                        if(err11) throw err11;
          res.render('home', { title: 'Express', cst: rtn, ct: rtn2, cs:rtn3, software:rtn4,physic:rtn5,maths:rtn6,hardware:rtn7,english:rtn8,myanmar:rtn9,is:rtn10,applicaton:rtn11});
        });
      });
    });
  });
      });
    });
      });
    });
    });
  });
});
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
