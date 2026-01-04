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
    enum : ['Complete', 'Active', 'Overdue'],
    default : 'Active',
    required : true
  },
  paymentStatus : {
    type : String,
    enum : ['Paid', 'Pending', 'Overdue'],
    default : 'Pending',
    required : true
  },
  dueDate : {
    type : Date,
    required : true
  },
  amount : {
    type : Number,
    required : true,
    min : 0
  },
  paymentDate : {
    type : Date
  },
  description : {
    type : String
  },
  user : {
    type : ObjectId,
    ref : 'User',
    index : true
  },
  isDeleted : {
    type : Boolean,
    default : false
  },
},{
  timestamps : true
})

// compound index for faster query searches when both arguements are used in the same query, 1 for ascending order -1 for descending 
projectSchema.index({user : 1, status : 1})
projectSchema.index({user : 1, paymentStatus : 1})
projectSchema.index({user : 1, paymentStatus : 1, status : 1})
projectSchema.index({ dueDate: 1, status: 1, paymentStatus: 1 })
projectSchema.index({user : 1, clientName : 1})
projectSchema.index({user :1, isDeleted : 1})
projectSchema.index({name :1,clientName :1,user :1})
const Project = mongoose.model('Project', projectSchema)
module.exports = Project