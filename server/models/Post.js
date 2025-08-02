// server/models/Post.js
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    text: {
      type: String,
      required: true,
      maxlength: 500, // Limit post length
    },

  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default mongoose.model("Post", PostSchema);
