import { useState, useEffect } from "react"
import { Box, Grid, Paper, Typography, LinearProgress, useTheme, useMediaQuery } from "@mui/material"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useAnalyticsStore } from "../stores/index.stores.js";
import toast from "react-hot-toast";
import { axiosInstance } from './../utils/index.utils.js'
import { useParams } from "react-router-dom";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper elevation={3} style={{ padding: '10px', backgroundColor: '#fff', color: "black" }}>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h6" style={{ marginBottom: '5px' }}>
              {label} {/* This will display the date */}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Registrations: <strong>{payload[0].value}</strong> {/* This will display the count */}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return null;
};

export const AnalyticsSummary = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  // const [summaryData, setSummaryData] = useState({
  //   registrationsByDay: [],
  //   questionSummaries: [],
  // })

  // Process data for charts and summaries
  // useEffect(() => {
  //   if (registrations.length === 0 || formFields.length === 0) return

  //   // Process registrations by day
  //   const registrationDates = {}
  //   registrations.forEach((reg) => {
  //     const date = new Date(reg.registrationDate).toLocaleDateString()
  //     registrationDates[date] = (registrationDates[date] || 0) + 1
  //   })

  //   const registrationsByDay = Object.keys(registrationDates)
  //     .map((date) => ({
  //       date,
  //       count: registrationDates[date],
  //     }))
  //     .sort((a, b) => new Date(a.date) - new Date(b.date))

  //   // Process question summaries
  //   const questionSummaries = formFields.map((field) => {
  //     const responses = registrations.map((reg) => reg.formResponses[field.id])

  //     // Count frequency of each response
  //     const counts = {}
  //     responses.forEach((response) => {
  //       if (response === undefined || response === null) return

  //       if (Array.isArray(response)) {
  //         response.forEach((item) => {
  //           counts[item] = (counts[item] || 0) + 1
  //         })
  //       } else {
  //         const value = response.toString()
  //         counts[value] = (counts[value] || 0) + 1
  //       }
  //     })

  //     // Convert to array for charts
  //     const data = Object.keys(counts)
  //       .map((key) => ({
  //         name: key,
  //         value: counts[key],
  //       }))
  //       .sort((a, b) => b.value - a.value)

  //     return {
  //       field,
  //       data,
  //       total: responses.filter((r) => r !== undefined && r !== null).length,
  //     }
  //   })

  //   setSummaryData({
  //     registrationsByDay,
  //     questionSummaries,
  //   })
  // }, [registrations, formFields])

  // COLORS for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]
  const { summaryData, registrationsOverTime, setRegistrationsOverTime, questionSummaries, setQuestionSummaries } = useAnalyticsStore();
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const [ res1, res2 ] = await Promise.all([
          axiosInstance.get(`/analytics/registrations-over-time/${id}`),
          axiosInstance.get(`/analytics/pie-chart-data/${id}`)
        ])

        if(!res1.data.success || !res2.data.success) throw new Error("Error fetching summary")
        setRegistrationsOverTime(res1.data.dbRes)
        setQuestionSummaries(res2.data.dbRes)
        // console.log("registrationsOverTime: ", res.data.dbRes)
      } catch (err) {
        console.log("Error fetching Summary", err)
        toast.error(err.message)
      }
    }
    getData()
  },[])

  return (
    <Box>

      {/* Linear Registration Progress */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Registration Progress
        </Typography>

        <Box sx={{ mt: 2, mb: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">{summaryData?.registrations} registered</Typography>
            <Typography variant="body2">Capacity: {summaryData?.capacity || "None"}</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            color="secondary"
            value={summaryData?.capacity ? Number(((summaryData?.registrations / summaryData?.capacity)*100).toFixed(2)) : 100}
            sx={{ mt: 1, height: 10, borderRadius: 5 }}
          />
        </Box>
      </Paper>

      {/* Registrations Over Time */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Registrations Over Time
        </Typography>

        <Box sx={{ height: 300, mt: 2, color: "black" }}>
          {registrationsOverTime.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrationsOverTime} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip content={<CustomTooltip/>}/>
                <Bar dataKey="count" name="Registrations" fill={theme.palette.secondary.main} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <Typography variant="body2" color="text.secondary">
                No registration data available
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Question Summaries */}
      <Typography variant="h6" gutterBottom>
        Response Summaries
      </Typography>

      {/* {console.log("Array.isArray(questionSummaries) :", Array.isArray(questionSummaries))}
      {console.log("questionSummaries", questionSummaries)} */}

      <Grid container spacing={3}>
        {Array.isArray(questionSummaries) && questionSummaries.map((summary, index) => (
          <Grid item xs={12} md={6} key={summary.field.id}>
            <Paper elevation={1} sx={{ p: 3, height: "100%" }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                {summary.field.label}
              </Typography>

              {summary.data.length > 0 ? (
                <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}>
                  <Box sx={{ width: isMobile ? "100%" : "50%", height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={summary.data.slice(0, 5)}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          // label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          // labelLine={false}
                        >
                          {summary.data.slice(0, 5).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>

                  <Box
                    sx={{
                      width: isMobile ? "100%" : "50%",
                      pl: isMobile ? 0 : 2,
                      pt: isMobile ? 2 : 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    {summary.data.slice(0, 5).map((item, idx) => (
                      <Box key={idx} sx={{ mb: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="body2" noWrap sx={{ maxWidth: "70%" }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {item.value} ({((item.value / summary.total) * 100).toFixed(0)}%)
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(item.value / summary.total) * 100}
                          sx={{
                            mt: 0.5,
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "rgba(0,0,0,0.05)",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: COLORS[idx % COLORS.length],
                            },
                          }}
                        />
                      </Box>
                    ))}

                    {summary.data.length > 5 && (
                      <Typography variant="caption" color="text.secondary">
                        +{summary.data.length - 5} more responses
                      </Typography>
                    )}
                  </Box>
                </Box>
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
                  <Typography variant="body2" color="text.secondary">
                    No response data available
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}