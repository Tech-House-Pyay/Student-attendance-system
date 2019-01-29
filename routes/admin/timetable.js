var express = require('express');
var router = express.Router();
var Timetable= require('../../model/Timetable');
var Subject= require('../../model/Subject');
/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
});
router.get('/add',function(req,res,next){
  Subject.find({},{'subname': 1, _id: 0}).populate('teacher_id', { name: 1, _id:0}).exec(function (err,rtn) {
    if(err) throw err;
    console.log(typeof rtn);
    console.log(rtn);
    res.render('admin/timetable/time-add',{ title: 'Express', subj: rtn});
  });
 });

router.post('/add',function(req,res,next){
var timetable=new Timetable();
timetable.teacher_id=req.body.teacherid;
timetable.subname=req.body.name;
timetable.class=req.body.class;
timetable.time=req.body.time;
timetable.day=req.body.day;
timetable.save(function(err,rtn){
    if (err)throw err;
    res.redirect('/admin/timetables/time-detail/'+rtn._id);
  });
});
router.get('/list',function(req,res,next){
  Timetable.find({},function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('admin/timetable/time-list',{subject:rtn});
  });
});
router.get('/time-detail',function(req,res,next){
    res.render('admin/timetable/time-detail');
  });
module.exports = router;
