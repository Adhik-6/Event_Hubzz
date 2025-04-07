// import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Organiser } from '../models/index.models.js';
import { customAPIError, cloudinary, setAuthCookies } from '../utils/index.utils.js';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
  const { email: mail, password, fullName, userName, organisation: organization, profilePic, phoneNumber, bio, website } = req.body;
  console.log(req.body)

  const existingUser = await Organiser.findOne({ $or: [{ mail }, { userName }] });

  console.log("Signup")
  if (existingUser) {
    throw customAPIError(400, 'User already exists with that mail or username', 'signup');
  }

  let imgUrl
  if(profilePic){
    const {secure_url} = await cloudinary.uploader.upload(profilePic, {folder: 'profile_pics'});
    imgUrl = secure_url;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  let newUser = await Organiser.create({
    mail,
    password: hashedPassword,
    fullName,
    userName,
    organization,
    profilePic: imgUrl,
    phoneNumber,
    bio: bio?bio:"",
    website: website?website:""
  });

  setAuthCookies(req, res, newUser._id);
  req.user = user.toObject();
  delete req.user.password;

  res.status(200).json({ success: true, message: "Signup successfull", user: req.user });
}

export const login = async (req, res) => {
  const { email: mail, password } = req.body;

  const user = await Organiser.findOne({ mail })

  if(!user) throw customAPIError(404, "Mail not found", "login")
    
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch) throw customAPIError(403, "Invalid password", "login")
  console.log("passwords correct")
      
  setAuthCookies(req, res, user._id);
  req.user = user.toObject();
  delete req.user.password;

  res.status(200).json({ success: true, message: "Login successfull", user: req.user });

}

export const logout = async (req, res) => {
  console.log("Logout")
  if (!req.cookies.token) throw customAPIError(400, "User not logged in", "logout")
  
  res.clearCookie('token')

  res.status(200).json({ success: true, message: "Logout successful" })
}
