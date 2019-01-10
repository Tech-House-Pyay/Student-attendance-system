var express = require('express');
var router = express.Router();
var Attendance= require('../../model/Attendance');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

});


  router.get('/atten-detail/:id',function(req,res,next){
  Attendace.findById(req.params.id,function(err,rtn){
      if(err) throw err;
      console.log(rtn);
        res.render('admin/users/attendance/atten-detail');
  });
  });

module.exports = router;
