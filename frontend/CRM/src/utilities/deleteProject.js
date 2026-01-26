  import apiCall from "./axios";
  
  const deleteProject = async (projectId)=> {
    try {
      const response = await apiCall.get(`/projects/delete-project/${projectId}`)
      alert(response.data.response)
    } catch (error) {
      console.log(error);
    }
  }

  export default deleteProject