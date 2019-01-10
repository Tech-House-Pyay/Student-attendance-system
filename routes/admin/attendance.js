var express = require('express');
var router = express.Router();
var Attendance= require('../../model/Attendance');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

});

router.get('/attendancelist',function(req,res,next){
Attendance.find({}, function(err,rtn){
    if(err) throw err;
    console.log(rtn);
  res.render('admin/attendance/atten-studentdetail');
});
});

router.get('/studentdetail',function(req,res,next){
Attendance.find({}, function(err,rtn){
    if(err) throw err;
    console.log(rtn);
  res.render('admin/attendance/atten-listdetail');
});
});


module.exports = router;
