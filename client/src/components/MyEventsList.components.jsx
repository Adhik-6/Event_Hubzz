import { useState } from "react"
import { Box, Typography, Grid, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Button, Tabs, Tab, Divider, useMediaQuery, useTheme } from "@mui/material"
import { Search as SearchIcon, Add as AddIcon } from "@mui/icons-material"
import { EventCard } from "./index.components.js"

export const MyEventsList = ({ events }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date-desc")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredEvents, setFilteredEvents] = useState(events)

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    filterEvents(query, statusFilter, sortBy)
  }

  // Handle sort change
  const handleSortChange = (e) => {
    const value = e.target.value
    setSortBy(value)

    filterEvents(searchQuery, statusFilter, value)
  }

  // Handle status filter change
  const handleStatusFilterChange = (e, newValue) => {
    setStatusFilter(newValue)

    filterEvents(searchQuery, newValue, sortBy)
  }

  // Filter events based on search, status, and sort
  const filterEvents = (query, status, sort) => {
    let filtered = [...events]

    // Apply search filter
    if (query) {
      const lowercaseQuery = query.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(lowercaseQuery) ||
          event.description.toLowerCase().includes(lowercaseQuery),
      )
    }

    // Apply status filter
    if (status !== "all") {
      filtered = filtered.filter((event) => event.status === status)
    }

    // Apply sorting
    switch (sort) {
      case "date-asc":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      case "date-desc":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        break
    }

    setFilteredEvents(filtered)
  }

  // Handle create event click
  const handleCreateEventClick = () => {
    // In a real app, you would use a router to navigate
    console.log("Navigating to /create-event")
    alert("Navigating to /create-event")
    // Example with react-router:
    // navigate('/create-event');
  }

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
          My Events
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateEventClick}>
          Create Event
        </Button>
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
          onChange={handleSearch}
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
          <Select value={sortBy} label="Sort By" onChange={handleSortChange}>
            <MenuItem value="date-desc">Newest First</MenuItem>
            <MenuItem value="date-asc">Oldest First</MenuItem>
            <MenuItem value="title-asc">Title (A-Z)</MenuItem>
            <MenuItem value="title-desc">Title (Z-A)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Tabs
        value={statusFilter}
        onChange={handleStatusFilterChange}
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

      {filteredEvents.length > 0 ? (
        <Grid container spacing={3}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <EventCard event={event} isOrganizer={true} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No events found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {events.length === 0 ? "You haven't created any events yet." : "No events match your search criteria."}
          </Typography>
          {events.length === 0 && (
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateEventClick} sx={{ mt: 2 }}>
              Create Your First Event
            </Button>
          )}
        </Box>
      )}
    </Box>
  )
}
