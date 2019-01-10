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

  router.get('/atten-detail/:id',function(req,res,next){
  Attendace.findById(req.params.id,function(err,rtn){
      if(err) throw err;
      console.log(rtn);
        res.render('admin/users/attendance/atten-detail');
  });
  });
  router.get('/add',function(req,res,next){
    res.render('admin/attendance/atten-add');
  });
  router.post('/add',function (req,res,next) {
    res.redirect('/admin/attendance/add');

  });

module.exports = router;
