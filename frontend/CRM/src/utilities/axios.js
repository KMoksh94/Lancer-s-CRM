import axios from "axios"

const apiCall = axios.create({
  baseURL : `http://localhost:5000/`
})

apiCall.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // always latest
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default apiCall