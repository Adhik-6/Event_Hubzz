import { useState, useEffect } from "react"
import { Box, Container, Typography, Tabs, Tab, Fab, useMediaQuery, useTheme, Avatar} from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import { ProfileForm, MyEventsList, NotificationsTab, SettingsTab } from "./../components/index.components.js"
import { mockEvents } from "../assets/mockEvents.js"
import { mockUserProfile } from "../assets/mockUserProfile.js"

export const Profile = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [activeTab, setActiveTab] = useState(0)
  const [userProfile, setUserProfile] = useState(mockUserProfile)
  const [events, setEvents] = useState([])

  // Fetch user events
  useEffect(() => {
    // In a real app, you would fetch the user's events from an API
    // Filter events where the organizer ID matches the current user ID
    const userEvents = mockEvents.filter((event) => event.organizerId === userProfile.id)
    setEvents(userEvents)
  }, [userProfile.id])

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  // Handle profile update
  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile({
      ...userProfile,
      ...updatedProfile,
    })

    // In a real app, you would send the updated profile to your backend
    console.log("Profile updated:", updatedProfile)
  }

  // Handle create event click
  const handleCreateEventClick = () => {
    // In a real app, you would use a router to navigate
    console.log("Navigating to /create-event")
    alert("Navigating to /create-event")
    // Example with react-router:
    // navigate('/create-event');
  }

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <ProfileForm profile={userProfile} onUpdate={handleProfileUpdate} />
      case 1:
        return <MyEventsList events={events} />
      case 2:
        return <NotificationsTab />
      case 3:
        return <SettingsTab />
      default:
        return <ProfileForm profile={userProfile} onUpdate={handleProfileUpdate} />
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pt: 5 }}>

      {/* Profile Header */}
      <Box sx={{ bgcolor: "primary.main", color: "primary.contrastText", py: 6, position: "relative" }}>
        <Container maxWidth="lg">

          <Box
            sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "center" : "flex-end", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex",flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "center" : "flex-end", mb: isMobile ? 3 : 0 }}>
              <Avatar src={userProfile.profilePicture} alt={userProfile.name} sx={{ width: 120, height: 120, border: "4px solid white", mb: isMobile ? 2 : 0, mr: isMobile ? 0 : 3 }}/>

              <Box sx={{ textAlign: isMobile ? "center" : "left" }}>
                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                  {userProfile.name}
                </Typography>
                <Typography variant="subtitle1">{userProfile.organization}</Typography>
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                  {userProfile.bio}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Tabs */}
      <Box sx={{ bgcolor: "background.paper", borderBottom: 1, borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
            centered={!isMobile}
          >
            <Tab label="Profile" />
            <Tab label="My Events" />
            <Tab label="Notifications" />
            <Tab label="Settings" />
          </Tabs>
        </Container>
      </Box>

      {/* Tab Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {renderTabContent()}
      </Container>

      {/* Floating Create Event Button (Mobile) */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="create event"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={handleCreateEventClick}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  )
}
