import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import toast from "react-hot-toast";
import { Box, Container, Typography, Paper, Button, Stepper, Step, StepLabel, CircularProgress, useTheme, useMediaQuery, Chip, Stack } from "@mui/material"
// import { mockEvents } from "./../assets/mockEvents.js"
import { EventDetailsToUser, RegistrationForm, ConfirmationSection } from "./../components/index.components.js"
import { useEventStore, useResponseStore } from "../stores/index.stores.js"
import { axiosInstance, getStatus } from './../utils/index.utils.js'
import { set } from "date-fns";

export const EventRegistration = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const { setResFormFields, currentEvent, setCurrentEvent, setRegistrationError, responseData, responseFormFields } = useResponseStore();

  const { id } = useParams();
  const [qrCode, setQrCode] = useState("")
  const [status, setStatus] = useState("")

  const {activeStep, setActiveStep} = useEventStore()
  const [isLoading, setIsLoading] = useState(true)
  const [registrationComplete, setRegistrationComplete] = useState(false)

  const steps = ["Event Details", "Registration Form", "Confirmation"]

  
  // Fetch Event data
  useEffect(() => {
    async function fetchEventDetails() {
      setIsLoading(true)
      try {
        const res = await axiosInstance(`/events/${id}`)
        // console.log("res: ", res.data.eventDetails )
        setCurrentEvent(res.data.eventDetails)
        setResFormFields(res.data.eventDetails.formFields)
        setStatus(getStatus(res.data.eventDetails.startDate, res.data.eventDetails.startTime, res.data.eventDetails.endDate, res.data.eventDetails.endTime))
        // console.log("event details: ", res.data.eventDetails)
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Something went wrong")
      } finally{
        setIsLoading(false)
      }
    }
    fetchEventDetails()
    setActiveStep(0)
  }, [id])


  // Validate form
const validateForm = () => {
  for (const item of responseFormFields) {
    if (item.required && (!(item.label in responseData) || responseData[item.label] === "")) {
      toast.error(`${item.label} is required`);
      return false;
    }
  }
  return true;
};

  // Handle next step
  const handleNext = () => {

    if(getStatus(currentEvent.startDate, currentEvent.startTime, currentEvent.endDate, currentEvent.endTime) === "past"){
      toast.error("Event has already ended")
      return
    }
    setActiveStep("next")
    // window.scrollTo(0, 0)
  }

  // Handle back step
  const handleBack = () => setActiveStep("back")

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)
        
    try {
      let res = await axiosInstance.post(`/user/register/${id}`, responseData)
      if(!res.data?.success) throw new Error(res.data?.message)
      // console.log("res: ", res)
      toast.success("Successfully registered")
      setQrCode(res.data?.qrCode)
      setRegistrationComplete(true)
      setActiveStep("next")
    } catch (err) {
      setRegistrationError("An error occurred during registration. Please try again.")
      toast.error(err.response?.data?.message)
      console.error("Registration error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !currentEvent) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      
      {/* Event Header */}
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 4, mt: 6 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          {currentEvent?.title || "event Registration"}
        </Typography>

        {status && (
          <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            color={status === "upcoming" ? "primary" : status === "ongoing" ? "success" : "default"}
            sx={{ mb: 2 }}
          />
        )}
      </Stack>

      {/* Stepper */}
      <Stepper
        activeStep={activeStep}
        sx={{ mb: 4 }}
        alternativeLabel={!isMobile}
        orientation="horizontal"
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Main Content */}
      {isMobile ? (
        <>
          {activeStep === 0 && <EventDetailsToUser />}

          {activeStep === 1 && <RegistrationForm />}

          {activeStep === 2 && <ConfirmationSection qrCode={qrCode} registrationComplete={registrationComplete} />}
        </>
      ) : (
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>

          {activeStep === 0 && <EventDetailsToUser />}

          {activeStep === 1 && <RegistrationForm  />}

          {activeStep === 2 && <ConfirmationSection qrCode={qrCode} registrationComplete={registrationComplete} />}
        </Paper>
      )}

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0 || isLoading}>
          Back
        </Button>

        <Box>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" component={Link} to="/events" sx={{ ml: 1 }}>
              Browse More Events
            </Button>
          ) : activeStep === 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
              sx={{ ml: 1, position: "relative" }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Register"}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext} sx={{ ml: 1 }}>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  )
}
