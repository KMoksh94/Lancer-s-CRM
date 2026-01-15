const express = require('express');
const Project = require('../database-connection/project-model');
const Client = require('../database-connection/client-model');
const requireLogin = require('../middlewares/requireLogin');
const router = express.Router()


// AMOUNT PAISE MAIN RAKHNA HAI. BACKEND ME PAISE MAIN HI STORE HOGA FOR AVOIDING FLOATING PRECISION ISSUES. FRONTEND MAIN 100 SE DIVIDE KARNA MAT BHOOLNA


router.post('/add-project',requireLogin,async(req,res)=> {
try {
  const {name,clientName,status,paymentStatus,dueDate,amount,paymentDate,description} = req.body;
const pushData = {}
if(!name || !dueDate || !amount || !clientName)
  return res.status(400).json({response : `Kindly provide the required fields!`})
const findProject = await Project.findOne({name,clientName,user:req.user._id})
if(findProject)return res.status(400).json({response : `Project Exists for the same client!`})
  const checkClientId = await Client.findOne({_id : clientName, user : req.user._id, isDeleted :false})
if(!checkClientId)return res.status(400).json({response :`Wrong Client Id. Kindly check the client Id`})
  if(name){pushData.name = name}
  if(clientName){pushData.clientName = clientName}
  pushData.status = status || 'Active'
  if(dueDate){pushData.dueDate=new Date(dueDate)}
  if(paymentStatus){pushData.paymentStatus = paymentStatus}
  if(paymentDate){pushData.paymentDate = new Date(paymentDate)}
  if(description){pushData.description = description}
  if(amount){pushData.amount = amount}
  pushData.user = req.user._id
  if(new Date(dueDate) < new Date() && ((paymentStatus === 'Pending' || paymentStatus === 'Overdue') || status !== 'Complete')){pushData.status = 'Overdue'} 

  const project = new Project(pushData)
  await project.save() 
  const updateClientProjectList = await Client.findOneAndUpdate({_id : clientName, user : req.user._id, isDeleted : false}, {$addToSet : {projectList : project._id}})
  return res.status(201).json({response : `Project Successfully Created!`, project})
} catch (error) {
  console.log(error);
  return res.status(500).json({response : `Internal Server Error`})
}
})

router.post('/edit-project', requireLogin,async(req,res)=>{
  try {
    
  } catch (error) {
    console.log(error);
  return res.status(500).json({response : `Internal Server Error`})
  }
})

router.get('/project-details/:projectId',requireLogin,async(req,res)=>{
try {
  const {projectId} = req.params
  const requiredProject = await Project.findOne({_id : projectId, user : req.user._id, isDeleted : false}).populate("clientName")
  if(!requiredProject)return res.status(400).json({response : `Project Not Found. Kindly check the Id again!`})
    return res.status(200).json({response : `Project successfully found!`, project : requiredProject})
} catch (error) {
  console.log(error);
  return res.status(500).json({response : `Internal Server Error`})
}
})

router.get('/delete-project/:projectId',requireLogin,async(req,res)=>{
  try {
    const {projectId} = req.params
    const requiredProject = await Project.findOne({_id : projectId, user: req.user._id, isDeleted : false})
    if(!requiredProject)return res.status(400).json({response : `Project Not Found!`})
    const updatedProject = await Project.findOneAndUpdate({_id : projectId,user : req.user._id, isDeleted : false}, {isDeleted : true}, {new : true})
    return res.status(200).json({response : `Project Successfully Deleted!`, project : updatedProject })
  } catch (error) {
  console.log(error);
  return res.status(500).json({response : `Internal Server Error`})
  }
})

