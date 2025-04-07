import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}${import.meta.env.VITE_PORT}/api`,
  // baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
})
console.log("reached axios: ", `${import.meta.env.VITE_SERVER_URL}${import.meta.env.VITE_PORT}/api`) // not working

export default axiosInstance