import { useEffect, useState } from "react"
import { Card, CardContent, CardMedia, Typography, Box, Chip, Button, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, CardActionArea, CardActions } from "@mui/material"
import { CalendarMonth as CalendarIcon, LocationOn as LocationIcon, MoreVert as MoreVertIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, ContentCopy as DuplicateIcon, QrCode as QrCodeIcon } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { getStatus } from './../utils/index.utils.js'
import { useResponseStore } from "../stores/index.stores.js"
import placeHolderImage from "./../assets/placeHolderImage.jpeg"
// impor } from "./../ass.jpeg"
// projects/college_projects/event_management/client/src/assets/

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case "ongoing":
      return "success"
    case "upcoming":
      return "primary"
    case "past":
      return "default"
    default:
      return "default"
  }
}

export const EventCard = ({ event, isOrganizer = false }) => {
  const {
    _id: id,
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    venue,
    eventImage,
    category,
    registrations = 0,
    capacity = 0,
  } = event
  const [status, setStatus] = useState("")

  // const navigate = useNavigate();

  // useEffect(() => {
  //   setStatus( () => {
  //     const currentDate = new Date();
  //     const start = new Date(`${startDate.split("T")[0]}T${startTime.split("T")[1]}`);
  //     const end = new Date(`${endDate.split("T")[0]}T${endTime.split("T")[1]}`);
  
  //     if (currentDate >= start && currentDate <= end) return "ongoing";
  //     else if (currentDate > end) return "past";
  //     else return "upcoming"; //(currentDate < endDate && currentDate < endTime)
  // })
  //   // getStatus()
  // }, [event])

  useEffect(() => {
    setStatus(getStatus(startDate, startTime, endDate, endTime));
  }, [event]);
  // console.log(event)
  // console.log(status)


  const [menuAnchorEl, setMenuAnchorEl] = useState(null)

  // Handle menu open
  const handleMenuOpen = (event) => {
    event.stopPropagation()
    setMenuAnchorEl(event.currentTarget)
  }

  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  // Handle edit event
  const handleEditEvent = () => {
    handleMenuClose()
    // In a real app, you would navigate to the edit page
    console.log("Editing event:", id)
    alert(`Editing event: ${id}`)
  }

  // Handle delete event
  const handleDeleteEvent = () => {
    handleMenuClose()
    // In a real app, you would show a confirmation dialog
    console.log("Deleting event:", id)
    alert(`Deleting event: ${id}`)
  }

  // Handle view event
  const handleViewEvent = () => {
    handleMenuClose()
    // In a real app, you would navigate to the event details page
    console.log("Viewing event:", id)
    alert(`Viewing event: ${id}`)
  }

  // Handle duplicate event
  const handleDuplicateEvent = () => {
    handleMenuClose()
    // In a real app, you would create a duplicate event
    console.log("Duplicating event:", id)
    alert(`Duplicating event: ${id}`)
  }

  // Handle manage registrations
  // const handleManageRegistrations = () => {
  //   handleMenuClose()
  //   // setCurrentEvent({event})
  //   navigate(`/profile/analytics/${id}`)
  //   // In a real app, you would navigate to the registrations page
  //   // console.log("Managing registrations for event:", id)
  //   // alert(`Managing registrations for event: ${id}`)
  // }

  return (
    <Card elevation={2} sx={{ position: "relative" }}>
      {/* <CardActionArea> */}
        <CardMedia component="img" height="160" image={eventImage || placeHolderImage} alt={title} />
        <Box sx={{ position: "absolute", top: 9, right: 9 }}>
          <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            color={getStatusColor(status)}
            size="small"
            sx={{ fontWeight: "bold" }}
          />
        </Box>

        {/* {isOrganizer && (
          <Box sx={{ position: "absolute", top: 12, left: 12 }}>
            <IconButton size="small" sx={{ bgcolor: "rgba(255, 255, 255, 0.9)" }} onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>

            <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleViewEvent}>
                <ListItemIcon>
                  <VisibilityIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>View Event</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleEditEvent}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit Event</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDuplicateEvent}>
                <ListItemIcon>
                  <DuplicateIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Duplicate</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleManageRegistrations}>
                <ListItemIcon>
                  <QrCodeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Manage Registrations</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDeleteEvent} sx={{ color: "error.main" }}>
                <ListItemIcon sx={{ color: "error.main" }}>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete Event</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        )} */}

        <CardContent>
          <Typography variant="overline" color="text.secondary">
            {category}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom noWrap>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: 60,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </Typography>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 0.5 }}>
            <CalendarIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {formatDate(startDate)}
              {endDate && ` - ${formatDate(endDate)}`}
            </Typography>
          </Box>

          <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocationIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {venue}
            </Typography>
          </Box>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="caption" color="text.secondary">
              Registrations
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {registrations} {capacity?`/ ${capacity}`:``}
            </Typography>
          </Box>
        </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        {isOrganizer ? (
          <Button component={Link} to={`/profile/analytics/${id}`} size="small" color="primary" fullWidth>
            Manage Event
          </Button>
        ) : (
          <Button component={Link} to={`/events/${id}/register`} size="small" color="primary" fullWidth>
            {status === "upcoming" ? "Register Now" : "View Details"}
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
