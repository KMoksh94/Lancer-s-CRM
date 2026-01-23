const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  userName : {
    type : String,
    required : true,
    unique : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  isDeleted : {
    type : Boolean,
    default : false
  },
  resetPasswordToken : String,
  resetPasswordExpiry : Date,
},
{timestamps : true})

userSchema.index({userName : 1, isDeleted : 1})

const User = mongoose.model("User", userSchema)
module.exports = User