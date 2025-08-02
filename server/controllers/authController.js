
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js"; 


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, bio } = req.body;

  
  if (!name || !email || !password) {
    res.status(400); 
    throw new Error(
      "Please enter all required fields: name, email, and password."
    );
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); 
    throw new Error("User with that email already exists.");
  }

  
  const user = await User.create({
    name,
    email,
    password,
    bio,
  });

  if (user) {
    res.status(201).json({
    
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid user data provided.");
  }
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter email and password.");
  }

  const user = await User.findOne({ email });

  
  if (user && (await user.matchPassword(password))) {
    res.json({
      
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); 
    throw new Error("Invalid email or password.");
  }
});

export { registerUser, loginUser };
