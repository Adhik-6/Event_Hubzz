import jwt from 'jsonwebtoken';
import { customAPIError } from "../utils/index.utils.js";
import dotenv from 'dotenv';
import { Organiser } from '../models/index.models.js';
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  if (req.method === 'OPTIONS') return next() // Let preflight request through without auth
  const token = req.cookies.token;
  if(!token) throw customAPIError(403, "User not logged in", "authMiddleware");

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Organiser.findById(userId).select('-password');
  } catch (err) {
    throw customAPIError(403, "Invalid token", "authMiddleware");
  }
  next()
}