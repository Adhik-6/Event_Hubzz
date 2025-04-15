import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import App from './App1.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
    // <App />
)

// Check if correct startdate and time is picked when displaying to user and organiser
// show errors to users when invalid event details are entered
// Free/cost for event registration, search, sort by this category
// handle errors safely err.response?.data?.message 
// toast invalid date input in create event page
// Download and keep a placeholder image in eventDetaisTouser component
// When the organiser creates an event asks the organiser if he would like to add any additional information
// test with external URL for user event registration
// default image value is not working for event's model, Try removing the default value when defining model and use it from local storage.
// update mail's HTML format
// when verifying the qr code, make sure it shows error for past or future events.
// In profile updation component, add a cancel button to revert back to previous state
// select only necessary fields from db when retrieveing the docuemnts
// Make profileForm component more efficient by removing duplicate variables that store user details
// A seperate page to display user profile to other users
// When updating user profiles in Claudinary remove the previous one
// Also remove events that are one month older
// Test the dropdown input style in response
// if poosible set activeTab or activeStep in URL
// Add a clear filter option in events page an myEvents page (in profile)