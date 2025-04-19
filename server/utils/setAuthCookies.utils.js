import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const setAuthCookies = (req, res, id) => {

  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '15d' })
  console.log("token generated: ", token)

  res.cookie('token', token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: 'Lax'
  })

  return token;
}