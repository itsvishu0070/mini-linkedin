
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    text: {
      type: String,
      required: true,
      maxlength: 500, 
    },

  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Post", PostSchema);
