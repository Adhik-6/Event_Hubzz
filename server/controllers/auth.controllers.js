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
  if(user.isDeleted) throw customAPIError(403, "Account Deleted", "login")
    
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
  // console.log("after clearing cookies in logout:", req.cookies)

  res.status(200).json({ success: true, message: "Logout successful" })
}

// changed
export const updateProfile = async (req, res) => {
  const { formData } = req.body;

  const currentProfile = await Organiser.findById(req.user._id, { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }).lean();
  if (!currentProfile) return res.status(404).json({ success: false, message: "Profile not found" });

  if (formData?.profilePic) {
    if (currentProfile.profilePic && currentProfile.profilePic !== formData.profilePic) {
      const publicId = getCloudinaryPublicId(currentProfile.profilePic);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error("Failed to delete old image from Cloudinary:", err);
        }
      }
    }

    try {
      const { secure_url } = await cloudinary.uploader.upload(formData.profilePic, {
        folder: 'profile_pics'
      });
      formData.profilePic = secure_url;
    } catch (err) {
      return res.status(500).json({ success: false, message: "Image upload failed", error: err.message });
    }
  }

  const updatedProfile = await Organiser.findByIdAndUpdate(
    formData._id,
    { $set: formData },
    { new: true }
  ).lean();

  if (!updatedProfile) return res.status(404).json({ success: false, message: "Profile not found during update" });

  req.user = updatedProfile.toObject();
  delete req.user.password;

  res.status(201).json({ success: true, message: "Updated successfully", updatedProfile: req.user });
};

function getCloudinaryPublicId(url) {
  try {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    const publicId = fileName.split('.')[0];
    const folder = parts.slice(parts.indexOf('profile_pics')).slice(0, -1).join('/');
    return `${folder}/${publicId}`;
  } catch (err) {
    console.error("Failed to extract public ID from URL:", url);
    return null;
  }
}

// changed
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) throw customAPIError(400, "All fields are required", "changePassword");
  if (newPassword === currentPassword) throw customAPIError(400, "New password cannot be the same as current password", "changePassword");
  if (newPassword.length < 8) throw customAPIError(400, "Password must be at least 8 characters long", "changePassword");

  const user = await Organiser.findById(req.user._id, { password: 1 });

  if (!user) throw customAPIError(404, "User not found", "changePassword");

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw customAPIError(403, "Invalid current password", "changePassword");

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ success: true, message: "Password changed successfully" });
}

// changed
export const deleteProfile = async (req, res) => {
  const user = await Organiser.findById(req.user._id, { mail: 1, isDeleted: 1})
  if (!user) throw customAPIError(404, "User not found", "deleteProfile");
  user.isDeleted = true;
  await user.save();
  res.status(200).json({ success: true, message: "Profile deleted successfully" });
}