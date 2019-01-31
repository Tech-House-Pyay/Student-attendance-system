var express = require('express');
var router = express.Router();
var Timetable= require('../../model/Timetable');
var Subject= require('../../model/Subject');
/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
});
router.get('/add',function(req,res,next){
  Subject.find({},{'subname': 1, _id: 0, 'subCode': 1}).populate('teacher_id', { name: 1, _id:0}).sort({teacher_id:1}).exec(function (err,rtn) {
    if(err) throw err;
    console.log(typeof rtn);
    console.log(rtn);
    res.render('admin/timetable/time-add',{ title: 'Express', subj: rtn});
  });
 });

router.post('/add',function(req,res,next){
var timetable=new Timetable();
timetable.teacherName=req.body.teacher_id;
timetable.subname=req.body.subname;
timetable.class=req.body.class;
timetable.time=req.body.time;
timetable.day=req.body.day;
timetable.subcode = req.body.subCode;
timetable.save(function(err,rtn){
    if (err)throw err;
    res.redirect('/admin/timetables/list');
  });
});
router.get('/list',function(req,res,next){
  Timetable.find({},function(err,rtn){
    if(err) throw err;
    res.render('admin/timetable/time-list',{subject:rtn});
  });
});
router.get('/time-detail/:id',function(req,res,next){
    Timetable.find({class:req.params.id}).sort({day:1,time:1}).exec(function (err,rtn) {
      if(err) throw err;
      res.render('admin/timetable/time-detail',{subj:rtn});
    });

  });
router.post('/duplicate',function (req,res) {
  Timetable.find({ $and:[{class:req.body.cla},{day: req.body.day},{time: req.body.time}] },function (err,rtn) {
    if(err) throw err;
    if(rtn.length) {
      console.log('have');
      res.json({ status: false, msg: 'Timetable Already inserted!'});
    }
    else {
      console.log('not have');
      res.json({ status: true,msg: 'Timetable inserted!'});
    }
  })
})
module.exports = router;
