import { Box, Button, Container, Divider, Grid, IconButton, Typography } from "@mui/material"
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material"
import reactSvg from './../assets/react.svg'

export const Footer = () => {
  return (
    <>
    {/* Footer */}
    <Box sx={{ py: 6, backgroundColor: "#111" }}>
      <Container>
        <Grid container spacing={4}>

          <Grid item xs={12} md={4}>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box component="img" src={reactSvg} alt="EventHub Logo" sx={{ height: 32, mr: 1 }}/>
              <Typography variant="h6">Event Hubzz</Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The complete platform for event management and verification. Create, manage, and verify events with ease.
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>

              <IconButton color="primary" aria-label="Twitter">
                <Twitter />
              </IconButton>

              <IconButton color="primary" aria-label="Facebook">
                <Facebook />
              </IconButton>

              <IconButton color="primary" aria-label="Instagram">
                <Instagram />
              </IconButton>

              <IconButton color="primary" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
              
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2, px: 0.8 }}> Company </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> About </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> Careers </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> Blog </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> Press </Button>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2, px: 0.8 }}> Resources </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> Documentation </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> Help Center </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> Guides </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> API </Button>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2, px: 0.8 }}> Legal </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> Terms </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> Privacy </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> Cookies </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> Licenses </Button>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2, px: 0.8 }}> Support </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> Contact </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> Feedback </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", py: 0.2, px: 0.8 }}> System Status </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} EventHub. All rights reserved.
        </Typography>

      </Container>
    </Box>

    {/* <Box sx={{ py: 6, backgroundColor: "#111" }}>
      <Container>
        <Grid container spacing={4}>

          <Grid item xs={12} md={4}>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box component="img" src={reactSvg} alt="EventHub Logo" sx={{ height: 32, mr: 1 }}/>
              <Typography variant="h6">Event Hubzz</Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The complete platform for event management and verification. Create, manage, and verify events with ease.
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>

              <IconButton color="primary" aria-label="Twitter">
                <Twitter />
              </IconButton>

              <IconButton color="primary" aria-label="Facebook">
                <Facebook />
              </IconButton>

              <IconButton color="primary" aria-label="Instagram">
                <Instagram />
              </IconButton>

              <IconButton color="primary" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
              
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}> Company </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> About </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> Careers </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> Blog </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> Press </Button>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}> Resources </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> Documentation </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> Help Center </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> Guides </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> API </Button>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}> Legal </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> Terms </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> Privacy </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> Cookies </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> Licenses </Button>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}> Support </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> Contact </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> Feedback </Button>
              <Button color="inherit" sx={{ justifyContent: "flex-start", p: 0 }}> System Status </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} EventHub. All rights reserved.
        </Typography>

      </Container>
    </Box> */}

    </>
  )
}
