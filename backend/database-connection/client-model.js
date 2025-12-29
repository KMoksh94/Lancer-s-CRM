const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const clientSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  companyName : {
    type : String,
    required : true
  },
  email : {
    type : String,
    reuqired : true
  },
  projectList : {
    type : [{type : ObjectId, ref : 'Project'}],
    defualt : []
    },
  notes : {
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
},{timestamps:true})

clientSchema.index({user : 1, companyName : 1})
clientSchema.index({user :1, isDeleted : 1})

const Client = mongoose.model('Client', clientSchema)
module.exports = Client