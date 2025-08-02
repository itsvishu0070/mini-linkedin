// server/controllers/authController.js
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js"; // To automatically catch async errors

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, bio } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    res.status(400); // Bad Request
    throw new Error(
      "Please enter all required fields: name, email, and password."
    );
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // Bad Request
    throw new Error("User with that email already exists.");
  }

  // Create user (password hashing handled by pre-save hook in User model)
  const user = await User.create({
    name,
    email,
    password,
    bio,
  });

  if (user) {
    res.status(201).json({
      // 201 Created
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      token: generateToken(user._id),
    });
  } else {
    res.status(400); // Bad Request
    throw new Error("Invalid user data provided.");
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter email and password.");
  }

  const user = await User.findOne({ email });

  // Check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      // 200 OK
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error("Invalid email or password.");
  }
});

export { registerUser, loginUser };
