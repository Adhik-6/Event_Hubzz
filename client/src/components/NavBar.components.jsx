import { AppBar, Box, Button, Divider, IconButton, Toolbar, Typography, Avatar, Menu, MenuItem, useMediaQuery, ListItemIcon, ListItemText } from "@mui/material"
import { Menu as MenuIcon, ExitToApp as LogoutIcon, AddCircleOutlineRounded, LaunchRounded } from "@mui/icons-material"
import eventHubzzLogo from './../assets/event_hubzz_logo.jpg'
import placeHolderAvatar from './../assets/placeHolderAvatar.jpeg'
import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
// import { mockUserProfile } from "../assets/mockUserProfile.js"
import { useAuthStore } from "../stores/index.stores.js"
const appDriveLink = "https://drive.google.com/file/d/14b4Z7y22eBFwOnAlGD0GwaXKnfcgR4jP/view?usp=sharing"

export const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isUserMenuOpen = Boolean(userMenuAnchorEl)

  const isMobile = useMediaQuery("(max-width:700px)")
  const location = useLocation();

  // const [user, setUserProfile] = useState(mockUserProfile);
  const { isAuthenticated,  logout, user } = useAuthStore();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)

  const handleMenuClose = () => setAnchorEl(null)

  const handleUserMenuOpen = (event) => setUserMenuAnchorEl(event.currentTarget)

  const handleUserMenuClose = () => setUserMenuAnchorEl(null)

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) element.scrollIntoView();
    }
  }, [location]);

  const handleAppDownload = () => {
    const link = document.createElement('a');
    link.href = './../../app/qr_scanner.apk'; // path to apk file
    link.setAttribute('download', 'qr_scanner.apk');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <>
    {/* Header */}
    <AppBar position="fixed" elevation={0}>
      <Toolbar>

        <Typography variant="h5" component={Link} to="/" sx={{ color:"white", textDecoration:"none", flexGrow: 0, display: "flex", alignItems: "center" }}>
          <Box component="img" src={eventHubzzLogo} alt="EventHub Logo" sx={{ height: 32, mr: 1, borderRadius: 1 }}/>
          Event Hubzz
        </Typography>

        {isMobile ? (
          <Box sx={{ flexGrow: 1 }} />
        ) : (
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Button component={Link} to="/events" color="inherit" sx={{ mx: 1 }}> Events </Button>
            <Button component={Link} to="/#features" color="inherit" sx={{ mx: 1 }}> Features </Button>
            <Button component={Link} to="/#testimonials" color="inherit" sx={{ mx: 1 }}> Testimonials </Button>
          </Box>
        )}

        <Box sx={{ flexGrow: 0 }}>
          {isMobile && (
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen} sx={{ mr: 0 }}>
              <MenuIcon />
            </IconButton>
          )}
          { isAuthenticated ? (
            <IconButton onClick={handleUserMenuOpen} sx={{ ml: 1 }}>
              <Avatar src={user?.profilePic || placeHolderAvatar } alt={user.userName} sx={{ width: 37, height: 37 }} />
            </IconButton>
          ) : (
            <Button component={Link} to="/login" variant="outlined" sx={{ ml: 2, "&:hover": { background: "linear-gradient(90deg, #0062cc, #00a3cc)", borderColor: "transparent" }}}>
            Login
          </Button>
          )

          }
        </Box>

      </Toolbar>
    </AppBar>

    {/* Mobile Menu */}
    <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose} sx={{ mt: "45px" }}>
      <MenuItem component={Link} to="/events" onClick={handleMenuClose}>Events</MenuItem>
      <MenuItem component={Link} to="/#features" onClick={handleMenuClose}>Features</MenuItem>
      <MenuItem component={Link} to="/#testimonials" onClick={handleMenuClose}>Testimonials</MenuItem>
    </Menu>

    {/* User Menu */}
    { isAuthenticated && (
      <Menu anchorEl={userMenuAnchorEl} open={isUserMenuOpen} onClose={handleUserMenuClose} sx={{ mt: "45px", }}>

        {/* User Profile */}
        <MenuItem component={Link} to="/profile" onClick={handleUserMenuClose}>
          <ListItemIcon>
            <Avatar src={user?.profilePic || placeHolderAvatar } alt={user?.userName} sx={{ width: 24, height: 24 }} />
          </ListItemIcon>
          <ListItemText primary={user?.userName} secondary={user.mail} />
        </MenuItem>

        {/* Create Event */}
        <MenuItem component={Link} to="/create-event" onClick={handleUserMenuClose}>
          <ListItemIcon>
            <AddCircleOutlineRounded/>
          </ListItemIcon>
          <ListItemText primary="Create Event"/>
        </MenuItem>
      
        {/* App link */}
        {/* <MenuItem onClick={() => {
          handleUserMenuClose();
          handleAppDownload();
          }}>
          <ListItemIcon>
            <LaunchRounded/>
          </ListItemIcon>
          <ListItemText primary="Get App"/>
        </MenuItem> */}
        <MenuItem component="a" href={appDriveLink} target="_blank" rel="noopener noreferrer" onClick={handleUserMenuClose}>
          <ListItemIcon>
            <LaunchRounded />
          </ListItemIcon>
          <ListItemText primary="Get App" />
        </MenuItem>

        <Divider />
        {/* Logout */}
        <MenuItem onClick={() => {
          handleUserMenuClose();
          logout()
          }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>

      </Menu>
    ) }
    </>
  )
}
