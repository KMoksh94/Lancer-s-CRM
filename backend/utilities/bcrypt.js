const bcrypt = require('bcrypt')

async function encryptPass(plainPass){
  return await bcrypt.hash(plainPass,10)
}

async function decryptPass(plainPass,hashPass) {
  return await bcrypt.compare(plainPass,hashPass)
}

module.exports = {encryptPass,decryptPass}