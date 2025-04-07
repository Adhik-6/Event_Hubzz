import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material"
import { Download as DownloadIcon, Edit as EditIcon } from "@mui/icons-material"
import { RegistrationsTable, DownloadModal, AnalyticsSummary } from "./../components/index.components.js"
import { mockRegistrations } from "./../assets/mockRegistrations.js"
import { mockEvents } from "./../assets/mockEvents.js"
import { useNavigate } from "react-router-dom"

export const Analytics = () => {
  const theme = useTheme()
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [activeTab, setActiveTab] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [event, setEvent] = useState(null)
  const [registrations, setRegistrations] = useState([])
  const [formFields, setFormFields] = useState([])
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  // Fetch event data and registrations
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Get the first event from mock data
      const eventData = mockEvents.find((e) => e.id === 1)
      setEvent(eventData)

      // Get registrations for this event
      const eventRegistrations = mockRegistrations.filter((reg) => reg.eventId === eventData.id)
      setRegistrations(eventRegistrations)

      // Extract form fields from the first registration (assuming all registrations have the same fields)
      if (eventRegistrations.length > 0) {
        const fields = Object.keys(eventRegistrations[0].formResponses).map((key) => ({
          id: key,
          label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
        }))
        setFormFields(fields)
      }

      setIsLoading(false)
    }, 1000)
  }, [])

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  // Handle download button click
  const handleDownloadClick = () => {
    setIsDownloadModalOpen(true)
  }

  // Handle download modal close
  const handleDownloadModalClose = () => {
    setIsDownloadModalOpen(false)
  }

  // Handle download with filename
  const handleDownload = (filename) => {
    // In a real app, this would generate and download an Excel file
    console.log(`Downloading registrations as ${filename}.xlsx`)

    setSnackbar({
      open: true,
      message: `File "${filename}.xlsx" downloaded successfully`,
      severity: "success",
    })

    setIsDownloadModalOpen(false)
  }

  // Handle edit button click
  const handleEditClick = () => {
    navigate("/create-event");
  }

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 6 }}>
      <>
        {/* Event Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                {event?.title || "Event Analytics"}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {event?.date
                  ? new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
                {event?.location ? ` • ${event.location}` : ""}
              </Typography>
            </Box>
            <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEditClick}>
              Edit Event
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              mt: 3,
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <Paper elevation={1} sx={{ p: 2, minWidth: 120, textAlign: "center" }}>
              <Typography variant="h5" fontWeight="bold" color="primary">
                {registrations.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Registrations
              </Typography>
            </Paper>

            <Paper elevation={1} sx={{ p: 2, minWidth: 120, textAlign: "center" }}>
              <Typography variant="h5" fontWeight="bold" color="primary">
                {event?.capacity || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Capacity
              </Typography>
            </Paper>

            <Paper elevation={1} sx={{ p: 2, minWidth: 120, textAlign: "center" }}>
              <Typography variant="h5" fontWeight="bold" color="primary">
                {event?.capacity ? Math.round((registrations.length / event.capacity) * 100) : 0}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Filled
              </Typography>
            </Paper>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
          >
            <Tab label="Summary" />
            <Tab label="Registrations" />
            <Tab label="Questions" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ mb: 4 }}>
          {activeTab === 0 && (
            <AnalyticsSummary registrations={registrations} formFields={formFields} event={event} />
          )}

          {activeTab === 1 && (
            <Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownloadClick}>
                  Download Excel
                </Button>
              </Box>

              <RegistrationsTable registrations={registrations} formFields={formFields} />
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Registration Form Questions
              </Typography>

              {formFields.map((field, index) => (
                <Paper key={field.id} elevation={1} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {index + 1}. {field.label}
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}
        </Box>
      </>

      {/* Download Modal */}
      <DownloadModal
        open={isDownloadModalOpen}
        onClose={handleDownloadModalClose}
        onDownload={handleDownload}
        defaultFilename={event?.title ? event.title.replace(/\s+/g, "_").toLowerCase() : "event_registrations"}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

