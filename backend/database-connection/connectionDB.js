const mongoose = require('mongoose')
async function connectionDB(){
  try {
  await mongoose.connect('mongodb+srv://kmoksh94_db_user:kmoksh123@maincluster.ayyxhns.mongodb.net/')
  console.log(`Server Connected to Database`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectionDB