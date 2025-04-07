"use client"

import { useState } from "react"
import { Box, Grid, TextField, Typography, Button, Avatar, Paper, Divider, InputAdornment } from "@mui/material"
import {
  CloudUpload as CloudUploadIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Save as SaveIcon,
} from "@mui/icons-material"

export const ProfileForm = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: profile.name || "",
    username: profile.username || "",
    email: profile.email || "",
    phone: profile.phone || "",
    organization: profile.organization || "",
    bio: profile.bio || "",
    website: profile.website || "",
    facebook: profile.socialMedia?.facebook || "",
    twitter: profile.socialMedia?.twitter || "",
    instagram: profile.socialMedia?.instagram || "",
    linkedin: profile.socialMedia?.linkedin || "",
    profilePicture: profile.profilePicture || null,
    profilePicturePreview: profile.profilePicture || null,
  })

  const [errors, setErrors] = useState({})

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
  }

  // Handle profile picture upload
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePicture: file,
          profilePicturePreview: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (formData.website && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(formData.website)) {
      newErrors.website = "Website URL is invalid"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const updatedProfile = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        bio: formData.bio,
        website: formData.website,
        socialMedia: {
          facebook: formData.facebook,
          twitter: formData.twitter,
          instagram: formData.instagram,
          linkedin: formData.linkedin,
        },
        profilePicture: formData.profilePicturePreview,
      }

      onUpdate(updatedProfile)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Profile Information
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar src={formData.profilePicturePreview} alt={formData.name} sx={{ width: 150, height: 150, mb: 2 }} />

            <input
              accept="image/*"
              style={{ display: "none" }}
              id="profile-picture-upload"
              type="file"
              onChange={handleProfilePictureUpload}
            />
            <label htmlFor="profile-picture-upload">
              <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />} size="small">
                Change Photo
              </Button>
            </label>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, textAlign: "center" }}>
              Recommended: Square image, at least 300x300 pixels
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={!!errors.username}
                  helperText={errors.username}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Company or organization name"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  placeholder="Tell others about yourself or your organization"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  error={!!errors.website}
                  helperText={errors.website}
                  placeholder="https://example.com"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Social Media
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Facebook"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="Username or profile URL"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FacebookIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Twitter"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="Username without @"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TwitterIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="Username without @"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InstagramIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="LinkedIn"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="Username or profile URL"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkedInIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" variant="contained" startIcon={<SaveIcon />} size="large">
          Save Changes
        </Button>
      </Box>
    </Box>
  )
}
