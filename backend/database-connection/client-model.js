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
  projectList : [
    {
      type : ObjectId,
      ref : 'Project'
    }
  ],
  notes : {
    type : String
  },
  user : {
    type : ObjectId,
    ref : 'User'
  }
})

const Client = mongoose.model('Client', clientSchema)
module.exports = Client