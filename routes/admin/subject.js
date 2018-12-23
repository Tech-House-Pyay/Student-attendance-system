var express = require('express');
var router = express.Router();
var Subject= require('../../model/Subject');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/add',function(req,res,next){
  res.render('admin/subject/subj-add');
});
router.post('/add',function(req,res,next){
  console.log('call');
  var subject=new Subject();
  // subject.teacher_id=req.body.teacherid;
  subject.subname=req.body.name;
  subject.major=req.body.major;
  subject.year=req.body.year;
  subject.save(function(err,rtn){
    if (err)throw err;
    res.redirect('/admin/subjects/subject-detail/'+rtn._id);
  });

});
router.post('/update',function(req,res,next){
  console.log('call');
  var update={
    name:req.body.subname,
    major:req.body.major,
    year:req.body.year,
  }
    Subject.findByIdAndUpdate(req.body.id,{$set:update},function(err,rtn){
      if(err) throw err;
      console.log(rtn);
      res.redirect('/admin/subjects/subject-detail/'+rtn._id);
    });

});
router.get('/update/:id',function(req,res,next){
  console.log('call');
  Subject.findById(req.params.id,function (err,rtn) {
    if(err)throw err;
    console.log(rtn);
    res.render('admin/subject/subject-update',{subject:rtn});

  });
});
router.get('/subject-detail/:id',function(req,res,next){
  Subject.findById(req.params.id,function(err,rtn){
    if (err) throw err;
    console.log(rtn);
    res.render('admin/subject/subject-detail',{subject:rtn});
  });
});
router.get('/list',function(req,res,next){
  Subject.find({},function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('admin/subject/subject-list',{subject:rtn});
  });
});
router.get('/delete/:id',function (req,res,next) {
  Subject.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.redirect('/admin/subjects/list/');

  });

});
module.exports = router;
