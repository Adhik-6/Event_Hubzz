import jwt from 'jsonwebtoken';
import { customAPIError } from "../utils/index.utils.js";
import dotenv from 'dotenv';
import { Organiser } from '../models/index.models.js';
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  if (req.method === 'OPTIONS') return next() // Let preflight request through without auth
  const token = req.cookies.token;
  console.log("Token in auth middleware:", token)
  if (!token) return res.status(403).json({ success: false,  message: "User not logged in" });

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Organiser.findById(userId).select('-password');
  } catch (err) {
    return res.status(403).json({success: false, message: "Invalid token at authMiddleware"});
  }
  next()
}

// export const checkAuth = async (req, res, next) => {
//   if (req.method === 'OPTIONS') return next() // Let preflight request through without auth
//   const token = req.cookies.token;
//   console.log("Token:", token)
//   if (!token) return res.status(200).json({ success: false,  message: "User not logged in" });

//   try {
//     const { userId } = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await Organiser.findById(userId).select('-password');
//   } catch (err) {
//     return res.status(403).json({success: false, message: "Invalid token at authMiddleware"});
//   }
//   next()
// }