import { useState, useEffect } from "react"
import { Box, Typography, Grid, TextField, Container, CircularProgress, InputAdornment, FormControl, InputLabel, Select, MenuItem, Tabs, Tab, Divider, useMediaQuery, useTheme } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import { EventCard } from "./index.components.js"
import { axiosInstance, getStatus } from "../utils/index.utils.js"
import { useAuthStore } from "../stores/index.stores.js"
import toast from "react-hot-toast"


export const MyEventsList = ({ activeTab }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [isLoading, setLoding] = useState(false)
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date-desc")
  const { user } = useAuthStore()
  let dateComparison;

  // Fetch user events
  useEffect(() => {
    async function getCurrentUserEvents(){
      setLoding(true)
      try {
        const res = await axiosInstance.get(activeTab===1?"/events/organiser/user-event":"/events/organiser/registered-event")
        // const res = await axiosInstance.get("/events")
        if(res.data?.success)
          // toast.success(res.data.message)
          // setEvents(res.data.events)
          // setFilteredEvents(res.data.events)
          setEvents(res.data.currentUserEvents)
          setFilteredEvents(res.data.currentUserEvents)
      } catch (err) {
        console.log("Error fetching current user's events: ", err)
        toast.error(err.response?.data?.message)
      } finally {
        setLoding(false)
      }
    }
    getCurrentUserEvents()
  }, [user._id, activeTab])

  // Handle search
  useEffect(() => {
    let result = [...events]

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((event) => getStatus(event.startDate, event.startTime, event.endDate, event.endTime) === statusFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.venue.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "date-asc":
        result.sort((a, b) => {
          dateComparison = new Date(a.startDate) - new Date(b.startDate)
          if(dateComparison === 0){
            if(a.startTime < b.startTime)
              return -1
            else if(a.startTime > b.startTime)
              return 1
            else
              return 0
          }
          return dateComparison;
        } )
        break
      case "date-desc":
        result.sort((a, b) => {
          dateComparison = new Date(b.startDate) - new Date(a.startDate)
          if(dateComparison === 0){
            if(b.startTime < a.startTime)
              return -1
            else if(b.startTime > a.startTime)
              return 1
            else
              return 0
          }
          return dateComparison;
        } )
        break
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        break
    }

    setFilteredEvents(result)
  }, [events, statusFilter, searchQuery, sortBy])

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h5" component="h2" fontWeight="bold">
          {activeTab===1?"My Events":"My Registrations"}
        </Typography>

      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "stretch" : "center",
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="date-desc">Newest First</MenuItem>
            <MenuItem value="date-asc">Oldest First</MenuItem>
            <MenuItem value="title-asc">Title (A-Z)</MenuItem>
            <MenuItem value="title-desc">Title (Z-A)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Tabs
        value={statusFilter}
        onChange={(e, newValue) => setStatusFilter(newValue)}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={isMobile ? "auto" : false}
        allowScrollButtonsMobile
        sx={{ mb: 3 }}
      >
        <Tab label="All Events" value="all" />
        <Tab label="Ongoing" value="ongoing" />
        <Tab label="Upcoming" value="upcoming" />
        <Tab label="Past" value="past" />
      </Tabs>

      <Divider sx={{ mb: 3 }} />
      {/* {console.log("filteredEvents: ", filteredEvents)} */}

      {isLoading? (
        <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress />
        </Box>
      </Container>
      ) :
      filteredEvents && filteredEvents.length > 0 ? (
          <Grid container spacing={3}>
            {filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <EventCard event={event} isOrganizer={activeTab===1} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No events found
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {events && events.length === 0 ? "You haven't created any events yet." : "No events match your search criteria."}
            </Typography>
          </Box>
        )}
    </Box>
  )
}
