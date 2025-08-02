// client/src/api/userService.js
import axiosInstance from "./axiosInstance"; // Use the configured axiosInstance

const getUserProfile = async (userId) => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
};

const userService = {
  getUserProfile,
};

export default userService;
