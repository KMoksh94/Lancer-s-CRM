import apiCall from "./axios"

 const updateStatusRequest = async(projectId,updateStatus)=>{
    const response = await apiCall.post(`/projects/status-update/${projectId}`,updateStatus)
    alert('Project Updated Successfully')
  }

export default updateStatusRequest