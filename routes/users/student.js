var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var Student = require('../../model/Student');
var Timetable = require('../../model/Timetable');
var Attendance = require('../../model/Attendance');

/* GET home page. */
router.get('/home', function(req, res, next) {
  console.log(req.session.users);
  Student.findOne({email:req.session.users.email},function (err,rtn) {
    if(err) throw err;
    res.render('user/student/home', { title: 'Express' , user: rtn});
  });
});
router.get('/timeTab', function(req, res, next) {
  Timetable.find({class:req.session.users.cla}).sort({day:1,time:1}).exec(function (err,rtn) {
    if(err) throw err;
    res.render('user/student/time-table', { title: 'Express',subj:rtn });
});
});
router.get('/attendance', function(req, res, next) {
    Attendance.aggregate([{$match:{student_id: ObjectId(req.session.users.id)}},{$group:{_id:{sub:'$subjectName',month:'$month'},count:{$sum:"$attendance_count"},tolC:{$sum:'$total_count'}}}],function (err2,rtn2) {
      if(err2) throw err2;
      console.log('aa',rtn2);
      Timetable.aggregate([{$match:{class:req.session.users.cla}},{$group:{_id:'null',subj: { $addToSet: "$subname"} }}],function (err,rtn) {
        if(err) throw err;
        console.log('bb',rtn[0].subj);
        res.render('user/student/attendance', { title: 'Express',subj:rtn[0].subj, data:rtn2,name: req.session.users.name});
      });
    });

});
router.get('/calculator', function(req, res, next) {
  res.render('user/student/calculator', { title: 'Express' });
});

module.exports = router;
