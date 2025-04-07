import { postUserDetails, verifyDetails } from "./user.controllers.js";
import { signup, login, logout } from "./auth.controllers.js";
import { createEvent, getAllEvents, getEventDetails } from "./event.controllers.js";

export { 
  postUserDetails, verifyDetails, 
  signup, login, logout,
  createEvent, getAllEvents, getEventDetails
}