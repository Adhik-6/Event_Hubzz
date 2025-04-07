"use client"

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
} from "@mui/material"

export const SettingsTab = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")

  // Handle settings change
  const handleSettingChange = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    })
  }

  // Handle password form change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    })

    // Clear messages when form changes
    setPasswordError("")
    setPasswordSuccess("")
  }

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault()

    // Simple validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError("All fields are required")
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

    // In a real app, you would send the password update to your backend
    console.log("Updating password")

    // Show success message
    setPasswordSuccess("Password updated successfully")

    // Reset form
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
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
            <Switch checked={settings.emailNotifications} onChange={() => handleSettingChange("emailNotifications")} />
          }
          label="Email Notifications"
        />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
          Receive email notifications about your events and registrations
        </Typography>

        <FormControlLabel
          control={
            <Switch checked={settings.pushNotifications} onChange={() => handleSettingChange("pushNotifications")} />
          }
          label="Push Notifications"
        />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
          Receive push notifications on your device
        </Typography>

        <FormControlLabel
          control={
            <Switch checked={settings.marketingEmails} onChange={() => handleSettingChange("marketingEmails")} />
          }
          label="Marketing Emails"
        />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
          Receive updates about new features and promotions
        </Typography>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Security
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Change Password
        </Typography>

        {passwordError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {passwordError}
          </Alert>
        )}

        {passwordSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {passwordSuccess}
          </Alert>
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

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Update Password
          </Button>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom color="error">
          Danger Zone
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="body2" paragraph>
          Once you delete your account, there is no going back. Please be certain.
        </Typography>

        <Button variant="outlined" color="error">
          Delete Account
        </Button>

      </Paper>
    </Box>
  )
}
