import { Event } from './../models/index.models.js';
import { cloudinary, customAPIError } from './../utils/index.utils.js';

export const createEvent = async (req, res) => {
  const {eventDetails, registrationType, externalUrl, formFields } = req.body;
  if (eventDetails.eventImage) {
    const res = await cloudinary.uploader.upload(eventDetails.eventImage, {
      folder: "event_management",
    }); 
    eventDetails.eventImage = res.secure_url;
  } else {
    delete eventDetails.eventImage
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
  const events = await Event.find().populate({ path: "organiser", select: "organization -_id" }).lean()
  // const events = await Event.find()
  // .populate({ path: "organiser" }) // no select, to see what's in the ref
  // .lean();

  // console.log(events.map(e => e.organiser));
  // console.log("Events:", events.pop())
  res.status(200).json({ success: true, message: "All Events fetched successfully", events })
}

export const getEventDetails = async (req, res) => {
  const { id } = req.params;
  const eventDetails = await Event.findById(id).populate({ path: "organiser", select: "organization -_id" }).lean();
  if(!eventDetails) throw customAPIError(404, "Event doesn't exist")
  res.status(200).json({ success: true, message: "Event details fetched successfully", eventDetails })
}

export const getCurrentUserEvents = async (req, res) => {
  const { _id } = req.user
  // console.log("req.user: ", req.user)
  const events = await Event.find({ organiser: _id })
  // console.log("fetched Events: ", events)
  if(!events) throw customAPIError(404, "No events found")
  res.status(200).json({ success: true, message: "Events fetched", currentUserEvents: events })
}