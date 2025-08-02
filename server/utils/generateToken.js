// server/utils/generateToken.js
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token valid for 1 hour
  });
};

export default generateToken;
