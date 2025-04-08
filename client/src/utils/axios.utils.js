import axios from 'axios'
baseUrl = (import.meta.env.MODE=="production")?"https://event-hubzz-api.onrender.com/api":`${import.meta.env.VITE_SERVER_URL}${import.meta.env.VITE_PORT}/api`
const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
})
console.log("reached axios: ", `${import.meta.env.VITE_SERVER_URL}${import.meta.env.VITE_PORT}/api`) // not working

export default axiosInstance