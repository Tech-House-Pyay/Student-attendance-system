var express = require('express');
var router = express.Router();
var Teacher = require('../../model/Teacher');
var Timetable = require('../../model/Timetable');
var Subject = require('../../model/Subject');
var Student = require('../../model/Student');
var Attendance = require('../../model/Attendance');
var _ = require('underscore');

/* GET home page. */
router.get('/home', function(req, res, next) {
  Teacher.findOne({email:req.session.users.email},function (err,rtn) {
    if(err) throw err;
    res.render('user/teacher/home', { title: 'Express' , user: rtn});
  });
});

router.get('/timeTab', function(req, res, next) {
  Timetable.find({teacherName:req.session.users.name},function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('user/teacher/time-table', { title: 'Express', subj:rtn});
  });
});

router.get('/callAtt', function(req, res, next) {
  var d =  new Date()
  var dayNow = d.getDay().toString();
  Timetable.find({ $and:[{teacherName: req.session.users.name},{day:dayNow}]},function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('user/teacher/call-att', { title: 'Express', subj: rtn });
  });
});

router.get('/manageAtt', function(req, res, next) {
  Timetable.aggregate([
    {$match:{teacherName: req.session.users.name}},
    {$group:{_id:'$class', subj:{$push: "$subname"}}}
    ],function (err,rtn) {
    if(err) throw err;
    var data = {};
    for (var i = 0; i < rtn.length; i++) {
      rtn[i].subj = _.uniq(rtn[i].subj);
    }
    res.render('user/teacher/manage-att', { title: 'Express', sub: rtn});
  })

});

router.get('/manage/:id', function(req, res, next) {
  console.log(req.query.sub,req.session.users.id);
  Attendance.find({$and:[{subjectName:req.query.sub},{teacher_id:req.session.users.id}]},function (err,rtn) {
    if(err) throw err;
    Student.find({class:req.params.id},function(err2,rtn2){
      if(err2) throw err2;
      res.render('user/teacher/manage', { title: 'Express', stu: rtn2, data: rtn, subj: req.query.sub, cla :req.params.id});
    });
  });
});

router.get('/calling/:id', function(req, res, next) {
  Student.find({class: req.params.id},function (err,rtn) {
    if(err) throw err;
    console.log(req.query.sub);
    res.render('user/teacher/calling-att', { title: 'Express', stu: rtn, sub:req.query.sub });
  });
});

router.post('/calling', function(req, res, next) {
  var client = '&'+req.body.attendance;
  var obj = client.split("&roll=");
  var list = [];
  for(var i = 1; i< obj.length; i++){
    list.push(obj[i])
  }
  console.log(list);
  console.log(req.body.stuclass , req.body.sub);
  Student.find({class:req.body.stuclass},function (err,rtn) {
    if(err) throw err;
    var m = new Date();
    var month = m.getMonth();
    var day = m.getDay();
    for(var j = 0; j < rtn.length; j++){
      var attendance = new Attendance();
      attendance.teacher_id = req.session.users.id;
      attendance.subjectName = req.body.sub;
      attendance.student_id = rtn[j]._id;
      attendance.month = month;
      attendance.day = day;
      attendance.attendance_count = (_.contains(list,rtn[j]._id.toString()))? 1 : 0;
      attendance.save(function (err2,rtn2) {
        if(err2) throw err2;
      });
    }
    res.json({status: true})
  })

});

module.exports = router;
