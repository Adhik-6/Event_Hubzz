import mongoose from "mongoose";

const organiserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    // default: 'https://www.bing.com/th?id=OIP.-JC2gfimk9rHT01TDDQJYgHaHa&w=115&h=104&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  phoneNumber: {
    type: String,
  },
  organization: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
    match: [/^https:\/\/.+\..+$/, 'Please fill a valid website URL']
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    linkedIn: String,
    instagram: String
  }
}, 
{
  timestamps: true
})


const Organiser = mongoose.model('Organiser', organiserSchema);
export default Organiser;