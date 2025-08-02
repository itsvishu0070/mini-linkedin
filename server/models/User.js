// server/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "Hello! I am a new member of this community.",
      maxlength: 250, // Optional: Add a max length for bio
    },
    // Optional: Add more fields later like profilePicture: { type: String }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Pre-save hook to hash password before saving a new user or if password is modified
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // Only hash if password field is new or modified
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);