router.post('/status-update/:projectId',requireLogin,async(req,res)=> {
  try {
    // this will update status as well as paymentDate
  const {status,paymentStatus,paymentDate}=req.body
  const {projectId} = req.params
  if(!status && (!paymentStatus || !paymentDate))return res.status(400).json({response : `No Status provided for update!`})
    const updateData = {}
  if(status){updateData.status = status}
  if(paymentStatus){
    updateData.paymentStatus = paymentStatus
    updateData.paymentDate = paymentDate || new Date()}
  const requiredProject = await Project.findOne({_id : projectId, user : req.user._id, isDeleted : false})
  if(!requiredProject)return res.status(400).json({response : `Project not found! Kindly check user or project.`})
    console.log(updateData);
  const updatedProject = await Project.findOneAndUpdate({_id : requiredProject._id},{$set : updateData}, {new : true})
    return res.status(200).json({response : `Project Successfully Updated!`, project : updatedProject})
  } catch (error) {
  console.log(error);
  return res.status(500).json({response : `Internal Server Error`})
  }
})

router.get('/all-projects',requireLogin, async(req,res)=> {
try {
  const projectList = await Project.find({user : req.user._id,isDeleted:false}).populate("clientName").sort({dueDate : 1})
    return res.status(200).json({response : `Projects recieved successfully!`, projectList})
} catch (error) {
  console.log(error);
  return res.status(500).json({response : `Internal Server Error`})
}
})

router.get('/recent-projects',requireLogin,async(req,res)=>{
  try {
    const requiredProjects = await Project.find({user : req.user._id, isDeleted : false}).populate({path : 'clientName', select : 'name companyName'}).sort({updatedAt : -1}).limit(5)
    return res.status(200).json({response : `Recent projects fetched successfully!`, projectList : requiredProjects})
  } catch (error) {
   console.log(error);
  return res.status(500).json({response : `Internal Server Error`}) 
  }
})


router.get('/dashboard-charts-data/:chartType/:months',requireLogin,async(req,res)=>{
  try {
    const {chartType,months} = req.params
    const today = new Date()
    const monthsAgo = new Date(today.getFullYear(),today.getMonth() - months-1,1)
    const query = {
      user : req.user._id,
      isDeleted : false
    }
    chartType == 'bar' ? query.paymentDate = {$gte : monthsAgo} : chartType == 'pie' ? query.createdAt = {$gte : monthsAgo} : '' 
    const requiredProjects = await Project.find(query)
    return res.status(200).json({response : `Fetched Successfully`, projects : requiredProjects})
  } catch (error) {
  console.log(error);
  return res.status(500).json({response : `Internal Server Error`})
  }
})


router.get('/client-charts-data/:clientId/:months',requireLogin,async(req,res)=>{
  try {
    const {clientId,months} = req.params
    const today = new Date()
    const monthsAgo = new Date(today.getFullYear(),today.getMonth() - (months-1),1)
    const requiredProjects = await Project.find({user : req.user._id, isDeleted : false, clientName : clientId, createdAt : {
      $gte : monthsAgo
    }})
    return res.status(200).json({response : `Fetched Successfully`, projects : requiredProjects})
  } catch (error) {
  console.log(error);
  return res.status(500).json({response : `Internal Server Error`})
  }
})

router.get('/top-data',requireLogin,async(req,res)=>{
  try {
    const today = new Date()
    monthAgo = new Date(today.getFullYear(),today.getMonth(),1)
    const totalClients = await Client.find({user : req.user._id,isDeleted : false}).countDocuments()
    const activeProjects = await Project.find({user : req.user._id,isDeleted : false, status : 'Active'}).countDocuments()
    const overduePayments = await Project.find({user : req.user._id,isDeleted : false, paymentStatus : 'Overdue'}).countDocuments()
    const monthAmountList = await Project.find({user : req.user._id,isDeleted : false, paymentStatus : 'Paid', paymentDate : {$gte : monthAgo}})
    const amount = monthAmountList.reduce((acc,curVal)=>acc + curVal.amount,0)
    return res.status(200).json({response : `Fetched Successfully`, clients : totalClients,active : activeProjects,overdue : overduePayments, amount : amount/100}) 
  } catch (error) {
  console.log(error);
  return res.status(500).json({response : `Internal Server Error`})    
  }
})


module.exports = router