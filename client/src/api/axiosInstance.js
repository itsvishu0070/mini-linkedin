// client/src/api/axiosInstance.js
import axios from "axios";

// Get API_URL from Vite's environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT token to requests
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
      // Optionally clear userInfo if corrupted
      // localStorage.removeItem('userInfo');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle common response errors (e.g., 401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the error is a 401 Unauthorized, it might mean the token is expired or invalid
    if (error.response && error.response.status === 401) {
      console.warn(
        "Authentication error: Token expired or invalid. Logging out user."
      );
      localStorage.removeItem("userInfo"); // Clear invalid user info
      // TODO: You might want to dispatch a global logout action here
      // or redirect the user to the login page (e.g., using navigate from react-router-dom if accessible)
      // For now, a console warning and local storage clear is sufficient.
      // Example for redirection (would require navigate hook):
      // if (window.location.pathname !== '/login') {
      //     window.location.href = '/login';
      // }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
