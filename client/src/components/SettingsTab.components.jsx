import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Divider,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  Grid,
  Alert,
  CircularProgress,
  Collapse,
  IconButton,
} from "@mui/material"
import toast from "react-hot-toast"
import { Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { axiosInstance } from "../utils/index.utils.js"
import { useAuthStore } from "../stores/index.stores.js"

export const SettingsTab = () => {
  const PrimarySwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.primary.main,
    '& + .MuiSwitch-track': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  }));

  const { logout } = useAuthStore()

  const [isLoadingPassword, setIsLoadingPassword] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  
  const [showSuccess, setShowSuccess] = useState(true);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
  })

  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })



  // Handle settings change
  const handleSettingChange = (setting) => setSettings({...settings, [setting]: !settings[setting]})

  // Handle password form change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm({...passwordForm, [name]: value})

    // Clear messages when form changes
    setPasswordError("")
    setPasswordSuccess("")
  }

  // Handle password update
  const handlePasswordUpdate =  async (e) => {
    e.preventDefault()
    setIsLoadingPassword(true)

    // Simple validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError("All fields are required")
      return
    }

    if (passwordForm.newPassword === passwordForm.currentPassword) {
      setPasswordError("New password cannot be the same as current password")
      return
    }


    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long")
      return
    }

    try {
      const res = await axiosInstance.patch("/auth/update-password", passwordForm)
      if (res.data?.success) {
        setPasswordSuccess("Password updated successfully")
      } else {
        setPasswordError(res.data?.message || "Error updating password. Please try again later.")
      }
    } catch (err) {
      console.log("Error updating password:", err)
      setPasswordError(err.response?.data?.message || "Error updating password. Please try again later.")
    } finally {
      setIsLoadingPassword(false)
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return
    setIsLoadingDelete(true)
    try {
      const res = await axiosInstance.delete("/auth/delete-profile")
      if(res.data?.success){
        toast.success("Account deleted successfully")
        logout()
        window.location.href = "/"
        toast("Contact support for further assistance")
      } else {
        toast.error(res.data?.message || "Error deleting account. Please try again later.")
        console.log("Error deleting account:", res.data?.message)
      }
    } catch (err) {
      console.log("Error deleting account:", err)
      toast.error( err.response?.data?.message || "Error deleting account. Please try again later." ) 
    } finally {
      setIsLoadingDelete(false)
    }
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
        Settings
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <FormControlLabel
          control={
            <PrimarySwitch
              checked={settings.emailNotifications}
              onChange={() => handleSettingChange("emailNotifications")}
            />
          }
          label="Email Notifications"
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ ml: 6, mb: 2 }}
        >
          Receive email notifications about your events and registrations
        </Typography>
        
        <FormControlLabel
          control={
            <PrimarySwitch
              checked={settings.pushNotifications}
              onChange={() => handleSettingChange("pushNotifications")}
            />
          }
          label="Push Notifications"
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ ml: 6, mb: 2 }}
        >
          Receive push notifications on your device
        </Typography>
        
        <FormControlLabel
          control={
            <PrimarySwitch
              checked={settings.marketingEmails}
              onChange={() => handleSettingChange("marketingEmails")}
            />
          }
          label="Marketing Emails"
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ ml: 6, mb: 2 }}
        >
          Receive updates about new features and promotions
        </Typography>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Security
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
          Change Password
        </Typography>

        {passwordError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {passwordError}
          </Alert>
        )}

        {passwordSuccess && (
          <Collapse in={passwordSuccess && showSuccess}>
            <Alert
              severity="success"
              sx={{ mb: 2 }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setShowSuccess(false)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {passwordSuccess}
            </Alert>
          </Collapse>

        )}

        <Box component="form" onSubmit={handlePasswordUpdate}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="password"
                label="New Password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="password"
                label="Confirm New Password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={isLoadingPassword}>
            {isLoadingPassword ? <CircularProgress size={24} /> : "Update Password"}
          </Button>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom color="error">
          Danger Zone
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1" paragraph>
          Once you delete your account, You may be able to login and participate in any events. Please be certain.
        </Typography>

        <Button onClick={handleDeleteAccount} variant="outlined" color="error" disabled={isLoadingDelete}>
          {isLoadingDelete ? <CircularProgress/> : "Delete Account"}
        </Button>

      </Paper>
    </Box>
  )
}
