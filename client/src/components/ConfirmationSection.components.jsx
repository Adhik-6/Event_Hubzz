import { Box, Typography, Paper, Divider, Grid, Alert, Button, List, ListItem, ListItemText, Card, CardMedia } from "@mui/material"
import { CheckCircle as CheckCircleIcon, Download as DownloadIcon } from "@mui/icons-material"
import { useResponseStore } from "../stores/index.stores.js"
import { formatDateTime } from './../utils/index.utils.js'

export const ConfirmationSection = ({ qrCode, registrationComplete }) => {

  const { responseFormFields, currentEvent, responseData } = useResponseStore();

  if (!currentEvent || !registrationComplete) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          Registration Pending
        </Typography>
        <Typography variant="body1" paragraph>
          Please complete the registration form to proceed.
        </Typography>
      </Box>
    )
  }

  // Generate a random confirmation number
  const confirmationNumber = `EVT-${Math.floor(100000 + Math.random() * 900000)}`

  // Format date
  // const formatDate = (dateString) => {
  //   const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  //   return new Date(dateString).toLocaleDateString("en-US", options)
  // }

  // Get field label by id
  const getFieldLabel = (fieldId) => {
    const field = responseFormFields.find((f) => f.id === fieldId)
    return field ? field.label : fieldId
  }

  // Get option label by value
  const getOptionLabel = (fieldId, value) => {
    const field = responseFormFields.find((f) => f.id === fieldId)
    if (!field || !field.options) return value

    const option = field.options.find((opt) => opt.value === value)
    return option ? option.label : value
  }

  // Format field value for display
  const formatFieldValue = (fieldId, value) => {
    if (value === undefined || value === null || value === "") return "Not provided"

    const field = responseFormFields.find((f) => f.label === fieldId)
    console.log("field:", field)
    console.log("fieldId:", fieldId)
    console.log("value:", value)
    if (!field) return value

    if (field.type === "checkbox" && Array.isArray(value)) {
      if (value.length === 0) return "None selected"
      return value.map((v) => getOptionLabel(fieldId, v)).join(", ")
    }

    if (field.type === "multiple_choice" || field.type === "dropdown") {
      return getOptionLabel(fieldId, value)
    }

    return value
  }

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = currentEvent.title ? `${currentEvent.title.replace(" ", "_")}.png` : "QR_Code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
          Registration Successful!
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for registering for {currentEvent.title}. Your registration has been confirmed.
        </Typography>
        {/* <Alert severity="success" sx={{ mb: 3, mx: "auto", maxWidth: 500 }}>
          <Typography variant="body1" fontWeight="medium">
            Confirmation Number: {confirmationNumber}
          </Typography>
        </Alert> */}
        <Card sx={{ maxWidth: 250, borderRadius: 3, boxShadow: 3, mx: "auto", mb: 2 }}>
        <CardMedia
          component="img"
          // height=""
          image={qrCode}
          alt="QR code"
          sx={{
            objectFit: "cover",
            transition: "0.3s",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />
        </Card>
        <Typography variant="body2" color="text.secondary">
          A confirmation email has been sent along with a QR code to {responseData.email} with all the details.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Show the QR code at the venue entry.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Event Details */}
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
              Event Details
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <List disablePadding>
              <ListItem disableGutters divider>
                <ListItemText
                  primary="Event"
                  secondary={currentEvent.title}
                  primaryTypographyProps={{ color: "text.secondary", variant: "body2" }}
                  secondaryTypographyProps={{ color: "text.primary", variant: "body1", fontWeight: "medium" }}
                />
              </ListItem>

              <ListItem disableGutters divider>
                <ListItemText
                  primary="Start date & time"
                  secondary={formatDateTime(currentEvent.startDate, currentEvent.startTime)}
                  primaryTypographyProps={{ color: "text.secondary", variant: "body2" }}
                  secondaryTypographyProps={{ color: "text.primary", variant: "body1" }}
                />
              </ListItem>
            
              <ListItem disableGutters divider>
                <ListItemText
                  primary="End date & time"
                  secondary={formatDateTime(currentEvent.endDate, currentEvent.endTime)}
                  primaryTypographyProps={{ color: "text.secondary", variant: "body2" }}
                  secondaryTypographyProps={{ color: "text.primary", variant: "body1" }}
                />
              </ListItem>

              {/* <ListItem disableGutters divider>
                <ListItemText
                  primary="Time"
                  secondary={currentEvent.startTime || "9:00 AM - 5:00 PM"}
                  primaryTypographyProps={{ color: "text.secondary", variant: "body2" }}
                  secondaryTypographyProps={{ color: "text.primary", variant: "body1" }}
                />
              </ListItem> */}

              <ListItem disableGutters>
                <ListItemText
                  primary="Location"
                  secondary={currentEvent.venue}
                  primaryTypographyProps={{ color: "text.secondary", variant: "body2" }}
                  secondaryTypographyProps={{ color: "text.primary", variant: "body1" }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Registration Details */}
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
              Registration Details
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <List disablePadding>
              {Object.entries(responseData).map(([fieldId, value]) => {
                // Skip empty values and conditional fields that aren't shown
                if (!value || (Array.isArray(value) && value.length === 0)) return null

                const field = responseFormFields.find((f) => f.id === fieldId)
                if (field?.conditionalField && responseData[field.conditionalField] !== field.conditionalValue) return null

                return (
                  <ListItem key={fieldId} disableGutters divider>
                    <ListItemText
                      primary={getFieldLabel(fieldId)}
                      secondary={formatFieldValue(fieldId, value)}
                      primaryTypographyProps={{ color: "text.secondary", variant: "body2" }}
                      secondaryTypographyProps={{ color: "text.primary", variant: "body1" }}
                    />
                  </ListItem>
                )
              })}

              {/* <ListItem disableGutters>
                <ListItemText
                  primary="Confirmation Number"
                  secondary={confirmationNumber}
                  primaryTypographyProps={{ color: "text.secondary", variant: "body2" }}
                  secondaryTypographyProps={{ color: "text.primary", variant: "body1", fontWeight: "medium" }}
                />
              </ListItem> */}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body1" paragraph>
          If you have any questions or need to make changes to your registration, please contact the event organizer.
        </Typography>

        <Button variant="outlined" onClick={() => window.print()} sx={{ mr: 2 }}>
          Print Confirmation
        </Button>

        <Button variant="contained" startIcon={<DownloadIcon />} onClick={downloadImage} >
          Download QR
        </Button>
      </Box>
    </Box>
  )
}
