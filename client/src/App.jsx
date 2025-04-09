import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import { Routes, Route, Navigate } from "react-router-dom"
import { Home, EventRegister, Events, CreateEvent, PageNotFound, Profile, Analytics, Login, Signup, EventRegistration} from './pages/index.pages.js'
import { NavBar, Footer } from './components/index.components.js'
import { useAuthStore } from './stores/index.stores.js' 
import { Toaster } from 'react-hot-toast'
import { useScrollToTop } from './utils/index.utils.js'

function App() {
  // Create a dark theme similar to Apple's website
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#007aff",
      },
      background: {
        default: "#000000",
        paper: "#111111",
      },
      text: {
        primary: "#ffffff",
        secondary: "#aaaaaa",
      },
    },
    typography: {
      fontFamily: '"SF Pro Display", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "10px 20px",
          },
          containedPrimary: {
            backgroundColor: "#007aff",
            "&:hover": {
              backgroundColor: "#0062cc",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
          },
        },
      },
    },
  })

  const { isAuthenticated, user } = useAuthStore();
  
  return (
    <>
    <ThemeProvider theme={darkTheme}>
    <Toaster position="top-right" reverseOrder={false}/>
    <CssBaseline />
    <NavBar/>
    <Routes>
      { useScrollToTop() }
      { console.log(isAuthenticated, "||", user) }
      <Route path="/" element={ <Home/> } />
      <Route path='/login' element={ isAuthenticated?<Navigate to="/"/>:<Login/> } />
      <Route path='/signup' element={ isAuthenticated?<Navigate to="/"/>:<Signup/> } />
      <Route path="/events" element={ <Events/> } />
      <Route path="/event-registrations" element={ <EventRegister/> } />
      <Route path='/events/:id/register' element={ <EventRegistration/> } />
      <Route path="/create-event" element={ isAuthenticated? <CreateEvent/>:<Navigate to="/login"/> } />
      <Route path="/profile" element={ isAuthenticated?<Profile/>:<Navigate to="/login"/> } />
      <Route path="/profile/analytics" element={ isAuthenticated?<Analytics/>:<Navigate to="/login"/> } />
      <Route path="*" element={ <PageNotFound/> } />
    </Routes>
    <Footer/>
    </ThemeProvider>
    </>
  )
}

export default App
