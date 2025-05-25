import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { Box, Container, Typography, Stepper, Step, StepLabel, Button, Paper, Divider, useMediaQuery, useTheme, CircularProgress } from "@mui/material"
import {
  CalendarMonth as CalendarIcon,
  PlaceOutlined as PlaceIcon,
  Person as PersonIcon,
  PeopleAltOutlined as PeopleIcon,
  CategoryOutlined as CategoryIcon,
  Info as InfoIcon,
} from "@mui/icons-material"
import { EventDetails, RegistrationTypeSelector, FormBuilder, FormPreview } from "./../components/index.components.js";
import { useEventStore, useAuthStore } from "../stores/index.stores.js";
import { axiosInstance, formatDateTime } from './../utils/index.utils.js'
import placeHolderImage from "./../assets/placeHolderImage.jpeg"


export const CreateEvent = () => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))
  const { isStepValid, eventDetails, externalUrl, setEventDetailsAll, activeStep, setActiveStep, formFields, setFormFieldsAll } = useEventStore()
  const { user } = useAuthStore()

  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const [isLoadingEvent, setIsLoadingEvent] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const id = useParams()?.id || false

  const steps = ["Event Details", "Registration Setup", `Review & ${id?"save":"Create"}`]
  const linkStyle = {
    textDecoration: "none",
    color: "#1976d2", // Material-UI primary blue
    fontWeight: "500",
    transition: "color 0.3s",
    "&:hover": {
      color: "#1565c0", // darker blue on hover
      textDecoration: "underline",
    },
  };

  // const { currentEvent } = useResponseStore();

  // console.log("currentEvent: ", currentEvent)
  
  useEffect(() => {
    // console.log("useEffect called...")
    setEventDetailsAll({
      title: "",
      description: "",
      venue: "",
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      capacity: "",
      category: "",
      eventImage: null,
      registrations: 0, // not needed
      organiser: user.organization || user.fullName
    })
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
        setEventDetailsAll(res.data?.eventDetails)
        setFormFieldsAll(res.data?.eventDetails?.formFields)
        // console.log("api res: ", res.data.eventDetails)
      } catch (err) {
        console.log("error while fetching in updating", err)
        toast.error(err.message)
      } finally {
        setIsLoadingEvent(false)
      }
    }
    apiCall()
  }, [location, id])

  useEffect(() => setActiveStep(0) ,[])


  // Handle next step
  const handleNext = () => {
    setActiveStep("next")
  }

  // // Handle back step
  const handleBack = async () => {
    if(!id){
      setActiveStep("back")
      return
    } 
    setIsDeleteLoading(true)

    try {
      if (!window.confirm("Are you sure you want to delete this event?")) return;

      const res = await axiosInstance.delete(`/events/organiser/delete-event/${id}`);
      if (!res.data?.success) throw new Error(res.data?.message);
      toast.success("Event deleted successfully!");
      navigate("/profile");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data?.message || "Failed to delete the event.");
    } finally {
      setIsDeleteLoading(false)
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    // console.log("Event Details:", eventDetails)
    // console.log("Registration Type:", registrationType)
    // console.log("External URL:", externalUrl)
    // console.log("Form Fields:", formFields)

    setIsLoading(true)
    try {
      const res = await axiosInstance.post(`/events/organiser/${id?"update":"create"}-event`, {eventDetails, externalUrl, formFields })
      if(res.data?.success){
        toast.success(`Event ${id?"edited":"created"} successfully!`)
        navigate(`${id?`/profile/analytics/${id}`:"/events"}`)
      } else{
        toast.error(res.data?.message || "Something went wrong")
      }
    } catch (err) {
      console.log("Error creating event", err)
      toast.error(err.response?.data?.message || "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  // Render step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <EventDetails />
      case 1: 
        return (
          <Box>
            <RegistrationTypeSelector/>

            {externalUrl !== "custom" && (
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
                  <Typography variant="body2" sx={{mt: 1, ml: 0.5}}>{(typeof eventDetails.organiser === 'object')?eventDetails.organiser.organization:eventDetails.organiser}</Typography>
                </Box>
    
                {/* registration */}
                <Box>
                  <PeopleIcon sx={{ mr: 1, color: "secondary.main" }} />
                  <Typography variant="caption" color="text.secondary">Registrations</Typography>
                  <Typography variant="body2" sx={{mt: 1, ml: 0.5}}>{ eventDetails.capacity?`0 / ${eventDetails.capacity}`:"No registration limits"}</Typography>
                </Box>
              </Box>

              { eventDetails?.additionalInfo &&(
                <Box sx={{ mt: 4 }}>
                  <Divider sx={{ mb: 3 }} />
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <InfoIcon sx={{ mr: 1, mt: 0.5, color: "info.main" }} />
                    <Typography variant="body1">{eventDetails?.additionalInfo}</Typography>
                  </Box>
                </Box>
              )}

            </Paper>

            <Typography variant="h6" gutterBottom>Registration Method</Typography>

            <Paper elevation={1} sx={{ p: 3 }}>
              
              <Typography variant="body1">
                {externalUrl !== "" ? (
                  <>
                    External registration form URL - <Typography component={Link} to={externalUrl} style={linkStyle}>{externalUrl}</Typography>
                  </>
                ) : (
                  "Custom registration form"
                )}
              </Typography>


              {externalUrl === "" && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>Form Preview</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <FormPreview />
                </Box>
              )}
            </Paper>
          </Box>
        )
      default:
        return <EventDetails />
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
            <StepLabel>{label}</StepLabel>
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
        <>
        {isMobile ? (
          <>
            <Typography variant="h6" gutterBottom>
              {steps[activeStep]}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="p" sx={{mb: 3, mt: 0}}> Provide the basic details about your event. </Typography>
            {getStepContent(activeStep)}
          </>
        ) : (
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                {steps[activeStep]}
              </Typography>
              <Typography variant="body2" color="text.secondary" component="p" sx={{mb: 3, mt: 0}}> Provide the basic details about your event. </Typography>
            {getStepContent(activeStep)}
          </Paper>
        )}
        </>
      )}

      {/* Back and next button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" color={id?"error":""} disabled={activeStep === 0 && !id} onClick={handleBack}>
          {isDeleteLoading ? <CircularProgress size={24} color="inherit" /> : (id ? "Delete Event" : "Back")}
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button variant="contained" onClick={handleSubmit} sx={{color: "white"}}>
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
