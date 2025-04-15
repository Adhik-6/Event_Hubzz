import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
  Checkbox,
  FormControlLabel,
  Divider,
  Alert,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Grid,
  Avatar,
} from "@mui/material"
import {
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Mail as MailIcon,
  Lock as LockIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  Badge as BadgeIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { AuthLayout } from "./../components/index.components.js"
import { useAuthStore } from "../stores/index.stores.js"
import toast from "react-hot-toast"

export const Signup = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    userName: "",
    organisation: "",
    phoneNumber: "",
    bio: "",
    website: "",
    profilePic: null,
    // profilePicPreview: null,
  })
  const [errors, setErrors] = useState({})
  const [signupError, setSignupError] = useState("")
  const [signupSuccess, setSignupSuccess] = useState(false)
  const navigate = useNavigate()
  const { signUp } = useAuthStore();

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

    // Clear signup error when any field is edited
    if (signupError) {
      setSignupError("")
    }
  }

  // Handle profile picture upload
  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePic: file,
          // profilePicPreview: reader.result,
        })
      }
      reader.readAsDataURL(file)
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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    // Validate fullName
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    // Validate userName
    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required"
    }

    // Validate organisation
    if (!formData.organisation.trim()) {
      newErrors.organisation = "Organisation is required"
    }

    // Validate phoneNumber
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^\+?[0-9\s-()]{8,}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid phone number"
    }

    // Validate website if provided
    if (formData.website && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(formData.website)) {
      newErrors.website = "Please enter a valid website URL"
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
      let x = await signUp(formData)
      if(x?.success){
        setSignupSuccess(true)
        // toast.success("Registration successful")
        navigate('/')
      } else {
        console.log(`Something went wrong: ${x?.message}`)
      }
    } catch (err) {
      setSignupError(err.response.data.message)
      console.error("Registration error:", err)
    } finally {
      setIsLoading(false)
    }
  }


  if (signupSuccess) {
    return (
      <AuthLayout title="Registration Successful">
        <Alert severity="success" sx={{ mb: 3 }}>
          Your account has been created successfully!
        </Alert>
        <Typography variant="body1" paragraph>
          We've sent a verification email to <strong>{formData.email}</strong>. Please check your inbox and follow the
          instructions to verify your account.
        </Typography>
        <Button component={RouterLink} to="/login" variant="contained" fullWidth size="large" sx={{ mt: 2, py: 1.5 }}>
          Go to Login
        </Button>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Create an account">
      <Box component="form" onSubmit={handleSubmit} noValidate>

        {/* Profile Picture Upload */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={formData.profilePic}
              alt="Profile Preview"
              sx={{
                width: 100,
                height: 100,
                border: "1px solid",
                borderColor: "divider",
              }}
            />
            <input
              accept="image/*"
              id="profile-pic-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleProfilePicUpload}
            />
            <label htmlFor="profile-pic-upload">
              <IconButton
                component="span"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
                size="small"
              >
                <CloudUploadIcon sx={{color: "grey"}} fontSize="small" />
              </IconButton>
            </label>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
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
          </Grid>

          {/* Password */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              error={!!errors.password}
              helperText={errors.password || "Password must be at least 8 characters"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Full Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="fullName"
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              autoComplete="name"
              error={!!errors.fullName}
              helperText={errors.fullName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Username */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="userName"
              name="userName"
              label="Username"
              value={formData.userName}
              onChange={handleChange}
              required
              autoComplete="username"
              error={!!errors.userName}
              helperText={errors.userName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Organisation */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="organisation"
              name="organisation"
              label="Organisation"
              value={formData.organisation}
              onChange={handleChange}
              required
              autoComplete="organization"
              error={!!errors.organisation}
              helperText={errors.organisation}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              autoComplete="tel"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Website */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="website"
              name="website"
              label="Website"
              value={formData.website}
              onChange={handleChange}
              autoComplete="url"
              error={!!errors.website}
              helperText={errors.website}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Bio */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="bio"
              name="bio"
              label="Bio"
              value={formData.bio}
              onChange={handleChange}
              multiline
              rows={3}
              placeholder="Tell us about yourself or your organization"
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{
            mt: 3,
            py: 1.5,
            position: "relative",
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </Button>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" variant="body2" underline="hover" fontWeight="medium">
              Login
            </Link>
          </Typography>
        </Box>

      </Box>
    </AuthLayout>
  )
}
