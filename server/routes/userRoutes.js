// server/routes/userRoutes.js
import express from "express";
import { getUserProfile } from "../controllers/userController.js";
// import protect from '../middleware/authMiddleware.js'; // Uncomment if you want profile viewing to be private

const router = express.Router();

// Route for getting a user profile by ID
// Currently public, uncomment 'protect' middleware if you want to restrict access to logged-in users only
router.get("/:id", getUserProfile);

export default router;
