"use client"

import { useState } from "react"
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Typography,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"

export const RegistrationsTable = ({ registrations, formFields }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter registrations based on search query
  const filteredRegistrations = registrations.filter((registration) => {
    const searchLower = searchQuery.toLowerCase()

    // Search in user info
    if (
      registration.name.toLowerCase().includes(searchLower) ||
      registration.email.toLowerCase().includes(searchLower)
    ) {
      return true
    }

    // Search in form responses
    for (const key in registration.formResponses) {
      const value = registration.formResponses[key]
      if (value && typeof value === "string" && value.toLowerCase().includes(searchLower)) {
        return true
      }
    }

    return false
  })

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setPage(0)
  }

  // Format registration date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search registrations..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Paper elevation={1}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", minWidth: 60 }}>#</TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 180 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 180 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 180 }}>Registration Date</TableCell>
                {formFields.map((field) => (
                  <TableCell key={field.id} sx={{ fontWeight: "bold", minWidth: 150 }}>
                    {field.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRegistrations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((registration, index) => (
                  <TableRow key={registration.id} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{registration.name}</TableCell>
                    <TableCell>{registration.email}</TableCell>
                    <TableCell>{formatDate(registration.registrationDate)}</TableCell>
                    {formFields.map((field) => (
                      <TableCell key={field.id}>{renderCellContent(registration.formResponses[field.id])}</TableCell>
                    ))}
                  </TableRow>
                ))}
              {filteredRegistrations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4 + formFields.length} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No registrations found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredRegistrations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Box sx={{ mt: 2, textAlign: "right" }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredRegistrations.length} of {registrations.length} registrations
        </Typography>
      </Box>
    </Box>
  )
}

// Helper function to render cell content based on data type
const renderCellContent = (content) => {
  if (content === undefined || content === null) {
    return "-"
  }

  if (typeof content === "boolean") {
    return content ? "Yes" : "No"
  }

  if (Array.isArray(content)) {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {content.map((item, index) => (
          <Chip key={index} label={item} size="small" />
        ))}
      </Box>
    )
  }

  return content.toString()
}
