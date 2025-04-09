import QRCode from 'qrcode';
import nodeMailer from 'nodemailer';
import { User } from './../models/index.models.js'
import { customAPIError } from '../utils/index.utils.js'
import dotenv from 'dotenv';
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
  console.log("Data: ", data);
  const dbRes = await User.create(data)
  const qrCode = await QRCode.toDataURL(`${dbRes._id}-${dbRes.eventId}-${dbRes.userId}`) // response_ID-event_ID-user_ID

  sendEmail(dbRes.mail, qrCode);

  res.status(201).json({success: true, message: "Registered Successfully", qrCode})
  // res.status(201).json({success: true, message: "Registered Successfully"})
}

export const verifyDetails = async (req, res) => {
  console.log("Verifying user details");
  const [resId, eventId, userId] = req.body.qrData.split("-")
  const dbRes = await User.find({
    _id: resId,
    eventId,
    userId
  }).populate({
    path: "eventId",
    select: "title"
  }).populate({
    path: "userId",
    select: "fullName"
  }).select("-responses -_id")

  // if(!dbRes) throw customAPIError(404, "Invalid QR code", 'verifyDetails')
  // if(dbRes.checkedIn) throw customAPIError(400, "User already checked in", 'verifyDetails')

  if(!dbRes) res.status(404).json({ success: false, message: "User not registered" })
  if(dbRes.checkedIn) res.status(400).json({ success: false, message: "User already checked In" })
  
  dbRes.checkedIn = true
  await dbRes.save();
  res.status(200).json({success: true, message: "Valid ID", userDetails: dbRes })
  // console.log("Error while verifying user details:", err.message)  
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