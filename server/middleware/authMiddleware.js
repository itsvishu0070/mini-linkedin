// server/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Import User model to find user by ID
import asyncHandler from "../utils/asyncHandler.js"; // Use asyncHandler to catch errors

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for authorization header and Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (e.g., "Bearer TOKEN")
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID from the token payload and attach to request object
      // .select('-password') excludes the password hash from the user object
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Move to the next middleware or route handler
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401); // Set status to Unauthorized
      throw new Error("Not authorized, token failed"); // Throw error to be caught by errorHandler
    }
  }

  if (!token) {
    res.status(401); // Set status to Unauthorized
    throw new Error("Not authorized, no token"); // Throw error
  }
});

export default protect;
