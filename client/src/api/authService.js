// client/src/api/authService.js
import axios from "axios";
// For login/register, we use plain axios here, as the token isn't available yet for axiosInstance.
// axiosInstance is used for calls *after* a user is logged in.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  // You might store user info in localStorage here if not already done in context
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  // You might store user info in localStorage here if not already done in context
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
