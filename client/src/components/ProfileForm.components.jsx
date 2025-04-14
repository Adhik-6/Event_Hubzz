import { useState } from "react"
import { Box, Grid, TextField, Typography, Button, Avatar, Paper, Divider, InputAdornment, CircularProgress } from "@mui/material"
import {
  CloudUpload as CloudUploadIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Save as SaveIcon,
  Edit as EditIcon
} from "@mui/icons-material"
import placeHolderAvatar from './../assets/placeHolderAvatar.jpeg'
import { axiosInstance } from "../utils/index.utils.js"
import { useAuthStore } from "../stores/index.stores.js"
import toast from "react-hot-toast"

export const ProfileForm = ({ profile }) => {

  const { setUser } = useAuthStore();

  const [formData, setFormData] = useState({
    _id: profile._id,
    name: profile.fullName || "",
    username: profile.userName || "",
    email: profile.mail || "",
    phone: profile.phoneNumber || "",
    organization: profile.organization || "",
    bio: profile.bio || "",
    website: profile.website || "",
    facebook: profile.socialMedia?.facebook || "",
    twitter: profile.socialMedia?.twitter || "",
    instagram: profile.socialMedia?.instagram || "",
    linkedin: profile.socialMedia?.linkedin || "",
    profilePicture: profile.profilePic || null,
    // profilePicturePreview: profile.profilePicture || null,
  })
  const [isEditing, setEditing] = useState(false)
  const [isLoading, setLoading] = useState(false)

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
          profilePicture: reader.result,
          // profilePicturePreview: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Validate form
  const validateForm = () => {

    // Validate email
    if (!formData.email.trim()) {
      toast.error("Email is required")
      return false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Email is invalid")
      return false
    }

    // Validate fullName
    if (!formData.name.trim()) {
      toast.error("Full name is required")
      return false
    }

    // Validate userName
    if (!formData.username.trim()) {
      toast.error("Username is required")
      return false
    }

    // Validate organisation
    if (!formData.organization.trim()) {
      toast.error("Organisation is required")
      return false
    }

    // Validate phoneNumber
    if(formData.phone && !/^\+?[0-9\s-()]{8,}$/.test(formData.phone.trim())) {
      toast.error("Please enter a valid phone number")
      return false
    }

    // Validate website if provided
    if (formData.website && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(formData.website)) {
      toast.error("Please enter a valid website URL")
      return false
    }

    return true
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault()

    if (!validateForm()){
      setLoading(false)
      return
    }

    const userProfile = {
      _id: formData._id,
      fullName: formData.name,
      userName: formData.username,
      mail: formData.email,
      phoneNumber: formData.phone,
      organization: formData.organization,
      bio: formData.bio,
      website: formData.website,
      profilePic: formData.profilePicture,
      socialMedia: {
        facebook: formData.facebook,
        twitter: formData.twitter,
        instagram: formData.instagram,
        linkedin: formData.linkedin,
      },
    }

    try {
      const res = await axiosInstance.patch("/auth/update-profile", { userProfile })
      if(res.data?.success){
        console.log("is ", res.data.updatedProfile)
        setUser(res.data.updatedProfile)
        // not assigned right after updating
        toast.success(res.data.message)
        setEditing(prev => !prev)
      } else
        toast.error(res.data.message)
    } catch (err) {
      console.log("Error when updating", err)
      toast.error(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form">
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>

        <Typography variant="h6" gutterBottom>
          Profile Information
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar src={formData.profilePicture || placeHolderAvatar} alt={formData.name} sx={{ width: 150, height: 150, mb: 2 }} />

            <input
              accept="image/*"
              style={{ display: "none" }}
              id="profile-picture-upload"
              type="file"
              onChange={handleProfilePictureUpload}
            />
            <label htmlFor="profile-picture-upload">
              <Button variant="outlined" component="span" disabled={!isEditing} startIcon={<CloudUploadIcon />} size="small">
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
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  disabled={!isEditing}
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  disabled={!isEditing}
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  disabled={!isEditing} 
                  label="Phone Number" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="1234567890"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Organization"
                  name="organization"
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                  value={formData.website}
                  onChange={handleChange}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
        <Button type="submit" variant="contained" onClick={(e) => {
          if(isEditing)
            handleSubmit(e)
          else{
            e.preventDefault()
            setEditing(prev => !prev)
          }}}
          disabled={isLoading}
          startIcon={ isEditing?(isLoading?"":<SaveIcon/>):<EditIcon/> } size="large">
          { isEditing?(isLoading?<CircularProgress size={24}/>:"Save Changes"):"Edit Profile" }
        </Button>
      </Box>

    </Box>
  )
}
