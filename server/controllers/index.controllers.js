import { postUserDetails, verifyDetails } from "./user.controllers.js";
import { signup, login, logout, updateProfile, changePassword, deleteProfile } from "./auth.controllers.js";
import { createEvent, getAllEvents, getEventDetails, getCurrentUserEvents, updateEvent, getRegisteredEvents, deleteEvent } from "./event.controllers.js";
import { getEventSummary, registrationsOverTime, getTableData, getPieChartData } from "./analytics.controllers.js"

export { 
  postUserDetails, verifyDetails, 
  signup, login, logout, updateProfile, changePassword, deleteProfile,
  createEvent, getAllEvents, getEventDetails, getCurrentUserEvents, updateEvent, getRegisteredEvents, deleteEvent,
  getEventSummary, registrationsOverTime, getTableData, getPieChartData
}