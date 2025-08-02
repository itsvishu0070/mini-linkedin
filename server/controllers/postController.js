
import Post from "../models/Post.js";
import User from "../models/User.js"; 
import asyncHandler from "../utils/asyncHandler.js";


const createPost = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Post text is required.");
  }

  
  const newPost = new Post({
    user: req.user._id,
    text,
  });

  const createdPost = await newPost.save();

 
  const populatedPost = await createdPost.populate("user", "name email");

  res.status(201).json(populatedPost); 
});


const getAllPosts = asyncHandler(async (req, res) => {
 
  const posts = await Post.find({})
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(posts);
});


const getUserPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  
  const userExists = await User.findById(userId);
  if (!userExists) {
    res.status(404);
    throw new Error("User not found.");
  }

  const posts = await Post.find({ user: userId })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(posts); 
});

export { createPost, getAllPosts, getUserPosts };
