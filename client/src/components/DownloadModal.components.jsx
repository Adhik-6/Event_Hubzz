import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography } from "@mui/material"
import { Download as DownloadIcon } from "@mui/icons-material"

export const DownloadModal = ({ open, onClose, onDownload, defaultFilename }) => {
  const [filename, setFilename] = useState(defaultFilename || "event_registrations")
  const [error, setError] = useState("")

  // Handle filename change
  const handleFilenameChange = (event) => {
    const value = event.target.value
    setFilename(value)

    // Validate filename
    if (!value.trim()) {
      setError("Filename is required")
    } else if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      setError("Filename can only contain letters, numbers, underscores, and hyphens")
    } else {
      setError("")
    }
  }

  // Handle download button click
  const handleDownloadClick = () => {
    if (!filename.trim()) {
      setError("Filename is required")
      return
    }

    onDownload(filename)
  }

  // Reset state when modal is opened
  const handleEnter = () => {
    setFilename(defaultFilename || "event_registrations")
    setError("")
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" TransitionProps={{ onEnter: handleEnter }}>
      <DialogTitle>Download Registrations</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <Typography variant="body2" paragraph>
            Enter a filename for the Excel spreadsheet containing registration data.
          </Typography>

          <TextField
            fullWidth
            label="Filename"
            value={filename}
            onChange={handleFilenameChange}
            error={!!error}
            helperText={error || "The file will be downloaded as [filename].xlsx"}
            autoFocus
            InputProps={{
              endAdornment: (
                <Typography variant="body2" color="text.secondary">
                  .xlsx
                </Typography>
              ),
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownloadClick} disabled={!!error}>
          Download
        </Button>
      </DialogActions>
    </Dialog>
  )
}
