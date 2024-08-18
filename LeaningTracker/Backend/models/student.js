const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the student
const studentSchema = new Schema({
  basicInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{type:String, required:true},
    phone: { type: Number},
    address: { type: String },
    startDate:{type:Date, default:new Date()}
  },
  degree: {
    courseName: { type: String, default:""},
    college: { type: String,default:"" },
    startDate: { type: Date},
    endDate: { type: Date}
  },
  learnings: [
    {
      image: { type:String},
      title:{type:String},
      description:{type:String},
      // uploadDate: { type: Date}
    }
  ], 

  role:{
    type:String,
    default:"student"
  },
  isVerified:{
    type:Boolean,
    default:false,
  },
  profile:{type:String},
  certificate:{type:String},
  isCertified:{type:Boolean, default:false}

}, {
//   timestamps: true
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
