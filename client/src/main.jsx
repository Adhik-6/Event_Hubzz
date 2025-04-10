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
// toast invalid date input
// Download and keep a placeholder image in eventDetaisTouser component
// When the organiser creates an event asks the organiser if he would like to add any additional information
// test with external URL for user event registration
// default image value is not working for event's model
// update the sender's mail ID & password