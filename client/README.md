# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Future Implementation:-

// Storing qrCode in cloudinary or mongoDB (base64 as buffer). So that users can request their qrcode if missed.
// Free/cost for event registration, search, sort by this category
// no duplicate events
*// Check if correct startdate and time is picked when displaying to user and organiser
// clear the eventDetails object after updation
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
// Responsiveness: In events page, add a search bar for sm & md screens. keep only the filter option on side bar.
// Responsiveness: The navbar should have hamburger menu only on sm. In mobile keep the login button inside the hamburger menu.
// Responsiveness: If possible merge the hamburger menu with the user avatar menu in sm.
// Responsiveness: The login & signup page of the sm & md screen should event event hubzz as it's name and the icons should be changed, "welcome back" shouuld be centerd on sm & md screens with '!' added at the end
// Responsiveness: In profile page> my events tab, remove the creat event button (blue coloured) and add the filter option along with aside
// Responsiveness: Add functionality to the floating '+' button.
// Responsiveness: In md screen center the tabs in profile page.
// Responsiveness: make the stepper horizontal in event registration page.
// Responsiveness: Remove the "Event Information paper" in sm screens in reigstation page
// Look for Responsiveness in create evnent page.
// For each eventCard componnet set a max width for the image container.
// Add "Registered events" tab in profile page or edit the existing "my events" tab to show this.