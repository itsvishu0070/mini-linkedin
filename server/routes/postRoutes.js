// server/routes/postRoutes.js
import express from "express";
import {
  createPost,
  getAllPosts,
  getUserPosts,
} from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js"; // Import protect middleware for authentication

const router = express.Router();

// Routes for reading posts (public access)
router.get("/", getAllPosts);
router.get("/user/:userId", getUserPosts);

// Route for creating a post (private access - requires JWT token)
router.post("/", protect, createPost);

export default router;
