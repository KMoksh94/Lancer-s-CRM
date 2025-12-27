const jwt = require('jsonwebtoken')

module.exports = async function requireLogin(req,res,next){
  const {authorization} = req.headers
  if(!authorization){res.status(401).json({response : `Unauthorized. Kindly login in again`})}
  const token = authorization.replace('Bearer ', "")
  try {
    const isVerfiedUser = jwt.verify(token,process.env.JWT_KEY)
    console.log(isVerfiedUser.user);
    req.user = isVerfiedUser.user
    next()
  } catch (error) {
    console.log(error);
    res.status(400).json({response : `Error on server side`})
  }
}