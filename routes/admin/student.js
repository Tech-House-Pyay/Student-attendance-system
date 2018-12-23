var express = require('express');
var router = express.Router();
var Student= require('../../model/Student');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

 router.get('/add',function(req,res,next){
   res.render('admin/users/student/student-add',{title:'Express'});
 });

 router.post('/add',function(req,res,next){
var student =new Student();
  student.name=req.body.stuname;
  student.email=req.body.stuemail;
  student.password=req.body.stupwd;
  student.major=req.body.stumajor;
  student.year=req.body.stuyear;
  student.roll=req.body.sturoll;
  student.class=req.body.stuclass;
  student.save(function(err,rtn){
    if(err) throw err;
    res.redirect('/admin/students/student-detail/'+rtn._id);
    console.log(student);
  });
  });

  router.get('/student-detail/:id',function(req,res,next){
  Student.findById(req.params.id,function(err,rtn){
      if(err) throw err;
      console.log(rtn);
        res.render('admin/users/student/student-detail',{student:rtn});
  });
  });

  router.post('/update', function(req,res,next){
    console.log('call');
    var update={
      name: req.body.stuname,
      email: req.body.stuemail,
      password: req.body.stupwd,
    major: req.body.stumajor,
      year:req.body.stuyear,
     roll: req.body.sturoll,
     class: req.body.stuclass,
   }
      Student.findByIdAndUpdate(req.body.id,{$set: update},function(err,rtn){
      if(err) throw err;
    console.log(rtn);
    res.redirect('/admin/students/student-detail/'+rtn._id);
    });
  });


  router.get('/update/:id',function(req,res,next){
    console.log('calls ');
  Student.findById(req.params.id,function(err,rtn){
      if(err) throw err;
      console.log(rtn);

        res.render('admin/users/student/student-update',{student:rtn});
  });
  });

  router.get('/list',function(req,res,next){
  Student.find({}).sort({roll:1}).exec(function(err,rtn){
      if(err) throw err;
      console.log(rtn);
    res.render('admin/users/student/student-list',{student:rtn});
  });
  });

  router.get('/delete/:id',function(req,res,next){
  Student.findByIdAndRemove(req.params.id,function (err,rtn) {
    if (err) throw err;
    console.log(rtn);
    res.redirect('/admin/students/list/');

  });
  });

module.exports = router;
