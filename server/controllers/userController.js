
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

const getUserProfile = asyncHandler(async (req, res) => {
 
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json({
     
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      createdAt: user.createdAt,
      
    });
  } else {
    res.status(404); 
    throw new Error("User not found.");
  }
});

export { getUserProfile };
