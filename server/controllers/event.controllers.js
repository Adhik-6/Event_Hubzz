import mongoose from 'mongoose';
import { Event, User } from './../models/index.models.js';
import { cloudinary, customAPIError } from './../utils/index.utils.js';

// changed
export const createEvent = async (req, res) => {
  const {eventDetails, externalUrl, formFields } = req.body;
  console.log("Event Details:", req.body);
  if (eventDetails?.eventImage) {
    const res = await cloudinary.uploader.upload(eventDetails.eventImage, {
      folder: "event_management",
    }); 
    eventDetails.eventImage = res.secure_url;
  } else {
    delete eventDetails.eventImage
  }
  await Event.create({
    ...eventDetails,
    externalUrl,
    formFields,
    organiser: req.user._id,
  });
  res.status(201).json({ success: true, message: "Event created successfully" });
}
const getPublicId = (secureUrl) => {
  const urlParts = secureUrl.split('/upload/')[1]; // e.g., v1681785476/myfolder/filename.jpg
  const publicIdWithExtension = urlParts.split('/').slice(1).join('/'); // remove vXXXXX
  return publicIdWithExtension.replace(/\.[^/.]+$/, ''); // remove .jpg, .png etc.
};

// totally changed
export const updateEvent = async (req, res) => {
  const { eventDetails, externalUrl, formFields } = req.body;
  eventDetails.formFields = formFields;
  eventDetails.externalUrl = externalUrl;
  eventDetails.organiser = req.user._id;

  if (!eventDetails._id) throw customAPIError(400, "No _id field found", "update Event");

  const event = await Event.findById(new mongoose.Types.ObjectId(eventDetails._id));
  if (!event) throw customAPIError(404, "Event not found", "update Event");

  const isNewImageBase64 = (
    eventDetails.eventImage &&
    /^data:image\/[a-z]+;base64,/.test(eventDetails.eventImage)
  );

  const isSameImage = event.eventImage === eventDetails.eventImage;

  if (isNewImageBase64 && !isSameImage) {
    // Delete old image from Cloudinary
    if (event.eventImage) await cloudinary.uploader.destroy(getPublicId(event.eventImage));

    // Upload new image to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(eventDetails.eventImage, { folder: "event_management" });
    eventDetails.eventImage = uploadRes.secure_url; // Update image URL in eventDetails
  } else {
    // If image is same or invalid base64, skip updating it
    delete eventDetails.eventImage;
  }

  Object.assign(event, eventDetails);
  await event.save();

  res.status(201).json({ success: true, message: "Event updated successfully", event });
};


export const getAllEvents = async (req, res) => {
  const events = await Event.find({ $or: [
      { isDeleted: false },
      { isDeleted: { $exists: false } }
    ] }, "-__v -createdAt -updatedAt").populate({ path: "organiser", select: "organization -_id" }).lean()
  // const events = await Event.find()
  // .populate({ path: "organiser" }) // no select, to see what's in the ref
  // .lean();

  // console.log(events.map(e => e.organiser));
  // console.log("Events:", events.pop())
  res.status(200).json({ success: true, message: "All Events fetched successfully", events })
}

export const getEventDetails = async (req, res) => {
  const { id } = req.params;

  const eventDetails = await Event.findOne({
    _id: new mongoose.Types.ObjectId(id),
    $or: [
      { isDeleted: false },
      { isDeleted: { $exists: false } }
    ]
  }).select("-__v -createdAt -updatedAt").populate({ path: "organiser", select: "organization -_id" }).lean();

  if (!eventDetails) throw customAPIError(404, "Event doesn't exist");

  res.status(200).json({ success: true, message: "Event details fetched successfully", eventDetails });
};

// changed
export const getCurrentUserEvents = async (req, res) => {
  const { _id } = req.user;

  const events = await Event.find(
    {
      organiser: _id,
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    },
    { __v: 0, createdAt: 0, updatedAt: 0 }
  );

  if (events.length === 0) throw customAPIError(404, "No events found");

  res.status(200).json({ success: true, message: "Events fetched", currentUserEvents: events });
};


export const getRegisteredEvents = async (req, res) => {
  const { _id } = req.user;

  const eventDocs = await User.find({ userId: _id }, { eventId: 1, _id: 0 });
  const eventIds = eventDocs.map(doc => new mongoose.Types.ObjectId(doc.eventId));

  if (eventIds.length === 0) throw customAPIError(404, "User has not registered for any events.", "getRegisteredEvents");

  const events = await Event.find({
    _id: { $in: eventIds },
    $or: [
      { isDeleted: false },
      { isDeleted: { $exists: false } }
    ]
  },
  { __v: 0, createdAt: 0, updatedAt: 0 }
  );

  if (!events || events.length === 0) throw customAPIError(404, "No matching events found.", "getRegisteredEvents");
  res.status(200).json({ success: true, message: "Events fetched", currentUserEvents: events });
};


export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) throw customAPIError(404, "Event not found", "delete Event");

  // Soft delete
  event.isDeleted = true;
  await event.save();

  res.status(200).json({ success: true, message: "Event deleted successfully" });
}