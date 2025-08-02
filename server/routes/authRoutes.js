// server/routes/authRoutes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js"; // Use named imports

const router = express.Router();

// Define routes for authentication
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
