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
// custom print QR code option
// When clicking on the view details or register event button in the EventCard component. Make it efficient by assigning the values to the current event during the button click of the event card itself. To make it safe in the registration page use the useEffect to fetch the event details if the currentEvent is empty
// Test dropDown in registration form
// bind the active step with the URL
// Add a registered event tab in the profile page
// when registering for a event make sure to check for the capacity
// Check if multine questio inputs are correctly rendered in analytics page table (there seemed to a case sensitivity problem in AI generated mock data) ('multiline' and 'Multiline')
// Add a pie chart to display the number of people attended the event by counting the number of users checkedin = true in user response
// modify the questions section in analytics page to show different answers given by users.
// when creating an event one after the other (wihtout page reloads) seems to keep the state of the previosuly created event. Same issue when registering for event also. Solution: Clear the state.
// The backend also seems to provide the formFields when fetching tableData. Remove it if possible