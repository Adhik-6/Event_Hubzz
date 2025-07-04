import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Button,
} from "@mui/material"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useEventStore } from './../stores/index.stores.js'

export const FormPreview = () => {
  const { formFields } = useEventStore();

  if (formFields.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Your form preview will appear here as you add fields.
        </Typography>
      </Box>
    )
  }

  return (
    <Box component="form" sx={{ "& > *": { mb: 3 } }}>
      {formFields.map((field) => (
        <Box key={field.id}>
          {field.type === "text" && (
            <TextField
              fullWidth
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              disabled
              variant="standard"
            />
          )}

          {field.type === "multiline" && (
            <TextField
              fullWidth
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              disabled
              variant="standard"
              multiline
              rows={4}
              sx={{ mb: 3 }}
            />
          )}

          {field.type === "dropdown" && (
            // <FormControl sx={{ minWidth: "210px"}} required={field.required}>
            //   <InputLabel>{field.label}</InputLabel>
            //   <Select value={''} label={field.label} disabled>
            //     <MenuItem key="0" value="">
            //       {""}
            //     </MenuItem>
            //     {field.options.map((option) => (
            //       <MenuItem key={option.value} value={option.value}>
            //         {option.value}
            //       </MenuItem>
            //     ))}
            //   </Select>
            // </FormControl>
            <FormControl sx={{ minWidth: 210, maxWidth: 400, width: 'fit-content',}} required={field.required}>
            <FormLabel sx={{mb: 1.5, mt: 2}} component="legend" id={`${field.id}-label`}>{field.label}</FormLabel>
              <Select value={''} disabled sx={{minWidth: 180, maxWidth: 400, width: 'fit-content' }}
                MenuProps={{
                  PaperProps: {
                    style: { maxHeight: 300 }
                  }
                }}>
                <MenuItem key="0" value="">
                  {""}
                </MenuItem>
                {field.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* <FormControl
  sx={{
    minWidth: 210,
    maxWidth: 400,         // Limit the max width
    width: 'fit-content',  // Expand based on label up to maxWidth
  }}
  required={field.required}
>
  <InputLabel>{field.label}</InputLabel>
  <Select
    value={''}
    label={field.label}
    disabled
    sx={{
      maxWidth: 400,
      width: 'fit-content', // Ensures it grows with label
    }}
    MenuProps={{
      PaperProps: {
        style: {
          maxHeight: 300,   // Height limit to expand dropdown vertically
        },
      },
    }}
  >
    <MenuItem key="0" value="">
      {""}
    </MenuItem>
    {field.options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.value}
      </MenuItem>
    ))}
  </Select>
</FormControl>
 */}

          {field.type === "multiple_choice" && (
            <FormControl component="fieldset" required={field.required}>
              <Typography variant="subtitle1" gutterBottom>
                {field.label}
                {field.required && <span style={{ color: "red" }}> *</span>}
              </Typography>
              <RadioGroup>
                {field.options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.value}
                    control={<Radio disabled />}
                    label={option.value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {field.type === "checkbox" && (
            <FormControl component="fieldset" required={field.required}>
              <Typography variant="subtitle1" gutterBottom>
                {field.label}
                {field.required && <span style={{ color: "red" }}> *</span>}
              </Typography>
              <FormGroup>
                {field.options.map((option) => (
                  <FormControlLabel key={option.id} control={<Checkbox disabled />} label={option.value} />
                ))}
              </FormGroup>
            </FormControl>
          )}

          {field.type === "date" && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>{field.label}{field.required && <span> *</span>}
              </Typography>
              <DatePicker
                selected={null}
                onChange={() => {}}
                placeholderText="DD/MM/YYYY"
                customInput={<TextField helperText={field.placeholder} fullWidth required={field.required} />}
                disabled
              />
            </Box>
          )}

          {field.type === "time" && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>{field.label}{field.required && <span> *</span>}
              </Typography>
              <DatePicker
                showTimeSelect showTimeSelectOnly timeCaption="Time" dateFormat="hh:mm aa"
                selected={null}
                onChange={() => {}}
                placeholderText="HH:MM PM"
                customInput={<TextField helperText={field.placeholder} fullWidth required={field.required} />}
                disabled
              />
            </Box>
          )}
        </Box>
      ))}

      <Button variant="contained" disabled sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  )
}

