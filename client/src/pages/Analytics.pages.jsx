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
import { Link, useParams } from "react-router-dom"
import { useAnalyticsStore } from "../stores/index.stores.js"
import toast from "react-hot-toast"
import { axiosInstance, formatDateForTable } from './../utils/index.utils.js'
import * as XLSX from 'xlsx'

export const Analytics = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const { analytics_currentEvent, summaryData, setAnalyticsEvent, setSummaryData, filteredRegistrations } = useAnalyticsStore();

  useEffect(() => {
    setIsLoading(true)
    // console.log("useEffect is running")
    async function getAnalytics() {
      // console.log("getAnalytics is running")
      try {
        const res1 = axiosInstance.get(`/events/${id}`)
        const res2 = axiosInstance.get(`/analytics/event-summary/${id}`)
        const [resEvents, resSummary] = await Promise.all([res1, res2])
        if(!resEvents.data.success || !resSummary.data.success) throw new Error("Something went wrong")
        setAnalyticsEvent(resEvents.data.eventDetails)
        setSummaryData(resSummary.data.dbRes)
        // console.log("resEvents:", resEvents.data.eventDetails)
        // console.log("resSummary:", resSummary.data.dbRes)
      } catch (err) {
        console.log("Error fetching analysis", err)
        toast.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    getAnalytics()
  }, [])

  // Handle download with filename
  const handleDownload = (filename) => {
    setIsDownloading(true)
    // console.log(`Downloading registrations as ${filename}.xlsx`)

    if(!filteredRegistrations || filteredRegistrations.length === 0){
      toast.error("No data available to download")
      return
    }

    try {
      // 1.prepare headers
      const staticHeaders = ['#', "Email", "Status", "Registration Date"]
      const dynamicFields = analytics_currentEvent.formFields.filter(field => field.label.toLowerCase() !== "email" && field.label.toLowerCase() !== "mail")
      const dynamicHeaders = dynamicFields.map(field => field.label)
      const headers = [...staticHeaders, ...dynamicHeaders]

      // 2. prepare data rows
      const data = filteredRegistrations.map((registration, index) => {
        const row = [index +1, registration.mail, registration.checkedIn ? "Present" : "Absent", formatDateForTable(registration.createdAt)]
        dynamicFields.forEach(field => {
          const cellValue = renderCellContentForXls(registration.responses[field.label], field.type);
          row.push(cellValue??'')
        });
        return row
      });

      // 3. Create worksheet and workbook
      const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Registrations")

      // 4. Trigger Download
      // const filename = `event_registrations_${analytics_currentEvent?.name || 'data'}.xlsx`
      XLSX.writeFile(wb, `${filename}.xlsx`)

      setSnackbar({
        open: true,
        message: `File "${filename}.xlsx" downloaded successfully`,
        severity: "success",
      })
      setIsDownloadModalOpen(false)
    } catch (err) {
      console.log("Error downloading Excel file", err)
      toast.error(err.message)
    } finally {
      setIsDownloading(false)
    }
  }

  // Handle snackbar close
  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false })

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
                {analytics_currentEvent?.title || "Event Analytics"}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {analytics_currentEvent?.startDate
                  ? new Date(analytics_currentEvent.startDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
                {analytics_currentEvent?.venue ? ` • ${analytics_currentEvent.venue}` : ""}
              </Typography>
            </Box>
            <Button variant="outlined" component={Link} to={`/profile/analytics/${id}/edit-event`} startIcon={<EditIcon />}>
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
                {summaryData?.registrations || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Registrations
              </Typography>
            </Paper>

            <Paper elevation={1} sx={{ p: 2, minWidth: 120, textAlign: "center" }}>
              <Typography variant="h5" fontWeight="bold" color="primary">
                {summaryData?.capacity || "None"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Capacity
              </Typography>
            </Paper>

            {summaryData?.capacity && (
              <Paper elevation={1} sx={{ p: 2, minWidth: 120, textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {((summaryData.registrations / summaryData.capacity)*100).toFixed(2)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Filled
                </Typography>
            </Paper>
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
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
            <AnalyticsSummary />
          )}

          {activeTab === 1 && (
            <Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button variant="contained" startIcon={<DownloadIcon />} onClick={() => setIsDownloadModalOpen(true)}>
                  Download Excel
                </Button>
              </Box>

              {/* <RegistrationsTable registrations={registrations}/> */}
              <RegistrationsTable/>
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Registration Form Questions
              </Typography>

              {analytics_currentEvent.formFields.map((field, index) => (
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
        onClose={() => setIsDownloadModalOpen(false)}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        defaultFilename={analytics_currentEvent?.title ? analytics_currentEvent.title.replace(/\s+/g, "_").toLowerCase() : "event_registrations"}
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

const renderCellContentForXls = (content, type) => {
  if (content === undefined || content === null || content === '') return ""

  if (typeof content === "boolean") return content ? "Yes" : "No"

  if (typeof content === "number") return content

  if (Array.isArray(content)) return content.join(', ')

  if(type === "date") return formatDateForTable(content).split(',').slice(0,2).join(',')

  if(type === "time") return formatDateForTable(content).split(',')[2]

  return content.toString()
}

