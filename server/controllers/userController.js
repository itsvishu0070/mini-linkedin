// server/controllers/userController.js
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get user profile by ID
// @route   GET /api/users/:id
// @access  Public (or Private if using protect middleware)
const getUserProfile = asyncHandler(async (req, res) => {
  // Find user by ID and exclude the password hash from the result
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json({
      // 200 OK
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      createdAt: user.createdAt,
      // You can add more fields here if your User model has them
    });
  } else {
    res.status(404); // Not Found
    throw new Error("User not found.");
  }
});

export { getUserProfile };
