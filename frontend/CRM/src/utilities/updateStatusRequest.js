import apiCall from "./axios"

 const updateStatusRequest = async(projectId,updateStatus)=>{
    console.log(updateStatus)
    const response = await apiCall.post(`/projects/status-update/${projectId}`,updateStatus)
    alert('Project Updated Successfully')
  }

export default updateStatusRequest