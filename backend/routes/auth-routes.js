const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {encryptPass, decryptPass} = require('../utilities/bcrypt.js');
const User = require('../database-connection/user-model.js');
const requireLogin = require('../middlewares/requireLogin.js');
const transporter = require('../utilities/nodemailer.js');
const cloudinaryCall = require('../utilities/cloudinary.js');
const {Resend} = require('resend')

router.post('/signup', async (req,res)=>{
try {
    const {firstName,lastName,userName,email,password} = req.body;
  if(!firstName || !lastName || !userName || !email || !password){
    return res.status(400).json({response : `Kindly provide all fields!`})
  }
  const existingUserCheck = await User.findOne({$or : [{email,userName, isDeleted : false}]})
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
  const findUser = await User.findOne({userName,isDeleted:false})
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

router.post("/forgotPassword",async(req,res)=>{
  try {
    const {email} = req.body
    const checkEmail = await User.findOne({
    email,isDeleted:false
  }) 
  if(!checkEmail)return res.status(400).json({response : `Cannot find User with the requested Email. Kindly try again`})
  const token = (Math.random()*10).toString()
  checkEmail.resetPasswordToken = token
  checkEmail.resetPasswordExpiry = Date.now() + 15*60*1000
  await checkEmail.save()
  const url = await cloudinaryCall()
  // console.log(checkEmail,url, `Api key`,process.env.RESEND_API_KEY);
  const resend = new Resend(process.env.RESEND_API_KEY)
  const sentMail = await resend.emails.send({
    from : 'onboarding@resend.dev',
    to : checkEmail.email,
    subject : `Request for Password Reset`,
    html :`<div style="
  background:#fdfaf4;
  padding:40px 0;
  width:100%;
">

  <div style="
    max-width:600px;
    margin:0 auto;
    background:#ffffff;
    border-radius:10px;
    padding:30px;
    font-family:Arial, sans-serif;
    text-align:center;
  ">

    <!-- Logo -->
    <div style="
      font-size:24px;
      font-weight:bold;
      color:#1f2937;
      margin-bottom:20px;
    ">
      <img src=${url} alt="Lancer's CRM"
      style="
    display:block;
    margin:0 auto 20px auto;
    max-width:220px;
    width:100%;
    height:auto;
  ">
    </div>

    <!-- Text -->
    <div style="
      color:#4b5563;
      line-height:1.6;
      margin-bottom:30px;
      font-weight: 900;
    ">
      You requested to reset your password.  
      Click the button below to set a new password.
    </div>

    <!-- Button -->
    <div>
      <a href="${process.env.BASE_URL}/reset-password/${token}"
        style="
          display:inline-block;
          padding:12px 24px;
          background:#ed4343;
          color:#ffffff;
          text-decoration:none;
          border-radius:6px;
          font-size:14px;
          font-weight:600;
        ">
        Reset Password
      </a>
    </div>

  </div>
</div>`
  })
  console.log(`resend response`, sentMail);
  
  // LEAVING THIS HERE AS AN EXAMPLE OF NODEMAILER USECASE...
  // const msg = await transporter.sendMail({
  //   to :checkEmail.email,
  //   subject : `Request for Password Reset`,
  //   html :`Leaving this here...`
  // })
  
  return res.status(200).json({response : `Mail sent Successfully!`, mail : sentMail})
  } catch (error) {
    console.log(error);
    return res.status(500).json({response : `Server Error`})
  }
})

router.post('/reset-password/:token',async(req,res)=>{
  const {token} = req.params
  const {password} = req.body
  const user = await User.findOne({isDeleted : false, resetPasswordToken : token, resetPasswordExpiry : {$gte : new Date()}})
  if(!user)return res.status(200).json({response : `Token Expired!`})
    const hashPass = await encryptPass(password)
    user.password = hashPass
    user.resetPasswordExpiry = undefined
    user.resetPasswordToken = undefined
    user.save()
    return res.status(200).json({response : `Password updated Successfully`})
})

module.exports = router