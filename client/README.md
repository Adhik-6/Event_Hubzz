# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


{/* <Grid container spacing={4}>
//         <Grid item xs={12} md={6}>
//           <Box
//             component="img"
//             src={event.eventImage || "/placeholder.svg?height=300&width=500"}
//             alt={event.title}
//             sx={{
//               width: "100%",
//               height: 300,
//               objectFit: "cover",
//               borderRadius: 2,
//               mb: 2,
//             }}
//           />

//           <Paper elevation={1} sx={{ p: 2, bgcolor: isFull ? "error.50" : "success.50", borderRadius: 2 }}>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <PersonIcon sx={{ mr: 1, color: isFull ? "error.main" : "success.main" }} />
//               <Typography variant="body2" fontWeight="medium" color={isFull ? "error.main" : "success.main"}>
//                 {isFull ? "This event is currently full" : `${remainingSpots} spots remaining out of ${event.capacity}`}
//               </Typography>
//             </Box>
//           </Paper>
//         </Grid>

//           <Grid item xs={12} md={6}>
//             <Paper elevation={3} sx={{ p: 4, bgcolor: "grey.900", borderRadius: 3 }}>
//             <Typography variant="h4" fontWeight="bold" gutterBottom color="primary.light">
//               {event.title}
//             </Typography>

//             <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//               <CategoryIcon sx={{ mr: 1, color: "secondary.main" }} />
//               <Typography variant="body1" color="grey.300">{event.category}</Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//               <CalendarIcon sx={{ mr: 1, color: "secondary.main" }} />
//               <Typography variant="body1" color="grey.300">
//                 {event.date} {event.endDate && ` - ${event.endDate}`}
//               </Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//               <TimeIcon sx={{ mr: 1, color: "secondary.main" }} />
//               <Typography variant="body1" color="grey.300">{event.time || "9:00 AM - 5:00 PM"}</Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//               <PlaceIcon sx={{ mr: 1, color: "secondary.main" }} />
//               <Typography variant="body1" color="grey.300">{event.location}</Typography>
//             </Box>

//             <Divider sx={{ my: 3, bgcolor: "grey.700" }} />

//             <Typography variant="h6" fontWeight="medium" gutterBottom color="primary.light">
//               About This Event
//             </Typography>
//             <Typography variant="body1" color="grey.400" paragraph>
//               {event.description}
//             </Typography>

//           {event.price && (
//             <Paper elevation={2} sx={{ p: 2, mt: 3, bgcolor: "grey.800", borderRadius: 2 }}>
//               <Typography variant="subtitle1" fontWeight="bold" color="primary.light">
//                 Registration Fee: ${event.price}
//               </Typography>
//               {event.priceDetails && (
//                 <Typography variant="body2" color="grey.400">{event.priceDetails}</Typography>
//               )}
//             </Paper>
//           )}
//         </Paper>
//         </Grid>
</Grid>  */}