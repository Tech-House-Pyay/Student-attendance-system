var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 var StudentSchema = new Schema({
   name:{
     type: String,
     required:true,
   },
   email:{
     type: String,
     required:true,
     unique:true,
   },
   password:{
     type: String,
     required:true,
   },
   major:{
     type:String,
     required:true,
   },
  year:{
     type: String,
     required:true,
   },
  roll:{
     type: Number,
     required:true,

   },
class:{
  type: String,
  required: true,
},
 })
module.exports =mongoose.model('Student',StudentSchema);
