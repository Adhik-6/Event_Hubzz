import QRCode from 'qrcode';
import nodeMailer from 'nodemailer';
import { User } from './../models/index.models.js'
import { customAPIError } from '../utils/index.utils.js'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config()

// export const postUserDetails = async (req, res) => {
//   const dbRes = await User.create(req.body)
//   const qrCode = await QRCode.toDataURL(`http://localhost:8000/verify/${dbRes._id}`)

//   sendEmail(dbRes.mail, qrCode);

//   res.status(201).json({success: true, message: "Registered Successfully", qrCode})
// }

export const postUserDetails = async (req, res) => {
  console.log(req.body)
  const data = {
    eventId: req.params.id,
    userId: req.user._id,
    mail: req.body.Email,
    responses: req.body
  }
  delete data.responses.Email
  // console.log("Data: ", data);
  const dbRes = await User.create(data)
  const qrCode = await QRCode.toDataURL(`${dbRes._id}-${dbRes.eventId}-${dbRes.userId}`) // response_ID-event_ID-user_ID

  sendEmail(dbRes.mail, qrCode);

  res.status(201).json({success: true, message: "Registered Successfully", qrCode})
  // res.status(201).json({success: true, message: "Registered Successfully"})
}

export const verifyDetails = async (req, res) => {
  console.log("Verifying user details");
  const [resId, eventId, userId] = req.body.qrData.split("-")

  if(!(mongoose.Types.ObjectId.isValid(userId) && mongoose.Types.ObjectId.isValid(eventId) && mongoose.Types.ObjectId.isValid(resId)))
    return res.status(400).json({ success: false, message: "Invalid QR code" })

  const dbRes = await User.findOne(
    { _id: resId, eventId, userId }, 
    { _id:0, responses: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  )
  .populate({ path: "eventId", select: "title -_id" })
  .populate({ path: "userId", select: "fullName -_id" })
  .lean();
  console.log("res:- ", dbRes);

  // if(!dbRes) throw customAPIError(404, "Invalid QR code", 'verifyDetails')
  // if(dbRes.checkedIn) throw customAPIError(400, "User already checked in", 'verifyDetails')
  
  if(!dbRes) return res.status(404).json({ success: false, message: "User not registered" })
  if(dbRes.checkedIn) return res.status(400).json({ success: false, message: "User already checked In" })
      
  await User.updateOne({ _id: resId }, { $set: { checkedIn: true } });
  res.status(200).json({success: true, message: "Valid ID", userDetails: dbRes }) 
}

async function sendEmail(mail, qrCode) {

  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS
    }
  })

  let mailOptions = {
    from: process.env.MAIL_ID,
    to: mail,
    subject: `QR Code for the event`,
    html: "<h3> Here is your QR code for event</h3><br/><p>Show this code at the entrance of the venue</p>",
    attachments: [{
      filename: 'qrcode.png',
      content: qrCode.split(';base64,').pop(),
      encoding: 'base64'
    }]
  }
  let info = await transporter.sendMail(mailOptions)
  // console.log("Mail Info: ", info)
  console.log(info.accepted.length===0?`Couldn't send mail: ${info}`:"Mail has been sent successfully")
}