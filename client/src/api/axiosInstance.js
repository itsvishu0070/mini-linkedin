
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo && userInfo.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
      }
    } catch (error) {
      console.error(
        "Failed to parse userInfo from localStorage during interceptor:",
        error
      );
     
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
   
    if (error.response && error.response.status === 401) {
      console.warn(
        "Authentication error: Token expired or invalid. Logging out user."
      );
      localStorage.removeItem("userInfo"); 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
