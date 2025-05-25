import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
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
} from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import { useAnalyticsStore } from "../stores/index.stores.js"
import { axiosInstance, formatDateForTable } from "../utils/index.utils.js"

export const RegistrationsTable = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState("")
  const { id } = useParams();
  const { analytics_currentEvent, tableData, setTableData, filteredRegistrations, setFilteredRegistrations } = useAnalyticsStore();

  useEffect(() => {
    async function fetchTableData(){
      try {
        const res = await axiosInstance.get(`/analytics/table-data/${id}`)
        if(!res.data.success) throw new Error(res.data.message)
        setTableData(res.data.allRegistrations)
        setFilteredRegistrations(res.data.allRegistrations)
        // console.log("res.data.allRegistrations: ", res.data.allRegistrations)
      } catch (err) {
        console.log("Error fetching table data: ", err);
        toast.error(err.message);
      }
    }
    fetchTableData()
  }, [])

  // Filter registrations based on search query
  // this seems to run quite a lot of time, do something
  useEffect(() => {
    if(tableData && Array.isArray(filteredRegistrations)){
      const searchLower = searchQuery?.toLowerCase()
      setFilteredRegistrations(tableData.filter((registration) => {
      // console.log("Registration: ", registration)
      
      // Search in user info
      if (registration.mail?.toLowerCase().includes(searchLower)) return true
      
      // Search in form responses
      for (const key in registration?.responses) {
        const value = registration.responses[key]
        if (value && typeof value === "string" && value?.toLowerCase().includes(searchLower)) return true
      }
      
      return false
    }))
  }
  // console.log("running: ")
  }, [searchQuery])

  // Handle page change
  const handlePageChange = (e, newPage) => {
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
    window.scrollTo(0, 0)
  }

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setPage(0)
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
        <TableContainer sx={{ maxHeight: 600, overflow: 'auto', '&::-webkit-scrollbar': {display: 'none'}, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <Table stickyHeader>
            
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", minWidth: 60 }}>#</TableCell>
                {/* <TableCell sx={{ fontWeight: "bold", minWidth: 180 }}>Name</TableCell> */}
                <TableCell sx={{ fontWeight: "bold", minWidth: 180 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 180 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 180 }}>Registration Date</TableCell>
                {analytics_currentEvent.formFields.map((field) => {
                  if(field.label.toLowerCase() === "email" || field.label.toLowerCase() === "mail" ) return null
                  return <TableCell key={field._id} sx={{ fontWeight: "bold", minWidth: 150 }}>{field.label}</TableCell>
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRegistrations && filteredRegistrations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((registration, index) => (
                  <TableRow key={registration._id} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    {/* <TableCell>{registration.name}</TableCell> */}
                    {/* {console.log("registration: ", registration)} */}
                    <TableCell>{registration.mail}</TableCell>
                    <TableCell><Chip label={registration.checkedIn?"Present":"Absent"} size="large" color={registration.checkedIn ? "success" : "error"} /></TableCell>
                    <TableCell>{formatDateForTable(registration.createdAt)}</TableCell>
                    {analytics_currentEvent.formFields.map((field) => {
                      if(field.label.toLowerCase() === "email" || field.label.toLowerCase() === "mail" ) return null
                      return <TableCell key={field._id}>{renderCellContent(registration.responses[field.label],field.type)}</TableCell>
                    })}
                  </TableRow>
                ))}
              {filteredRegistrations && filteredRegistrations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4 + analytics_currentEvent.formFields.length} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No registrations found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* { console.log("filteredRegistrations", filteredRegistrations) } */}
        {/* { console.log("analytics_currentEvent", analytics_currentEvent) } */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredRegistrations?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Box sx={{ mt: 2, textAlign: "right" }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredRegistrations?.length || 0} of {tableData.length} registrations
        </Typography>
      </Box>
    </Box>
  )
}

const renderCellContent = (content, type) => {
  if (content === undefined || content === null || content === '') return "-"

  if (typeof content === "boolean") return content ? "Yes" : "No"

  if (Array.isArray(content)) {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {content.map((item, index) => <Chip key={index} label={item} size="small" />)}
      </Box>
    )
  }

  if(type === "date") return formatDateForTable(content).split(',').slice(0,2).join(',')

  if(type === "time") return formatDateForTable(content).split(',')[2]

  if(content.length > 50) {
    return (
      <Box sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {content}
      </Box>
    )
  }

  return content.toString()
}
