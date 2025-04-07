import { Box, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Button, InputAdornment, FormHelperText, Tooltip } from "@mui/material"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material"
import { useEffect } from "react"
import { useEventStore } from "../stores/index.stores.js"
// import and use Event store. copy paste onTimageUpload function here. inherit other 2 from event store

const categories = [
  "Technology",
  "Business",
  "Education",
  "Entertainment",
  "Arts & Culture",
  "Health & Wellness",
  "Sports & Fitness",
  "Food & Drink",
  "Community & Causes",
  "Other",
]

export const EventDetails = () => {
  const { eventDetails, setEventDetails, handleImageUpload } = useEventStore();
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom> Event Information </Typography>
      <Typography variant="body2" color="text.secondary" component="p" sx={{mb: 2, mt: 3}}> Provide the basic details about your event. </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField required fullWidth label="Event Title" value={eventDetails.title} onChange={(e) => setEventDetails("title", e.target.value)} placeholder="Enter a descriptive title for your event" helperText="A clear title helps attendees understand what your event is about"/>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField fullWidth multiline rows={3} label="Event Description" value={eventDetails.description} onChange={(e) => setEventDetails("description", e.target.value)} placeholder="Describe your event, what attendees can expect, and why they should attend" helperText="Provide a detailed description to attract potential attendees" />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField required fullWidth label="Venue" value={eventDetails.venue} onChange={(e) => setEventDetails("venue", e.target.value)} placeholder="Enter the event location" helperText="Physical address or online platform"/>
        </Grid>

        {/* Category */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select value={eventDetails.category} label="Category" onChange={(e) => setEventDetails("category", e.target.value)}>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select the category that best fits your event</FormHelperText>
          </FormControl>
        </Grid>

        {/* start date */}
        <Grid item xs={12} md={6}>
          <DatePicker selected={eventDetails.startDate} onChange={(date) => setEventDetails("startDate", date)} dateFormat="dd/MM/yyyy" placeholderText="DD/MM/YYYY" customInput={<TextField fullWidth label="Start Date *" helperText="When does your event start?" InputLabelProps={{ shrink: true }} />}/>
        </Grid>

        {/* Start time */}
        <Grid item xs={12} md={6}>
          <DatePicker selected={eventDetails.startTime} onChange={(date) => setEventDetails('startTime', date)} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" placeholderText="HH:MM PM"  dateFormat="hh:mm aa" customInput={
            <TextField fullWidth label="Start Time *" helperText="What time does your event start?" InputLabelProps={{ shrink: true }} />
          }/>
        </Grid>

        {/* End date */}
        <Grid item xs={12} md={6}>
          <DatePicker selected={eventDetails.endDate} onChange={(date) => setEventDetails("endDate", date)} dateFormat="dd/MM/yyyy" placeholderText="DD/MM/YYYY" customInput={<TextField fullWidth label="End Date *" helperText="When does your event end?" InputLabelProps={{ shrink: true }} />} />
        </Grid>

          {/* End time */}
        <Grid item xs={12} md={6}>
          <Tooltip title="In case of same date, end time should be greater than start time" placement="bottom-start" sx={{width: "fit-content"}}>
          <div>
          <DatePicker selected={eventDetails.endTime} onChange={(time) => setEventDetails('endTime', time)} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="hh:mm aa" placeholderText="HH:MM PM" customInput={
              <TextField fullWidth label="End Time *" helperText="What time does your event end?" InputLabelProps={{ shrink: true }} />
            }/>
          </div>
          </Tooltip>
        </Grid>

        {/* Capacity */}
        <Grid item xs={12} md={6}>
          <TextField fullWidth type="number" label="Maximum Capacity" value={eventDetails.capacity} onChange={(e) => setEventDetails("capacity", e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">participants</InputAdornment>,
            }}
            inputProps={{ min: 1 }}
            helperText="Maximum number of participants allowed"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Event Image
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Upload an image that represents your event. This will be displayed on the event listing.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
              border: "1px dashed",
              borderColor: "divider",
              borderRadius: 1,
            }}
          >
            {eventDetails.eventImage ? (
              <Box sx={{ position: "relative", width: "100%", maxWidth: 400 }}>
                <img
                  src={eventDetails.eventImage || "/placeholder.svg"}
                  alt="Event preview"
                  style={{ width: "100%", borderRadius: 8 }}
                />
                <Button
                  variant="contained"
                  size="small"
                  sx={{ position: "absolute", bottom: 8, right: 8 }}
                  onClick={() => setEventDetails("eventImage", null)}
                >
                  Change
                </Button>
              </Box>
            ) : (
              <>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="event-image-upload"
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="event-image-upload">
                  <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />}>
                    Upload Image
                  </Button>
                </label>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                  Recommended size: 1200 x 600 pixels (16:9 ratio)
                </Typography>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
