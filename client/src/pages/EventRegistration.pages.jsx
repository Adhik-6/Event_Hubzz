import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Box, Container, Typography, Paper, Button, Stepper, Step, StepLabel, Alert, CircularProgress, useTheme, useMediaQuery, Chip, Stack } from "@mui/material"
import toast from "react-hot-toast";

import { EventDetailsToUser, RegistrationForm, ConfirmationSection } from "./../components/index.components.js"

// import { mockEvents } from "./../assets/mockEvents.js"
import { useEventStore, useResponseStore } from "../stores/index.stores.js"
import { axiosInstance } from './../utils/index.utils.js'

export const EventRegistration = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const { setResFormFields, currentEvent, setCurrentEvent, registrationError, setRegistrationError, responseData } = useResponseStore();

  const { id } = useParams();
  const [qrCode, setQrCode] = useState("")
  // const [currentEvent, setEvent] = useState(null)
  // const { , setFormFields } = useEventStore()
  // const [formData, setFormData] = useState({})

  const [activeStep, setActiveStep] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [registrationComplete, setRegistrationComplete] = useState(false)
  // const [, setRegistrationError] = useState("")

  const steps = ["Event Details", "Registration Form", "Confirmation"]

  
  // Fetch Event data
  useEffect(() => {
    async function fetchEventDetails() {
      setIsLoading(true)
      try {
        const res = await axiosInstance(`/events/${id}`)
        setCurrentEvent(res.data.eventDetails)
        setResFormFields(res.data.eventDetails.formFields)
        // console.log("event details: ", res.data.eventDetails)
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Something went wrong")
      } finally{
        setIsLoading(false)
      }
    }
    fetchEventDetails()
  }, [id])

  // Handle form field change
  // const handleFieldChange = (fieldId, value) => {
  //   setFormData({
  //     ...formData,
  //     [fieldId]: value,
  //   })

  //   // Clear error when field is edited
  //   if (errors[fieldId]) {
  //     setErrors({
  //       ...errors,
  //       [fieldId]: null,
  //     })
  //   }

  //   // Clear registration error when any field is edited
  //   if (registrationError) {
  //     setRegistrationError("")
  //   }
  // }

  // Validate form
  // const validateForm = () => {
  //   const newErrors = {}

  //   responseFormFields.forEach((field) => {
  //     // Skip validation for conditional fields that aren't shown
  //     if (field.conditionalField && formData[field.conditionalField] !== field.conditionalValue) {
  //       return
  //     }

  //     if (field.required && !formData[field.id]) {
  //       newErrors[field.id] = `${field.label} is required`
  //     }

  //     // Email validation
  //     if (field.type === "email" && formData[field.id] && !/\S+@\S+\.\S+/.test(formData[field.id])) {
  //       newErrors[field.id] = "Please enter a valid email address"
  //     }

  //     // Phone validation
  //     if (field.type === "tel" && formData[field.id] && !/^\+?[0-9\s-()]{8,}$/.test(formData[field.id])) {
  //       newErrors[field.id] = "Please enter a valid phone number"
  //     }
  //   })

  //   setErrors(newErrors)
  //   return Object.keys(newErrors).length === 0
  // }

  // Handle next step
  const handleNext = () => {
    if (activeStep === 1) {
      // Validate form before proceeding to confirmation
      if (!validateForm()) {
        return
      }
    }

    setActiveStep((prevStep) => prevStep + 1)

    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)

    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Handle form submission
  const handleSubmit = async () => {
    // if (!validateForm()) {
    //   return
    // }

    setIsLoading(true)

    // try {
    //   // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 1500))

    //   // In a real app, you would call your registration API here
    //   // const response = await registrationService.register(eventId, formData);

    //   setRegistrationComplete(true)
    //   setActiveStep(2)
    // } catch (error) {
    //   setRegistrationError("An error occurred during registration. Please try again.")
    //   console.error("Registration error:", error)
    // } finally {
    //   setIsLoading(false)
    // }

    // console.log( "responseFormFields: ", responseFormFields, "\ncurrentEvent: ", currentEvent, "responseData: ", responseData)
    // console.log( "\ncurrentEvent: ", currentEvent, "responseData: ", responseData)
        
    try {
      let res = await axiosInstance.post(`/user/register/${id}`, responseData)
      if(!res.data.success) throw new Error(res.data.message)
      console.log("res: ", res)
      setQrCode(res.data.qrCode)
      setRegistrationComplete(true)
      setActiveStep(2)
    } catch (err) {
      setRegistrationError("An error occurred during registration. Please try again.")
      toast.error(err.response.data.message)
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

        {currentEvent?.status && (
          <Chip
            label={currentEvent.status.charAt(0).toUpperCase() + currentEvent.status.slice(1)}
            color={currentEvent.status === "upcoming" ? "primary" : currentEvent.status === "ongoing" ? "success" : "default"}
            sx={{ mb: 2 }}
          />
        )}
      </Stack>

      {/* Stepper */}
      <Stepper
        activeStep={activeStep}
        sx={{ mb: 4 }}
        alternativeLabel={!isMobile}
        orientation={isMobile ? "vertical" : "horizontal"}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Main Content */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        {registrationError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {registrationError}
          </Alert>
        )}

        {activeStep === 0 && <EventDetailsToUser />}

        {activeStep === 1 && (
          <RegistrationForm  />
        )}

        {activeStep === 2 && (
          <ConfirmationSection
            qrCode={qrCode}
            registrationComplete={registrationComplete}
          />
        )}
      </Paper>

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
