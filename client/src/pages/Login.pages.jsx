import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
  Divider,
  Alert,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material"
import {
  Visibility,
  VisibilityOff,
  Mail as MailIcon,
  Lock as LockIcon,
} from "@mui/icons-material"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { AuthLayout } from "./../components/index.components.js"
import { useAuthStore } from "../stores/index.stores.js"
import toast from "react-hot-toast"

// Simplify the form to only include email and password
export const Login = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState("")
  const { login } = useAuthStore();
  const navigate = useNavigate()

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }

    // Clear login error when any field is edited
    if (loginError) {
      setLoginError("")
    }
  }

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      let x = await login(formData)
      if(x?.success){
        // console.log("login successful")
        navigate(-1)
      } else {
        console.log(`Something went wrong: ${x?.message}`)
      }
    } catch (err) {
      // loginError(err.response.data?.message)
      console.error("Registration error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {loginError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {loginError}
          </Alert>
        )}

        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          autoComplete="email"
          autoFocus
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, mb: 2 }}>
          <Link component={RouterLink} to="/forgot-password" variant="body2" underline="hover">
            Forgot password?
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{
            py: 1.5,
            position: "relative",
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{" "}
            <Link component={RouterLink} to="/signup" variant="body2" underline="hover" fontWeight="medium">
              Sign up
            </Link>
          </Typography>
        </Box>

      </Box>
    </AuthLayout>
  )
}
