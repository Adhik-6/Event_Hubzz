import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Event"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Organiser"
  },
  mail: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  checkedIn: {
    type: Boolean,
    default: false
  },
  responses: [
    {
      type: mongoose.Schema.Types.Mixed,
    }
  ]
}, 
{
  strict: false,
  timestamps: true
})
// eventTitle, fullName, mail

userSchema.index({ eventId: 1, userId: 1, mail: 1 }, { unique: true })

const User = mongoose.model("User", userSchema)

export default User