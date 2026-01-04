import Project from "../database-connection/project-model.js"



const projectMigrate = async ()=> {
  try {
    const allProjects = await Project.find()

    for(const project of allProjects){
      let newStatus = 'Active'
      let paymentStatus = 'Active'

      if(project.status === 'Active'){
        newStatus = 'Active'
      }

      if(project.status === 'Paid'){
        newStatus = 'Complete'
      }

      if(project.status === 'Overdue'){
        if(project.paymentDate == ''){
          newStatus = 'Complete'
        }else if(project.paymentDate != '' && project.dueDate < new Date()){
          newStatus = 'Overdue'
        }
      }

      if(project.paymentDate){
        paymentStatus = 'Paid'
        }
        else if(!project.paymentDate && (project.dueDate > new Date() || project.status === 'Active')){
          paymentStatus = 'Pending'
        }else if(!project.paymentDate && project.dueDate < new Date() && project.status === 'Overdue'){
          paymentStatus = 'Overdue'
        }

        await Project.updateOne({_id : project._id},{
          $set :
            {status : newStatus ,
            paymentStatus}
        })
    }
  } catch (error) {
    console.log(error);
  }
}

export default projectMigrate