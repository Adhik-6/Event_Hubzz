import { Router } from 'express';
import { signup, login, logout, updateProfile } from '../controllers/index.controllers.js';
import { asyncWrapper } from '../utils/index.utils.js';
import { authMiddleware } from '../middlewares/index.middlewares.js';

const authRouter = Router();

// Register route
authRouter.post('/signup', asyncWrapper(signup));

// Login route
authRouter.post('/login', asyncWrapper(login));

// Logout route
authRouter.post('/logout', asyncWrapper(logout));

authRouter.get('/check-auth', asyncWrapper(authMiddleware), (req, res) => {
  res.status(200).json({ success: true, message: "Authenticated", user: req.user });
});

authRouter.patch("/update-profile", authMiddleware, asyncWrapper(updateProfile))

export { authRouter }