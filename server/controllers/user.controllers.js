import QRCode from 'qrcode';
import nodeMailer from 'nodemailer';
import { User, Event } from './../models/index.models.js'
import { customAPIError } from '../utils/index.utils.js'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config()

const emailTemplate = `
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; margin-top:30px; border-radius:8px; overflow:hidden;">
      <tr>
        <td style="padding:20px; background-color:#1976d2; color:white; text-align:center;">
          <h2 style="margin:0;">🎉 Registration Confirmed!</h2>
        </td>
      </tr>

      <tr>
        <td style="padding:30px;">
          <p style="font-size:16px; color:#333333;">Hi {{userName}},</p>
          <p style="font-size:16px; color:#333333;">
            Thank you for registering for <strong>{{eventName}}</strong>! We're excited to have you join us.
          </p>

          <table style="margin-top:20px; font-size:15px; color:#333333; border-collapse: separate;
  border-spacing: 10px 0;">
            <tr>
              <td><strong>Event:</strong></td>
              <td>{{eventName}}</td>
            </tr>
            <tr>
              <td><strong>Date:</strong></td>
              <td>{{eventDate}}</td>
            </tr>
            <tr>
              <td><strong>Location:</strong></td>
              <td>{{eventLocation}}</td>
            </tr>
            <tr>
              <td><strong>Registration ID:</strong></td>
              <td>{{registrationId}}</td>
            </tr>
          </table>

          <p style="margin-top:20px; font-size:16px; color:#333333;">
            Please keep this email for reference. You may be required to show your registration ID or the QR code at the entry.
          </p>

          <p style="margin-top:30px; font-size:16px; color:#333333;">
            We look forward to seeing you there!<br />
            – The Event Team
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:15px; background-color:#f4f4f4; text-align:center; font-size:12px; color:#888888;">
          © 2025 Event Management Platform. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
`

// export const postUserDetails = async (req, res) => {
//   const dbRes = await User.create(req.body)
//   const qrCode = await QRCode.toDataURL(`http://localhost:8000/verify/${dbRes._id}`)

//   sendEmail(dbRes.mail, qrCode);

//   res.status(201).json({success: true, message: "Registered Successfully", qrCode})
// }

export const postUserDetails = async (req, res) => {
  // console.log(req.body)
  const data = {
    eventId: req.params.id,
    userId: req.user._id,
    mail: req.body.Email,
    responses: req.body
  }
  delete data.responses.Email
  // console.log("Data: ", data);
  const dbResPromise = User.create(data)
  const eventPromise = Event.findById(req.params.id, { __v: 0, updatedAt: 0, createdAt: 0 }).lean()
  const eventPromise2 =  Event.findOneAndUpdate(
    {
      _id: req.params.id,
      $expr: { $lt: ["$registrations", "$capacity"] }
    },
    { $inc: { registrations: 1 } },
    { new: true }
  );
  const [dbRes, event, event2] = await Promise.all([dbResPromise, eventPromise, eventPromise2])
  if(!event) throw customAPIError(404, "Event not found", "postUserDetails")
  if(!event2) throw customAPIError(400, "Event is full", "postUserDetails")
  const qrCode = await QRCode.toDataURL(`${dbRes._id}-${dbRes.eventId}-${dbRes.userId}`) // response_ID-event_ID-user_ID

  sendEmail(dbRes, event, qrCode);

  return res.status(201).json({success: true, message: "Registered Successfully", qrCode})
  
}

export const verifyDetails = async (req, res) => {
  console.log("Verifying user details");
  const [resId, eventId, userId] = req.body.qrData.split("-")

  if(!(mongoose.Types.ObjectId.isValid(userId) && mongoose.Types.ObjectId.isValid(eventId) && mongoose.Types.ObjectId.isValid(resId)))
    return res.status(400).json({ success: false, message: "Invalid QR code" })

  const dbRes = await User.findOne(
    { _id: resId, eventId, userId }, 
    { responses: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  )
  .populate({ path: "eventId", select: "title startDate endDate -_id" })
  .populate({ path: "userId", select: "fullName -_id" })
  .lean();
  console.log("verifying details:- ", dbRes);
  
  if(!dbRes) return res.status(404).json({ success: false, message: "User not registered" })
  // if(dbRes.startDate > new Date()) return res.status(400).json({ success: false, message: "Event not started yet" })
  if(dbRes.endDate < new Date()) return res.status(400).json({ success: false, message: "Event has ended" })
  if(dbRes.checkedIn) return res.status(400).json({ success: false, message: "User already checked In" })
      
  await User.updateOne({ _id: resId }, { $set: { checkedIn: true } });
  res.status(200).json({success: true, message: "Valid ID", userDetails: dbRes }) 
}

async function sendEmail(dbRes, event, qrCode) {

  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS
    }
  })

  const htmlTemplate = emailTemplate
  .replace(/{{userName}}/g, dbRes.mail)
  .replace(/{{eventName}}/g, event.title)
  .replace(/{{eventDate}}/g, new Date(event.startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }))
  .replace(/{{eventLocation}}/g, event.venue)
  .replace(/{{registrationId}}/g, dbRes._id);

  let mailOptions = {
    from: process.env.MAIL_ID,
    to: dbRes.mail,
    subject: `QR Code for the event`,
    html: htmlTemplate,
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