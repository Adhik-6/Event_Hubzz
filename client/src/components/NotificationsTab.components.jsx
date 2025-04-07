import React from "react"
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, IconButton, Paper, Button } from "@mui/material"
import { Event as EventIcon, Person as PersonIcon, Notifications as NotificationsIcon, Delete as DeleteIcon } from "@mui/icons-material"

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "registration",
    message: "New registration for Tech Conference 2023",
    timestamp: "2023-10-15T14:30:00Z",
    read: false,
  },
  {
    id: 2,
    type: "event",
    message: 'Your event "Web Development Workshop" is starting tomorrow',
    timestamp: "2023-10-14T09:15:00Z",
    read: true,
  },
  {
    id: 3,
    type: "system",
    message: "Your account has been verified successfully",
    timestamp: "2023-10-10T11:45:00Z",
    read: true,
  },
]

export const NotificationsTab = () => {
  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get avatar based on notification type
  const getNotificationAvatar = (type) => {
    switch (type) {
      case "registration":
        return <PersonIcon />
      case "event":
        return <EventIcon />
      case "system":
        return <NotificationsIcon />
      default:
        return <NotificationsIcon />
    }
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
        Notifications
      </Typography>

      <Typography variant="body2" color="text.secondary" paragraph>
        Stay updated with your events and account activity.
      </Typography>

      {notifications.length > 0 ? (
        <Paper elevation={1} sx={{ mb: 3 }}>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{
                    bgcolor: notification.read ? "transparent" : "action.hover",
                    py: 2,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: notification.read ? "action.disabledBackground" : "primary.main" }}>
                      {getNotificationAvatar(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={notification.message} secondary={formatTimestamp(notification.timestamp)} />
                </ListItem>
                {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ) : (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No notifications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You're all caught up!
          </Typography>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outlined">View All Notifications</Button>
      </Box>
    </Box>
  )
}
