// server/controllers/postController.js
import Post from "../models/Post.js";
import User from "../models/User.js"; // Imported for specific user checks/population
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private (requires authentication)
const createPost = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Post text is required.");
  }

  // req.user is populated by the protect middleware
  const newPost = new Post({
    user: req.user._id,
    text,
  });

  const createdPost = await newPost.save();

  // Populate user details for the response so frontend has author info immediately
  // Only 'name' and 'email' fields of the user will be populated
  const populatedPost = await createdPost.populate("user", "name email");

  res.status(201).json(populatedPost); // 201 Created
});

// @desc    Get all posts (for public feed)
// @route   GET /api/posts
// @access  Public
const getAllPosts = asyncHandler(async (req, res) => {
  // Find all posts, populate the 'user' field with 'name' and 'email', sort by creation date (descending)
  const posts = await Post.find({})
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(posts); // 200 OK
});

// @desc    Get posts by a specific user
// @route   GET /api/posts/user/:userId
// @access  Public
const getUserPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Optional: Check if the user exists before fetching their posts
  const userExists = await User.findById(userId);
  if (!userExists) {
    res.status(404);
    throw new Error("User not found.");
  }

  const posts = await Post.find({ user: userId })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(posts); // 200 OK
});

export { createPost, getAllPosts, getUserPosts };
