import { Box, Container, Paper, Typography, useTheme, useMediaQuery } from "@mui/material"
import { Event as EventIcon } from "@mui/icons-material"

export const AuthLayout = ({ children, title }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        py: 4,
        mt: 5
      }}
    >
      <Container maxWidth="lg" sx={{ flex: 1, display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          {/* Left side - Branding */}
          {!isMobile && (
            <Box
              sx={{
                flex: "0 0 45%",
                bgcolor: "primary.main",
                color: "primary.contrastText",
                p: 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.1,
                  backgroundImage: "url('/placeholder.svg?height=800&width=600')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                  <EventIcon sx={{ fontSize: 40, mr: 1 }} />
                  <Typography variant="h4" component="h1" fontWeight="bold">
                    EventHub
                  </Typography>
                </Box>

                <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
                  Manage your events with ease
                </Typography>

                <Typography variant="body1">
                  Create, organize, and analyze your events all in one place. Join thousands of event organizers who
                  trust EventHub.
                </Typography>

                <Box
                  sx={{
                    mt: 6,
                    p: 3,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 2,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography variant="body1" fontStyle="italic" gutterBottom>
                    "EventHub has transformed how we manage our conferences. The analytics tools are invaluable for
                    understanding our audience."
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Sarah Johnson, TechConf Organizer
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          {/* Right side - Auth Form */}
          <Box
            component={Paper}
            elevation={0}
            sx={{
              flex: isMobile ? 1 : "0 0 55%",
              p: isSmall ? 3 : 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Mobile logo */}
            {isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 4, justifyContent: "center" }}>
                <EventIcon sx={{ fontSize: 32, mr: 1, color: "primary.main" }} />
                <Typography variant="h5" component="h1" fontWeight="bold" color="primary.main">
                  EventHub
                </Typography>
              </Box>
            )}

            <Typography variant={isSmall ? "h5" : "h4"} component="h2" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
              {title}
            </Typography>

            {children}
          </Box>
        </Box>
      </Container>

    </Box>
  )
}
