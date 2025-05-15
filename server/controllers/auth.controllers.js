// import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Organiser } from '../models/index.models.js';
import { customAPIError, cloudinary, setAuthCookies, clearAuthCookies } from '../utils/index.utils.js';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
  const { email: mail, password, fullName, userName, organisation: organization, profilePic, phoneNumber, bio, website } = req.body;
  // console.log(req.body)

  const existingUser = await Organiser.findOne({ $or: [{ mail }, { userName }] });

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
  req.user = newUser.toObject();
  delete req.user.password;

  res.status(200).json({ success: true, message: "Signup successfull", user: req.user });
}

export const login = async (req, res) => {
  const { email: mail, password } = req.body;

  const user = await Organiser.findOne({ mail })

  if(!user) throw customAPIError(404, "Mail not found", "login")
    
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch) throw customAPIError(403, "Invalid password", "login")
  console.log("User should be logged in")
      
  setAuthCookies(req, res, user._id);
  // console.log("cookies: ", req.cookies)
  req.user = user.toObject();
  delete req.user.password;
  // console.log("After successfull login (req.user): ", req.user)

  res.status(200).json({ success: true, message: "Login successfull", user: req.user });

}

export const logout = async (req, res) => {
  if (!req.cookies.token) throw customAPIError(400, "User not logged in", "logout")
  
  // res.clearCookie('token',  {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'None'
  // })
  clearAuthCookies(req, res);
  console.log("after clearing cookies in logout:", req.cookies)

  res.status(200).json({ success: true, message: "Logout successful" })
}

export const updateProfile = async (req, res) => {
  const { userProfile } = req.body;
  // console.log("user porfile: ", userProfile)   

  // let imgUrl
  if(userProfile.profilePic){
    const {secure_url} = (await cloudinary.uploader.upload(userProfile.profilePic, {folder: 'profile_pics'}));
    console.log("secure url", secure_url)
    userProfile.profilePic = secure_url;
  }
  // console.log("user porfile: ", userProfile)
  
  const updatedProfile = await Organiser.findOneAndUpdate({ _id: userProfile._id}, {$set: userProfile}, { new: true }).lean()
  delete updatedProfile.password

  // console.log("updated porfile: ", updatedProfile)
  if (!updatedProfile) return res.status(404).json({ success: false, message: "Profile not found" });

  res.status(201).json({ success: true, message: "Updated successfully", updatedProfile })
}