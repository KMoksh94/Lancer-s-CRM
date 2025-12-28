const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {encryptPass, decryptPass} = require('../utilities/bcrypt.js');
const User = require('../database-connection/user-model.js');
const requireLogin = require('../middlewares/requireLogin.js');

router.post('/signup', async (req,res)=>{
try {
    const {firstName,lastName,userName,email,password} = req.body;
  if(!firstName || !lastName || !userName || !email || !password){
    return res.status(400).json({response : `Kindly provide all fields!`})
  }
  const existingUserCheck = await User.findOne({$or : [{email,userName}]})
  if(existingUserCheck){return res.status(409).json(`User already exists`)}
  const hashPass = await encryptPass(password)
  const user = new User({firstName, lastName,userName,email, password : hashPass})
  await user.save()
  return res.status(201).json({response : `User Created Successfully`})
} catch (error) {
  console.log(error);
}
})

router.post('/login', async (req,res)=> {
  try {
    const {userName,password} = req.body
  if(!userName || !password){return res.status(400).json({response : `Kindly provide all the fields!`})}
  const findUser = await User.findOne({userName})
  if(!findUser){return res.status(401).json({response : `User not found`})}
  const plainPass = await decryptPass(password, findUser.password)
  if(!plainPass){return res.status(401).json({response : `Incorrect Password!`})}
  findUser.password = undefined
  const token = jwt.sign({
    // exp: Math.floor(Date.now() / 1000) + (60 * 60 *24),
    user : findUser},
    process.env.JWT_KEY)
  return res.status(200).json({response : `User successfully logged in!`, token, user : findUser})
  } catch (error) {
    console.log(error);
  }
})

router.get('/getUser', requireLogin, async(req,res)=> {
  return res.status(200).json({response : req.user})
})


module.exports = router