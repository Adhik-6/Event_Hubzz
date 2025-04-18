import { Box, Container, Typography, Stepper, Step, StepLabel, Button, Paper, Divider, useMediaQuery, useTheme, CircularProgress } from "@mui/material"
import {
  CalendarMonth as CalendarIcon,
  PlaceOutlined as PlaceIcon,
  // AccessTime as TimeIcon,
  Person as PersonIcon,
  PeopleAltOutlined as PeopleIcon,
  CategoryOutlined as CategoryIcon,
  Info as InfoIcon,
} from "@mui/icons-material"
import { EventDetails, RegistrationTypeSelector, FormBuilder, FormPreview } from "./../components/index.components.js";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEventStore, useResponseStore } from "../stores/index.stores.js";
import { axiosInstance, formatDateTime } from './../utils/index.utils.js'
import { useState, useEffect } from "react";
import placeHolderImage from "./../assets/placeHolderImage.jpeg"
import toast from "react-hot-toast";


export const CreateEvent = () => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))
  const { isStepValid, registrationType, eventDetails, externalUrl, setEventDetailsAll, activeStep, setActiveStep, formFields, setFormFieldsAll } = useEventStore()

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingEvent, setIsLoadingEvent] = useState(false)
  const navigate = useNavigate()
  const id = useParams()?.id || false

  const steps = ["Event Details", "Registration Setup", `Review & ${id?"save":"Create"}`]

  // const { currentEvent } = useResponseStore();

  // console.log("currentEvent: ", currentEvent)
  
  useEffect(() => {
    // console.log("useEffect called...")
    if(!id) return
    // if(currentEvent && Object.keys(currentEvent).length > 0){
    //   setEventDetailsAll(currentEvent)
    //   setFormFieldsAll(currentEvent.formFields)
    //   console.log("currentEvent: ", currentEvent)
    //   return
    // }
    async function apiCall(){
      // console.log("API called...")
      try {
        setIsLoadingEvent(true)
        const res = await axiosInstance.get(`events/${id}`)
        setEventDetailsAll(res.data.eventDetails)
        setFormFieldsAll(res.data.eventDetails.formFields)
        console.log("api res: ", res.data.eventDetails)
      } catch (err) {
        console.log("error while fetching in updating", err)
        toast.error(err.message)
      } finally {
        setIsLoadingEvent(false)
      }
    }
    apiCall()
  }, [])

  // const { state } = useLocation();
  // const isEditMode = useLocation().state?.isEditMode || false;
  // console.log("isEditMode:", isEditMode);

  // Event details state  \\
  // const [eventDetails, setEventDetails] = useState({
  //   title: "",
  //   description: "",
  //   venue: "",
  //   startDate: null,
  //   endDate: null,
  //   startTime: null,
  //   endTime: null,
  //   capacity: "",
  //   category: "",
  //   image: null,
  //   imagePreview: null,
  // })

  // Registration type state  \\\
  // const [registrationType, setRegistrationType] = useState("custom")
  //  \\\
  // const [externalUrl, setExternalUrl] = useState("")

  // Form builder state \\\
  // const [formFields, setFormFields] = useState([
  //   {
  //     id: "name",
  //     type: "text",
  //     label: "Full Name",
  //     required: true,
  //     placeholder: "Enter your full name",
  //     options: [],
  //   },
  //   {
  //     id: "email",
  //     type: "text",
  //     label: "Email Address",
  //     required: true,
  //     placeholder: "Enter your email address",
  //     options: [],
  //   },
  // ])


  // // Handle event details change  \\\
  // const handleEventDetailsChange = (field, value) => {
  //   setEventDetails({
  //     ...eventDetails,
  //     [field]: value,
  //   })
  // }

  // // Handle image upload  -  \\\
  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       setEventDetails({
  //         ...eventDetails,
  //         EventImage: reader.result,
  //       })
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

  // // Handle registration type change  \\\
  // const handleRegistrationTypeChange = (type) => {
  //   setRegistrationType(type)
  // }

  // // Handle external URL change  \\\
  // const handleExternalUrlChange = (url) => {
  //   setExternalUrl(url)
  // }

  // Handle next step
  const handleNext = () => {
    setActiveStep("next")
  }

  // // Handle back step
  const handleBack = () => {
    setActiveStep("back")
  }

  // Handle form submission
  const handleSubmit = async () => {
    // In a real application, you would send the data to your backend here
    // console.log("Event Details:", eventDetails)
    // console.log("Registration Type:", registrationType)
    // console.log("External URL:", externalUrl)
    // console.log("Form Fields:", formFields)

    // try implementing a circular progress, try-catch, error handling, backend
    setIsLoading(true)
    try {
      const res = await axiosInstance.post(`/events/organiser/${id?"update":"create"}-event`, {eventDetails, registrationType, externalUrl, formFields })
      if(res.data.success){
        toast.success(`Event ${id?"edited":"created"} successfully!`)
        navigate(`${id?`/profile/analytics/${id}`:"/events"}`)
      } else{
        toast.error(res.message)
      }
    } catch (err) {
      console.log(err)
      console.log("Error message", err.message)
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Validate current step \\\
  // const isStepValidx = () => {
  //   if (activeStep === 0) {
  //     // Validate event details
  //     return (
  //       eventDetails.title.trim() !== "" &&
  //       eventDetails.venue.trim() !== "" &&
  //       eventDetails.startDate !== null &&
  //       eventDetails.startTime !== null &&
  //       eventDetails.capacity.trim() !== "" &&
  //       eventDetails.category.trim() !== ""
  //     )
  //   } else if (activeStep === 1) {
  //     // Validate registration setup
  //     if (registrationType === "external") {
  //       return externalUrl.trim() !== ""
  //     } else {
  //       return formFields.length > 0
  //     }
  //   }

  //   return true
  // }


  // Render step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <EventDetails />
        )
      case 1: 
        return (
          <Box>
            <RegistrationTypeSelector/>

            {registrationType === "custom" && (
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Custom Registration Form
                </Typography>
                <Typography variant="body2" color="text.secondary" component="p">
                  Build your custom registration form by adding and configuring fields below.
                </Typography>

                <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 3, mt: 3 }}>
                  <Box sx={{ flex: 1 }}>
                    <FormBuilder/>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Paper elevation={2} sx={{ p: 3, pt:6,bgcolor: "background.paper", position: "sticky", top: 20}}>
                      <Typography variant="h6" gutterBottom> Form Preview </Typography>
                      <Divider sx={{ mb: 3 }} />
                      <FormPreview />
                    </Paper>
                  </Box>
                  
                </Box>
              </Box>
            )}
          </Box>
        )
      case 2:
        return (
          <Box>
            {/* { console.log("eventDetails: ", eventDetails) }
            { console.log("formFields: ", formFields) } */}
            <Typography variant="h6" gutterBottom>
              Review Event Details
            </Typography>

            <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {eventDetails.title || "Event Title"}
              </Typography>

              <Box sx={{ mt: 2, mb: 2, maxHeight: 200, overflow: "hidden", borderRadius: 1 }}>
                <img
                  src={eventDetails.eventImage || placeHolderImage}
                  alt="Event"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "0% auto" }}
                />
              </Box>

              {/* Description */}
              <Typography variant="body2" paragraph>
                {eventDetails.description || "No description provided."}
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
    
                {/* Start date & time */}
                <Box>
                  <CalendarIcon sx={{ mr: 1, color: "secondary.main" }} />
                  <Typography variant="caption" color="text.secondary">Start Date & Time</Typography>
                  <Typography variant="body2" sx={{mt: 1, ml: 0.5}}>{eventDetails.startDate && eventDetails.startTime ? formatDateTime(eventDetails.startDate, eventDetails.startTime): "Not specified"}</Typography>
                </Box>
    
                {/* End date & time */}
                <Box>
                  <CalendarIcon sx={{ mr: 1, color: "secondary.main" }} />
                  <Typography variant="caption" color="text.secondary">End Date & Time</Typography>
                  <Typography variant="body2" sx={{mt: 1, ml: 0.5}}>{eventDetails.endDate && eventDetails.endTime? formatDateTime(eventDetails.endDate, eventDetails.endTime): "Not specified"}</Typography>
                </Box>
    
                {/* Venue */}
                <Box>
                  <PlaceIcon sx={{ mr: 1, color: "secondary.main" }} />
                  <Typography variant="caption" color="text.secondary">Venue</Typography>
                  <Typography variant="body2" sx={{mt: 1, ml: 0.5}}>{eventDetails.venue || "Not specified"}</Typography>
                </Box>
    
                {/* Category */}
                <Box>
                  <CategoryIcon sx={{ mr: 1, color: "secondary.main" }} />
                  <Typography variant="caption" color="text.secondary">Category</Typography>
                  <Typography variant="body2" sx={{mt: 1, ml: 0.5}}>{eventDetails.category || "Not specified"}</Typography>
                </Box>
                
                {/* Organiser */}
                <Box>
                  <PersonIcon sx={{ mr: 1, color: "secondary.main" }} />
                  <Typography variant="caption" color="text.secondary">Organized by</Typography>
                  <Typography variant="body2" sx={{mt: 1, ml: 0.5}}>{eventDetails.organiser.organization}</Typography>
                </Box>
    
                {/* registration */}
                <Box>
                  <PeopleIcon sx={{ mr: 1, color: "secondary.main" }} />
                  <Typography variant="caption" color="text.secondary">Registrations</Typography>
                  <Typography variant="body2" sx={{mt: 1, ml: 0.5}}>{ eventDetails.capacity?`0 / ${eventDetails.capacity}`:"No registration limits"}</Typography>
                </Box>
              </Box>

              { eventDetails.additionalInfo &&(
                <Box sx={{ mt: 4 }}>
                  <Divider sx={{ mb: 3 }} />
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <InfoIcon sx={{ mr: 1, mt: 0.5, color: "info.main" }} />
                    <Typography variant="body1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, incidunt in inventore iure ipsum voluptas repellendus, maiores fuga dicta sit eveniet nobis perferendis illo. Ea, nam? Ut doloremque voluptas repudiandae.
                    Dicta, accusamus repudiandae. Adipisci error mollitia unde ad eveniet tempore vero? Veniam in pariatur laboriosam odit est maxime voluptas magni architecto tenetur? Cum voluptate aliquam vero nesciunt enim quia aliquid?
                    Saepe quia praesentium aspernatur quidem a sequi minima, doloremque pariatur consequatur eaque nisi, facilis sunt dicta vitae nam dolor velit eligendi expedita? Accusamus inventore culpa harum nulla vitae recusandae autem?</Typography>
                  </Box>
                </Box>
              )}

            </Paper>

            <Typography variant="h6" gutterBottom>
              Registration Method
            </Typography>

            <Paper elevation={1} sx={{ p: 3 }}>
              
              <Typography variant="body1">
                {registrationType === "external"
                  ? `External registration form: ${externalUrl}`
                  : "Custom registration form"}
              </Typography>

              {registrationType === "custom" && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Form Preview
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <FormPreview />
                </Box>
              )}
            </Paper>
          </Box>
        )
      default:
        return "Unknown step"
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 7 }}>
      {/* Static heading */}
      {/* {console.log("edit mode: ", isEditMode)} */}
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom> {`${id?"Edit":"Create new"} event`}
      </Typography>

      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel={!isMobile}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{!isMobile && label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/*  Main content */}
      { isLoadingEvent? (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <CircularProgress />
          </Box>
        </Container>
      ) : (
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          {isMobile && (
            <Typography variant="h6" gutterBottom>
              {steps[activeStep]}
            </Typography>
          )}
  
          {getStepContent(activeStep)}
        </Paper>
      )}

      {/* Back and next button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button variant="contained" onClick={handleSubmit} disabled={!isStepValid()} sx={{color: "white"}}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : (id?"Update":"Create") }
          </Button>
        ) : (
            <Button variant="contained" onClick={handleNext} disabled={!isStepValid()} sx={{color: "white"}}>
              Next
            </Button>
        )}
      </Box>

    </Container>
  )
}
