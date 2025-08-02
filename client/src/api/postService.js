
import axiosInstance from "./axiosInstance"; 

const createPost = async (postData) => {
  const response = await axiosInstance.post("/posts", postData);
  return response.data;
};

const getAllPosts = async () => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

const getUserPosts = async (userId) => {
  const response = await axiosInstance.get(`/posts/user/${userId}`);
  return response.data;
};

const postService = {
  createPost,
  getAllPosts,
  getUserPosts,
};

export default postService;
