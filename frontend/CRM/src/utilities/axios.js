import axios from "axios"
const token = localStorage.getItem('token')

const apiCall = axios.create({
  baseURL : `http://localhost:5000/`,
  headers:{
    'Content-Type':"application/json",
    'Authorization' : `Bearer ${token !== '' ? token : '' }`
  }
})

export default apiCall