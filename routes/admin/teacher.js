var express = require('express');
var router = express.Router();
var Teacher = require('../../model/Teacher');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add',function(req,res,next){
  res.render('admin/users/teacher/teacher-add',{title:'Express'});
});

router.post('/add',function(req,res,next){
var teacher =new Teacher();
teacher.name=req.body.teaname;
teacher.email=req.body.teaemail;
 teacher.password=req.body.teapwd;
 teacher.deperment=req.body.teadep;
  teacher.save(function(err,rtn){
   if(err) throw err;
   res.redirect('/admin/teachers/teacher-detail/'+rtn._id);
   console.log(teacher);
 });
 });

 router.get('/teacher-detail/:id',function(req,res,next){
 Teacher.findById(req.params.id,function(err,rtn){
     if(err) throw err;
     console.log(rtn);
       res.render('admin/users/teacher/teacher-detail',{teacher:rtn});
 });
 });

 router.post('/update', function(req,res,next){
   console.log('call');
   var update={
     name: req.body.teaname,
     email: req.body.teaemail,
     password: req.body.teapwd,
   deperment: req.body.teadep,
  }
     Teacher.findByIdAndUpdate(req.body.id,{$set: update},function(err,rtn){
     if(err) throw err;
   console.log(rtn);
   res.redirect('/admin/teachers/teacher-detail/'+rtn._id);
   });
 });


 router.get('/update/:id',function(req,res,next){
   console.log('calls ');
Teacher.findById(req.params.id,function(err,rtn){
     if(err) throw err;
     console.log(rtn);
       res.render('admin/users/teacher/teacher-update',{teacher:rtn});
 });
 });
 router.get('/list',function(req,res,next){
 Teacher.find({}, function(err,rtn){
     if(err) throw err;
     console.log(rtn);
   res.render('admin/users/teacher/teacher-list',{teacher:rtn});
 });
 });

 router.get('/delete/:id',function(req,res,next){
 Teacher.findByIdAndRemove(req.params.id,function (err,rtn) {
   if (err) throw err;
   console.log(rtn);
   res.redirect('/admin/teachers/list/');
 });
 });
module.exports = router;
