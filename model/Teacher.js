var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 var TeacherSchema = new Schema({
   teacher_id:{
   },
   name:{
     type:String,
     require:true,
   },
   email:{
     type: String,
     required:true,
   },
   password:{
     type: String,
     required:true,
   },
   deperment:{
        type: String,
        required:true,
      },
 })
 module.exports =mongoose.model('Teacher',TeacherSchema);
