import { useState, useEffect } from "react"
import { Box, Container, Typography, Grid, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Tabs, Tab, Chip, Pagination, useMediaQuery, Drawer, IconButton, Divider, Button, CircularProgress } from "@mui/material"
import { Search as SearchIcon, FilterList as FilterListIcon, Close as CloseIcon } from "@mui/icons-material"
import toast from 'react-hot-toast'
import { EventCard } from "./../components/index.components.js"
import { axiosInstance, getStatus } from "../utils/index.utils.js"
// import { mockEvents } from "../assets/mockEvents.js"

export const Events = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date-desc")
  const [filterStatus, setFilterStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  let dateComparison;
  const eventsPerPage = 6
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"))

  // Initialize events data
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/events");
        setEvents(res.data?.events);
        setFilteredEvents(res.data?.events);
        // console.log(res.data?.events)
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Apply filters, search, and sorting
  useEffect(() => {
    let result = [...events]

    // Apply status filter
    if (filterStatus !== "all") {
      result = result.filter((event) => getStatus(event.startDate, event.startTime, event.endDate, event.endTime) === filterStatus)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter( (event) =>
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
            if(a.startTime < b.startTime) return -1
            else if(a.startTime > b.startTime) return 1
            else return 0
          }
          return dateComparison;
        } )
        break
      case "date-desc":
        result.sort((a, b) => {
          dateComparison = new Date(b.startDate) - new Date(a.startDate)
          if(dateComparison === 0){
            if(b.startTime < a.startTime) return -1
            else if(b.startTime > a.startTime) return 1
            else return 0
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
    setCurrentPage(1) // Reset to first page when filters change
  }, [events, filterStatus, searchQuery, sortBy])

  // Handle page change
  const handlePageChange = (e, value) => {
    setCurrentPage(value)
    window.scrollTo(0, 0)
  }

  // Calculate pagination
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent)
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)

  // Toggle filter drawer for mobile
  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 10 }}>

      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" component="h1" fontWeight="bold"> Discover Events </Typography>

        {isMobile && (
          <IconButton onClick={toggleDrawer} color="primary">
            <FilterListIcon />
          </IconButton>
        )}
      </Box>

      {isMobile && (
        <Box xs={12} md={6} sx={{ mb: 3 }}>
          <TextField fullWidth variant="outlined" placeholder="Search events..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: (
            <InputAdornment position="start"> <SearchIcon /> </InputAdornment>
            )}}/>
        </Box>
      )}

      {/* Filter drawer for mobile */}
      {isMobile && (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          <Box sx={{ width: 280, p: 2 }}>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6">Filters</Typography>
              <IconButton onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle2" sx={{ mb: 1 }}> Sort By </Typography>

            <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 3 }}>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <MenuItem value="date-asc">Date (Earliest First)</MenuItem>
                <MenuItem value="date-desc">Date (Latest First)</MenuItem>
                <MenuItem value="title-asc">Title (A-Z)</MenuItem>
                <MenuItem value="title-desc">Title (Z-A)</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="subtitle2" sx={{ mb: 1 }}> Event Status </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button variant={filterStatus === "all" ? "contained" : "outlined"} onClick={() => setFilterStatus("all")} fullWidth> All Events </Button>
              <Button variant={filterStatus === "ongoing" ? "contained" : "outlined"} onClick={() => setFilterStatus("ongoing")} fullWidth> Ongoing </Button>
              <Button variant={filterStatus === "upcoming" ? "contained" : "outlined"} onClick={() => setFilterStatus("upcoming")} fullWidth> Upcoming </Button>
              <Button variant={filterStatus === "past" ? "contained" : "outlined"} onClick={() => setFilterStatus("past")} fullWidth> Past</Button>
            </Box>

          </Box>
        </Drawer>
      )}

      {/* Desktop filters */}
      {!isMobile && (
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">

            <Grid item xs={12} md={6}>
              <TextField fullWidth variant="outlined" placeholder="Search events..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: (
                <InputAdornment position="start"> <SearchIcon /> </InputAdornment>
                )}}/>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Sort By</InputLabel>
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
                  <MenuItem value="date-asc">Date (Earliest First)</MenuItem>
                  <MenuItem value="date-desc">Date (Latest First)</MenuItem>
                  <MenuItem value="title-asc">Title (A-Z)</MenuItem>
                  <MenuItem value="title-desc">Title (Z-A)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <Tabs value={filterStatus} onChange={(e, newValue) => setFilterStatus(newValue)} variant="scrollable" scrollButtons="auto" aria-label="event status tabs">
                <Tab label="All" value="all" />
                <Tab label="Ongoing" value="ongoing" />
                <Tab label="Upcoming" value="upcoming" />
                <Tab label="Past" value="past" />
              </Tabs>
            </Grid>
            
          </Grid>
        </Box>
      )}

      {/* Results summary */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
        </Typography>

        {filterStatus !== "all" && (
          <Chip label={`${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Events`} onDelete={() => setFilterStatus("all")} color="primary" variant="outlined"/>
        )}
      </Box>

      {/* Events grid */}
      {isLoading ? (
        <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress />
        </Box>
      </Container>
      ) : currentEvents.length > 0 ? (
          <Grid container spacing={3}>
            {currentEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary"> No events found matching your criteria </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}> Try adjusting your search or filters </Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => {
                setSearchQuery("")
                setFilterStatus("all")
                setSortBy("date-asc")
              }}
            >
              Clear all filters
            </Button>
          </Box>
        )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" size={isMobile ? "small" : "medium"}/>
        </Box>
      )}
    </Container>
  )
}
