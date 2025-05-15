import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const cookieOptions =  {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
}

export const setAuthCookies = (req, res, id) => {

  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '15d' })
  // console.log("token generated: ", token)

  res.cookie('token', token, { ...cookieOptions, maxAge: 15 * 24 * 60 * 60 * 1000 })

  return token;
}

export const clearAuthCookies = (req, res) => {
  res.clearCookie('token', cookieOptions)
}