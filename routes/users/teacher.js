var express = require('express');
var router = express.Router();
var Teacher = require('../../model/Teacher');

/* GET home page. */
router.get('/home', function(req, res, next) {
  Teacher.findOne({email:req.session.users.email},function (err,rtn) {
    if(err) throw err;
    res.render('user/teacher/home', { title: 'Express' , user: rtn});
  });
});

router.get('/timeTab', function(req, res, next) {
  res.render('user/teacher/time-table', { title: 'Express' });
});

router.get('/callAtt', function(req, res, next) {
  res.render('user/teacher/call-att', { title: 'Express' });
});

router.get('/manageAtt', function(req, res, next) {
  res.render('user/teacher/manage-att', { title: 'Express' });
});

router.get('/manage', function(req, res, next) {
  res.render('user/teacher/manage', { title: 'Express' });
});

router.get('/calling', function(req, res, next) {
  res.render('user/teacher/calling-att', { title: 'Express' });
});

router.post('/calling', function(req, res, next) {
  var client = '&'+req.body.attendance;
  var obj = client.split("&roll=");
  var list = [];
  for(var i = 1; i< obj.length; i++){
    list.push(obj[i])
  }
  console.log(list);
  // res.send(obj);
});

module.exports = router;
