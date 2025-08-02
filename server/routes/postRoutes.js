
import express from "express";
import {
  createPost,
  getAllPosts,
  getUserPosts,
} from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js"; 

const router = express.Router();


router.get("/", getAllPosts);
router.get("/user/:userId", getUserPosts);


router.post("/", protect, createPost);

export default router;
