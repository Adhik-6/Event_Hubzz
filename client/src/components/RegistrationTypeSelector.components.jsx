import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Paper
} from "@mui/material";
import { Link as LinkIcon, Edit as EditIcon } from "@mui/icons-material";
import { useEventStore } from "./../stores/index.stores.js";

export const RegistrationTypeSelector = () => {
  const { externalUrl, setExternalUrl } = useEventStore();

  const isExternal = externalUrl !== "";

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setExternalUrl("");
    } else if (value === "external") {
      setExternalUrl("https://"); // or leave as "" if you want to prompt input
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Registration Method
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, mt: 2 }}>
        Choose how participants will register for your event.
      </Typography>

      <RadioGroup value={isExternal ? "external" : "custom"} onChange={handleChange}>
        <Paper
          elevation={!isExternal ? 3 : 1}
          sx={{
            p: 2,
            mb: 2,
            border: !isExternal ? 2 : 1,
            borderColor: !isExternal ? "primary.main" : "divider",
            borderRadius: 1,
          }}
        >
          <FormControlLabel
            value="custom"
            control={<Radio />}
            label={
              <Box sx={{ ml: 1 }}>
                <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center" }}>
                  <EditIcon sx={{ mr: 1, fontSize: 20 }} />
                  Custom Registration Form
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create a custom form to collect participant information
                </Typography>
              </Box>
            }
          />
        </Paper>

        <Paper
          elevation={isExternal ? 3 : 1}
          sx={{
            p: 2,
            border: isExternal ? 2 : 1,
            borderColor: isExternal ? "primary.main" : "divider",
            borderRadius: 1,
          }}
        >
          <FormControlLabel
            value="external"
            control={<Radio />}
            label={
              <Box sx={{ ml: 1 }}>
                <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center" }}>
                  <LinkIcon sx={{ mr: 1, fontSize: 20 }} />
                  External Registration URL
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Link to an external registration form or website
                </Typography>
              </Box>
            }
          />

          {isExternal && (
            <TextField
              fullWidth
              label="Registration URL"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder="https://example.com/register"
              sx={{ mt: 2 }}
              required
              helperText="Enter the URL where participants can register for your event"
            />
          )}
        </Paper>
      </RadioGroup>
    </Box>
  );
};
