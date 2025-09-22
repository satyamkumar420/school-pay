import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function (req, res, next) {
  // 🚀 Get token from header
  const authHeader = req.header("Authorization");

  // 🔍 Check for token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // ✂️ Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🙋‍♂️ Attach user to the request object
    req.user = await User.findById(decoded.user.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}
