import { postUserDetails, verifyDetails } from "./user.controllers.js";
import { signup, login, logout, updateProfile } from "./auth.controllers.js";
import { createEvent, getAllEvents, getEventDetails, getCurrentUserEvents, updateEvent } from "./event.controllers.js";
import { getEventSummary, registrationsOverTime, getTableData, getPieChartData } from "./analytics.controllers.js"

export { 
  postUserDetails, verifyDetails, 
  signup, login, logout, updateProfile,
  createEvent, getAllEvents, getEventDetails, getCurrentUserEvents, updateEvent,
  getEventSummary, registrationsOverTime, getTableData, getPieChartData
}