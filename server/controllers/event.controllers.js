import { Event } from './../models/index.models.js';
import { cloudinary, customAPIError } from './../utils/index.utils.js';

export const createEvent = async (req, res) => {
  const {eventDetails, registrationType, externalUrl, formFields } = req.body;
  if (eventDetails.eventImage) {
    const res = await cloudinary.uploader.upload(eventDetails.eventImage, {
      folder: "event_management",
    });
    eventDetails.eventImage = res.secure_url;
  }
  const newEvent = await Event.create({
    ...eventDetails,
    externalUrl,
    formFields,
    organiser: req.user._id,
  })
  res.status(201).json({ success: true, message: "Event created successfully", event: newEvent });
}

export const getAllEvents = async (req, res) => {
  const events = await Event.find().lean()
  res.status(200).json({ success: true, message: "All Events fetched successfully", events })
}

export const getEventDetails = async (req, res) => {
  const { id } = req.params;
  const eventDetails = await Event.findById(id);
  if(!eventDetails) throw customAPIError(404, "Event doesn't exist")
  res.status(200).json({ success: true, message: "Event details fetched successfully", eventDetails })
}