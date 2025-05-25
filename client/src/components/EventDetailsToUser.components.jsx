import { Box, Typography, Divider, Paper, useTheme, useMediaQuery } from "@mui/material"
import {
  CalendarMonth as CalendarIcon,
  PlaceOutlined as PlaceIcon,
  Person as PersonIcon,
  PeopleAltOutlined as PeopleIcon,
  CategoryOutlined as CategoryIcon,
  Info as InfoIcon,
} from "@mui/icons-material"
import { useResponseStore } from "../stores/response.stores.js"
import { formatDateTime } from './../utils/index.utils.js'
import placeholderImg from "./../assets/placeHolderImage.jpeg"

export const EventDetailsToUser = () => {
  const { currentEvent } = useResponseStore();

  if (!currentEvent) return null

  return (
    <Box>

      <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
        Event Information
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Please review the Event details before proceeding to registration.
      </Typography>

      <Box>
        <Paper elevation={1} sx={{ p: 3, mb: 4 }}>

          {/* Event Title */}
          <Typography variant="subtitle1" fontWeight="bold">{currentEvent.title || "Event Title"}</Typography>

          {/* Event Image */}
          {currentEvent.eventImage && (
            <Box sx={{ mt: 2, mb: 2, maxHeight: 200, overflow: "hidden", borderRadius: 1 }}>
              <img
                src={currentEvent.eventImage || placeholderImg}
                alt="Event"
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Box>
          )}

          {/* Event Description */}
          <Typography variant="body2" component="p" sx={{ my: 5, whiteSpace: 'pre-line' }}>{currentEvent.description || "No description provided."}</Typography>


          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>

            {/* Start date & time */}
            <Box>
              <CalendarIcon sx={{ mr: 1, color: "secondary.main" }} />
              <Typography variant="caption" color="text.secondary">Start Date & Time</Typography>
              <Typography variant="body2" sx={{mt: 1, ml: 0.5}}>{currentEvent.startTime? formatDateTime(currentEvent.startDate, currentEvent.startTime): "Not specified"}</Typography>
            </Box>

            {/* End date & time */}
            <Box>
              <CalendarIcon sx={{ mr: 1, color: "secondary.main" }} />
              <Typography variant="caption" color="text.secondary">End Date & Time</Typography>
              <Typography variant="body2" sx={{mt: 1, ml: 0.5}}>{currentEvent.endTime? formatDateTime(currentEvent.endDate, currentEvent.endTime): "Not specified"}</Typography>
            </Box>

            {/* Venue */}
            <Box>
              <PlaceIcon sx={{ mr: 1, color: "secondary.main" }} />
              <Typography variant="caption" color="text.secondary">Venue</Typography>
              <Typography variant="body2" sx={{mt: 1, ml: 0.5}}>{currentEvent.venue || "Not specified"}</Typography>
            </Box>

            {/* Category */}
            <Box>
              <CategoryIcon sx={{ mr: 1, color: "secondary.main" }} />
              <Typography variant="caption" color="text.secondary">Category</Typography>
              <Typography variant="body2" sx={{mt: 1, ml: 0.5}}>{currentEvent.category || "Not specified"}</Typography>
            </Box>
            
            {/* Organiser */}
            <Box>
              <PersonIcon sx={{ mr: 1, color: "secondary.main" }} />
              <Typography variant="caption" color="text.secondary">Organized by</Typography>
              <Typography variant="body2" sx={{mt: 1, ml: 0.5}}>{currentEvent.organiser?.organization}</Typography>
            </Box>

            {/* registration */}
            <Box>
              <PeopleIcon sx={{ mr: 1, color: "secondary.main" }} />
              <Typography variant="caption" color="text.secondary">Registrations</Typography>
              <Typography variant="body2" sx={{mt: 1, ml: 0.5}}>{`${currentEvent.registrations}${currentEvent.capacity?"/":""}${currentEvent.capacity||""}`}</Typography>
            </Box>

          </Box>
        </Paper>
      </Box>

      {/* Additional Information */}
        {/* <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <InfoIcon sx={{ mr: 1, mt: 0.5, color: "info.main" }} />
            <Typography variant="body1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, incidunt in inventore iure ipsum voluptas repellendus, maiores fuga dicta sit eveniet nobis perferendis illo. Ea, nam? Ut doloremque voluptas repudiandae.
            Dicta, accusamus repudiandae. Adipisci error mollitia unde ad eveniet tempore vero? Veniam in pariatur laboriosam odit est maxime voluptas magni architecto tenetur? Cum voluptate aliquam vero nesciunt enim quia aliquid?
            Saepe quia praesentium aspernatur quidem a sequi minima, doloremque pariatur consequatur eaque nisi, facilis sunt dicta vitae nam dolor velit eligendi expedita? Accusamus inventore culpa harum nulla vitae recusandae autem?</Typography>
          </Box>
        </Box> */}
      {currentEvent?.additionalInfo && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <InfoIcon sx={{ mr: 1, mt: 0.5, color: "info.main" }} />
            <Typography variant="body1">{currentEvent?.additionalInfo}</Typography>
          </Box>
        </Box>
      )}

    </Box>
  )
}


