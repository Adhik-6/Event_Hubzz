import { Box, Typography, TextField, FormControl, FormControlLabel, FormLabel, FormGroup, FormHelperText, Radio, RadioGroup, Checkbox, Select, MenuItem, InputLabel, Divider, Paper } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router-dom"
import { useResponseStore } from "../stores/index.stores.js"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

// import { DatePicker, LocalizationProvider, AdapterDateFns } from '@mui/x-date-pickers';
// import toast from "react-hot-toast";
// import { axiosInstance } from "../utils/index.utils.js";

export const RegistrationForm = () => {

  const { responseFormFields, currentEvent, responseData, setResponseData, setRegistrationError, registrationError } = useResponseStore()

  // Check if a conditional field should be shown
  // const shouldShowField = (field) => {
  //   if (!field.conditionalField) return true
  //   return formData[field.conditionalField] === field.conditionalValue
  // }

  // const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  

    // Handle form field change
  const handleFieldChange = (fieldName, value) => {
    // console.log(responseFormFields)
    setResponseData(fieldName, value)

    // Clear error when field is edited
    if (errors[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: null,
      })
    }

    // Clear registration error when any field is edited
    if (registrationError) {
      setRegistrationError("")
    }
  }
  

  // Render a form field based on its type
  const renderField = (field) => {
    // if (!shouldShowField(field)) return null
    // console.log("field: ", field)

    switch (field.type) {
      case "text":
        return (
          <TextField
            fullWidth
            variant="standard"
            id={field.id}
            // name={field.id}
            label={field.label}
            type={field.type}
            value={responseData[field.label] || ""}
            onChange={(e) => handleFieldChange(field.label, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            error={!!errors[field.id]}
            helperText={errors[field.id]}
            // margin="normal"
          />
        )

      case "multiline":
        return (
          <TextField
            fullWidth
            variant="standard"
            id={field.id}
            // name={field.id}
            label={field.label}
            value={responseData[field.label] || ""}
            onChange={(e) => handleFieldChange(field.label, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            error={!!errors[field.id]}
            helperText={errors[field.id]}
            // margin="normal"
            multiline
            rows={4}
          />
        )

      case "dropdown":
        return (
          <FormControl fullWidth margin="normal" error={!!errors[field.id]} required={field.required}>
            <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
            <Select
              labelId={`${field.id}-label`}
              name={field.id}
              value={responseData[field.label] || ""}
              onChange={(e) => handleFieldChange(field.label, e.target.value)}
              label={field.label}
            >
              {field.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
            {errors[field.id] && <FormHelperText>{errors[field.id]}</FormHelperText>}
          </FormControl>
        )

      case "multiple_choice":
        return (
          <FormControl component="fieldset" margin="normal" error={!!errors[field.id]} required={field.required}>
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              name={field.id}
              value={responseData[field.label] || ""}
              onChange={(e) => handleFieldChange(field.label, e.target.value)}
            >
              {field.options.map((option) => (
                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.value} />
              ))}
            </RadioGroup>
            {errors[field.id] && <FormHelperText>{errors[field.id]}</FormHelperText>}
          </FormControl>
        )
      case "checkbox":
        return (
          <FormControl component="fieldset" margin="normal" error={!!errors[field.id]} required={field.required}>
            <FormLabel component="legend">{field.label}</FormLabel>
            <FormGroup>
              {field.options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={responseData[field.label]?.includes(option.value) || false}
                      onChange={(e) => {
                        const currentValues = responseData[field.label] || []
                        const newValues = e.target.checked
                          ? [...currentValues, option.value]
                          : currentValues.filter((value) => value !== option.value)
                        handleFieldChange(field.label, newValues)
                      }}
                      name={option.id}
                    />
                  }
                  label={option.value}
                />
              ))}
            </FormGroup>
            {errors[field.id] && <FormHelperText>{errors[field.id]}</FormHelperText>}
          </FormControl>
        )

      case "date":
        return(
          <Box>
            <Typography variant="subtitle1" gutterBottom>{field.label}{field.required && <span> *</span>}
            </Typography>
            <DatePicker
              // value={responseData[field.label] || ""}
              selected={responseData[field.label] || ""}
              onChange={(date) => handleFieldChange(field.label, date.toISOString())}
              placeholderText="DD/MM/YYYY"
              dateFormat="dd/MM/yyyy"
              customInput={<TextField fullWidth required={field.required} />}
            />
            {/* <DatePicker selected={eventDetails.startDate} onChange={(date) => setEventDetails("startDate", date)} dateFormat="dd/MM/yyyy" placeholderText="DD/MM/YYYY" customInput={<TextField fullWidth label="Start Date *" helperText="When does your event start?" InputLabelProps={{ shrink: true }} />}/> */}
          </Box>
        )
        
      case 'time':
        return (
          <Box>
            <Typography variant="subtitle1" gutterBottom>{field.label}{field.required && <span> *</span>}
            </Typography>
            <DatePicker
              showTimeSelect showTimeSelectOnly timeCaption="Time" 
              selected={responseData[field.label] || ""}
              // value={}
              onChange={(time) => handleFieldChange(field.label, time.toISOString())}
              timeIntervals={15}
              dateFormat="hh:mm aa"
              placeholderText="HH:MM PM"
              customInput={<TextField fullWidth required={field.required} />}
            />
            {/* <DatePicker selected={eventDetails.startTime} onChange={(date) => setEventDetails('startTime', date)} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" placeholderText="HH:MM PM"  dateFormat="hh:mm aa" customInput={ <TextField fullWidth label="Start Time *" helperText="What time does your event start?" InputLabelProps={{ shrink: true }} /> }/> */}
          </Box>
        )

      default:
        return null
    }
  }

  // Group fields by section (optional)
  // const personalInfoFields = formFields.filter((field) =>
  //   ["name", "email", "phone", "organization", "jobTitle"].includes(field.id),
  // )

  // const eventSpecificFields = formFields.filter(
  //   (field) => !["name", "email", "phone", "organization", "jobTitle"].includes(field.id),
  // )


  return (
    <Box>
      {/* { console.log(responseFormFields) } */}
      {/* change the heading based on external form URL, provide an uneditable field for form URL, if possible create a new compnent itself */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          Registration Form
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Please fill out the form below to register for this event.
        </Typography>
        <Divider sx={{ mb: 4 }} />
        {currentEvent.externalUrl ?(
            <>
              <Typography variant="h6" component={Link} to={`${currentEvent.externalUrl}`} fontWeight="medium" gutterBottom>
                External Form URL
              </Typography>
              <Divider sx={{ mb: 2 }} />
              { responseFormFields.map((field) => (
                <Box key={field._id} sx={{ mb: 3 }}>{renderField(field)}</Box>
              ))}
            </>
          ): (
            responseFormFields.map((field) => (
              <Box key={field._id} sx={{ mb: 3 }}>{renderField(field)}</Box>
            ))
          )
        }
      </Paper>

      {/* Personal Information Section */}
      {/* <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" component="h3" fontWeight="medium" gutterBottom>
          Registration Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {formFields.map((field) => (
          <Box key={field._id}>{renderField(field)}</Box>
        ))}
      </Paper> */}

      {/* Event Specific Information Section */}
      {/* <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" component="h3" fontWeight="medium" gutterBottom>
          Event Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {eventSpecificFields.map((field) => (
          <Box key={field.id}>{renderField(field)}</Box>
        ))}
      </Paper> */}
    </Box>
  )
}

