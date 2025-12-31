const express = require('express')
const Client = require('../database-connection/client-model')
const requireLogin = require('../middlewares/requireLogin')
const router = express.Router()


router.get('/all-clients', requireLogin,async(req,res)=> {
  try {
  const allClients = await Client.find({user : req.user._id, isDeleted: false})
  return res.status(200).json({response : `Fetched Successfully`, clients : allClients})  
  } catch (error) {
  console.log(error);
  return res.status(500).json({error : `Internal Server Error`})
  }
})

// is deleted waala client dubara add ho to uska edge case add-client main add karna baaki hai

router.post('/add-client', requireLogin,async(req,res)=>{
try {
  const {name,companyName,email,notes} = req.body
  if(!name || !companyName || !email){return res.status(400).json({response : `Kindly provide all the required fields!`})}
  const findClient = await Client.findOne(
    {$or : [
      {name,companyName},  //ye and ka shortform hai
      {email}
    ]})
  if(findClient){return res.status(400).json({response : `A client with this name from same company or email already exists`})}
  const client = new Client({name,companyName,email,notes, user:req.user._id})
  await client.save()
  return res.status(201).json({response : `Client successfully created!`,client})
} catch (error) {
  console.log(error);
  return res.status(500).json({error : `Internal Server Error`})
}
})

router.post('/edit-client/:clientId', requireLogin, async(req,res)=> {
  try {
  const {clientId} = req.params
  const {name,companyName,email,notes} = req.body
  const updateData = {}
  if(name){updateData.name = name}
  if(companyName){updateData.companyName = companyName}
  if(email){updateData.email = email}
  if(notes){updateData.notes = notes}
  if(!clientId){return res.status(400).json({response : `Kindly provide Client Id!`})}
  const requiredClient = await Client.findOne({_id:clientId, user: req.user._id, isDeleted : false})
  if(!requiredClient){return res.status(400).json({response : `User does not have any client with such Id!`})}
  const findClient = await Client.findOne(
    {user : req.user._id,
      _id : {$ne : clientId},
      $or : [
      {name,companyName},  //ye and ka shortform hai
      {email}
    ]})
  if(findClient){return res.status(400).json({response : `A client with this name from same company or email already exists`})}
  const updateClient = await Client.findOneAndUpdate({_id:clientId, user: req.user._id, isDeleted : false},
    updateData,
  {new : true})
  return res.status(200).json({response : `Client Updated Successfully!`, client : updateClient})
  } catch (error) {
    console.log(error);
    return res.status(500).json({error : `Internal Server Error`})
  }
})


router.get('/delete-client/:clientId', requireLogin, async(req,res)=> {
try {
    const {clientId} = req.params
    const findClient = await Client.findOne({_id:clientId, user : req.user._id})
    if(!findClient){return res.status(400).json({response : `Client not found. Kindly check the Id and try again!`})}
    const requiredClient = await Client.findOneAndUpdate({_id:clientId,user:req.user._id}, {isDeleted : true})
    // related projects bhi delete karna hai abhi
    return res.status(200).json({response : `Client successfully deleted!`})
} catch (error) {
  console.log(error);
  return res.status(500).json({error : `Internal Server Error`})
}
})

router.get('/client-details/:clientId', requireLogin, async(req,res)=>{
try {
  const {clientId} = req.params
  const requiredClient = await Client.findOne({
    _id : clientId, user : req.user._id, isDeleted : false
  })
  // need to get all the projects as well
  return res.status(200).json({response : `Client found successfully`, client : requiredClient})
} catch (error) {
  console.log(error);
  return res.status(500).json({error : `Internal Server Error`})
}
})

module.exports = router