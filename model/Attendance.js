var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 var AttendanceSchema = new Schema({
   teacher_id:{
     type:Schema.Types.ObjectId,
     ref:'Teacher',
   },
   subject_id:{
     type:Schema.Types.ObjectId,
     ref:'Subject',
   },
 student_id:{
     type:Schema.Types.ObjectId,
     ref:'Student',
   },

   month:{
     type:String,
     require:true,
   },
   day:{
     type:String,
     require:true,
   },
   inserted:{
     type:Date,
     default:Date.now
   },
   attendance_count:{
     type:String,
     require:true,
   },
   total_count:{
     type:String,
     require:true,
   },

 });
module.exports =mongoose.model('Attendance',AttendanceSchema);
