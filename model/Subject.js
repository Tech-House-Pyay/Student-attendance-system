var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubSchema=new Schema({
  teacher_id:{
    type:Schema.Types.ObjectId,
    ref:'Teacher',
  },
  subname:{
    type:String,
    require:true,
  },
  subCode:{
    type:String,
    require:true,
  },
  major:{
    type:String,
    require:true,
  },
  year:{
    type:String,
    require:true,
  },
});
module.exports=mongoose.model('Subject',SubSchema);
