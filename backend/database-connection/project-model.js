const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const projectSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  clientName : {
    type : ObjectId,
    ref : 'Client'
  },
  status : {
    type : String,
    enum : ['Paid', 'Active', 'Overdue'],
    default : 'Active',
    required : true
  },
  dueDate : {
    type : Date,
    required : true
  },
  amount : {
    type : String,
    required : true
  },
  paymentDate : {
    type : Date
  },
  description : {
    type : String
  },
  user : {
    type : ObjectId,
    ref : 'User'
  }
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project