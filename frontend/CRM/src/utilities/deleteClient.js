  import apiCall from "./axios";
  
  const deleteClient = async (clientId)=> {
    try {
      const response = await apiCall.get(`/clients/delete-client/${clientId}`)
      alert(response.data.response)
    } catch (error) {
      console.log(error);
    }
  }

  export default deleteClient