import { Box, Button, Card, CardContent, Container, Grid, Typography, Avatar } from "@mui/material"
import { QrCodeScanner, EventNote, Analytics, PersonAdd } from "@mui/icons-material"  
import { Link as RouterLink } from "react-router-dom";

export const Home = () => {
  
  return (
    <>
    {/* Main Content */}
    <Box component="main">

      {/* Hero Section */}
      <Box sx={{ pt: 15, pb: 10, background: "linear-gradient(180deg, #000000 0%, #111111 100%)", textAlign: "center" }}>
        <Container maxWidth="md">

          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, mb: 2, background: "linear-gradient(90deg, #007aff, #00c6ff)", backgroundClip: "text", textFillColor: "transparent", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Seamless Event Management & Verification
          </Typography>

          <Typography variant="h5" component="p" color="text.secondary" sx={{ mb: 4, px: { xs: 2, md: 10 } }}>
            Create, manage, and verify events with ease. The all-in-one platform for organizers and participants.
          </Typography>

          <Button href="#userChoiceSection" variant="contained" size="large" sx={{ px: 4, py: 1.5, fontSize: "1.1rem", background: "linear-gradient(90deg, #007aff, #00c6ff)", "&:hover": { background: "linear-gradient(90deg, #0062cc, #00a3cc)" }}}>
            Get Started
          </Button>

        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: 10, backgroundColor: "#111" }}>
        <Container>

          <Typography variant="h2" component="h2" align="center" sx={{ mb: 6 }}>
            Powerful Features
          </Typography>

          <Grid container spacing={4}>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", backgroundColor: "#1a1a1a" }}>
                <CardContent sx={{ p: 4, textAlign: "center" }}>

                  <EventNote sx={{ fontSize: 60, color: "#007aff", mb: 2 }} />

                  <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                    Event Creation
                  </Typography>

                  <Typography variant="body1" color="text.secondary">
                    Create and customize events in minutes. Set up registration forms, ticket types, and event details with our intuitive interface.
                  </Typography>

                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", backgroundColor: "#1a1a1a" }}>
                <CardContent sx={{ p: 4, textAlign: "center" }}>

                  <QrCodeScanner sx={{ fontSize: 60, color: "#007aff", mb: 2 }} />

                  <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                    QR Verification
                  </Typography>

                  <Typography variant="body1" color="text.secondary">
                    Verify attendees instantly with our QR code system. Eliminate fraud and streamline the check-in process at your events.
                  </Typography>

                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", backgroundColor: "#1a1a1a" }}>
                <CardContent sx={{ p: 4, textAlign: "center" }}>

                  <Analytics sx={{ fontSize: 60, color: "#007aff", mb: 2 }} />

                  <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                    Analytics Dashboard
                  </Typography>

                  <Typography variant="body1" color="text.secondary">
                    Gain valuable insights with real-time analytics. Track registrations, attendance, and engagement
                    to optimize your events.
                  </Typography>

                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box id="testimonials" sx={{ py: 10, backgroundColor: "#000" }}>
        <Container>

          <Typography variant="h2" component="h2" align="center" sx={{ mb: 6 }}>
            What Our Users Say
          </Typography>

          <Grid container spacing={4}>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", backgroundColor: "#1a1a1a",  }}>
                <CardContent sx={{ p: 4 }}>

                  <Typography variant="body1" sx={{ mb: 3, fontStyle: "italic" }}>
                    "EventHub transformed how we manage our tech conferences. The QR verification system saved us
                    hours of check-in time and eliminated ticket fraud completely."
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 2 }}>M</Avatar>
                    <Box>
                      <Typography variant="subtitle1">Michael Johnson</Typography>
                      <Typography variant="body2" color="text.secondary"> Tech Conference Organizer</Typography>
                    </Box>
                  </Box>

                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", backgroundColor: "#1a1a1a" }}>
                <CardContent sx={{ p: 4 }}>

                  <Typography variant="body1" sx={{ mb: 3, fontStyle: "italic" }}>
                    "As a frequent event attendee, I love how easy it is to keep all my tickets in one place. The app notifications ensure I never miss an important update about events I've registered for."
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 2 }}>S</Avatar>
                    <Box>
                      <Typography variant="subtitle1">Sarah Williams</Typography>
                      <Typography variant="body2" color="text.secondary">Event Participant</Typography>
                    </Box>
                  </Box>

                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%", backgroundColor: "#1a1a1a" }}>
                <CardContent sx={{ p: 4 }}>

                  <Typography variant="body1" sx={{ mb: 3, fontStyle: "italic" }}>
                    "The analytics dashboard gives us incredible insights into our events. We've been able to increase
                    attendance by 40% by understanding our audience better through EventHub's data."
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 2 }}>R</Avatar>
                    <Box>
                      <Typography variant="subtitle1">Robert Chen</Typography>
                      <Typography variant="body2" color="text.secondary"> Marketing Director </Typography>
                    </Box>
                  </Box>

                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* User Type Selection Section */}
      <Box id="userChoiceSection" sx={{ py: 10, background: "linear-gradient(180deg, #111111 0%, #000000 100%)" }}>
        <Container>

          <Typography variant="h2" component="h2" align="center" sx={{ mb: 2 }}>
            How will you use EventHub?
          </Typography>

          <Typography variant="h6" component="p" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Choose your path and get started today
          </Typography>

          <Grid container spacing={4}>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", backgroundColor: "#1a1a1a", transition: "transform 0.3s, box-shadow 0.3s", "&:hover": { transform: "translateY(-8px)", boxShadow: "0 12px 30px rgba(0,122,255,0.2)" }}}>
                <CardContent sx={{ p: 4, textAlign: "center" }}>

                  <PersonAdd sx={{ fontSize: 60, color: "#007aff", mb: 2 }} />

                  <Typography variant="h4" component="h3" sx={{ mb: 2 }}>
                    I'm an Organizer
                  </Typography>

                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Create and manage events, sell tickets, and verify attendees with our powerful tools designed for event organizers.
                  </Typography>

                  <Button component={RouterLink} to="/create-event" variant="contained" size="large" sx={{ px: 4, background: "linear-gradient(90deg, #007aff, #00c6ff)", "&:hover": { background: "linear-gradient(90deg, #0062cc, #00a3cc)"}}}>
                    Create an Event
                  </Button>

                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", backgroundColor: "#1a1a1a", transition: "transform 0.3s, box-shadow 0.3s", "&:hover": { transform: "translateY(-8px)", boxShadow: "0 12px 30px rgba(0,122,255,0.2)" }}}>
                <CardContent sx={{ p: 4, textAlign: "center" }}>

                  <EventNote sx={{ fontSize: 60, color: "#007aff", mb: 2 }} />

                  <Typography variant="h4" component="h3" sx={{ mb: 2 }}>
                    I'm a Participant
                  </Typography>

                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Discover and register for events, manage your tickets, and enjoy a seamless check-in experience at your favorite events.
                  </Typography>

                  <Button component={RouterLink} to="/events" variant="contained" size="large" sx={{px: 4, background: "linear-gradient(90deg, #007aff, #00c6ff)", "&:hover": { background: "linear-gradient(90deg, #0062cc, #00a3cc)" }}}>
                    Find Events
                  </Button>

                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Container>
      </Box>

    </Box>
    </>
  )
};
