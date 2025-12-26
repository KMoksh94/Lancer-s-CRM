const mongoose = require('mongoose')
async function connectionDB(){
  try {
  await mongoose.connect(process.env.CONNECTION_LINK)
  console.log(`Server Connected to Database`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectionDB