const cron = require('cron')
const Project = require('../database-connection/project-model')
const Client = require('../database-connection/client-model')


const scheduleDelete = new cron.CronJob('0 0 0 * * 1', async function (){
  // runs every monday
  try {
     const today = new Date()
  const twoWeeksAgo = new Date()
  twoWeeksAgo.setDate(twoWeeksAgo.getDate()-14)

  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate()-7)
  const deletedProjects = await Project.deleteMany({isDeleted : true,updatedAt : {
    $lte : oneWeekAgo,
    $gte : twoWeeksAgo
  } })

  const deletedClients = await Client.deleteMany({isDeleted:true, updatedAt : {
    $gte : twoWeeksAgo,
    $lte : oneWeekAgo
  }})

  console.log(`Clients deleted - ${deletedClients.deletedCount}, Projects Deleted - ${deletedProjects.deletedCount}`);
  
  } catch (error) {
    console.log(error);
  }
},
null,false,'Asia/Kolkata')

module.exports = scheduleDelete