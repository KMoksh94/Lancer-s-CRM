const cron = require('cron');
const Project = require('../database-connection/project-model');


const overdueProjectsUpdate = new cron.CronJob('00 00 00 * * *', async function (){
  try {
    await Project.updateMany({
    dueDate : {$lt : new Date()},
    status : {$nin : ['Overdue', 'Complete']}
  },{
    $set :{
      status : 'Overdue',
    }})

    await Project.updateMany({
    dueDate : {$lt : new Date()},
      $or : [
      {paymentDate : {$exists : false}},
      {paymentDate : ''},
      {paymentDate : null}
    ]},{
      $set : {
        paymentStatus : 'Overdue'
      }
    })
    console.log(`Overdue Status updated`);
  } catch (error) {
    console.log(error);
  }
},
null,
false,
'Asia/Kolkata')

module.exports = overdueProjectsUpdate