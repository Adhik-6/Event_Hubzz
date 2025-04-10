import express from 'express';
import { postUserDetails, verifyDetails } from '../controllers/index.controllers.js';
import { asyncWrapper } from '../utils/index.utils.js';
import { authMiddleware } from '../middlewares/index.middlewares.js';

const userRouter = express.Router()

userRouter.post("/register/:id", authMiddleware , asyncWrapper(postUserDetails))
userRouter.post("/verify", asyncWrapper(verifyDetails))

export { userRouter }