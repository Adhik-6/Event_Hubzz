import { useState } from "react"

import { Box, Typography, Paper, Button, Divider, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, TextField, FormControlLabel, Checkbox, Tooltip, List, ListItem } from "@mui/material"

import { Add as AddIcon, TextFields as TextFieldsIcon, ArrowDropDown as DropdownIcon, RadioButtonChecked as RadioButtonIcon, CheckBox as CheckBoxIcon, CalendarToday as CalendarIcon, Delete as DeleteIcon, DragIndicator as DragIcon, Edit as EditIcon, Close as CloseIcon, Save as SaveIcon, Subject, AccessTimeOutlined } from "@mui/icons-material"
import toast from 'react-hot-toast';

import { useEventStore } from './../stores/index.stores.js'
//  CRUD operations in form builder

export const FormBuilder = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [editingFieldId, setEditingFieldId] = useState(null)

  const { formFields, setFormFields } = useEventStore();

  // Handle add field menu open
  const handleAddFieldClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  // Handle add field menu close
  const handleAddFieldClose = () => {
    setAnchorEl(null)
  }

  // Handle field type selection
  const handleFieldTypeSelect = (type) => {
    handleAddField(type)
    handleAddFieldClose()
  }

  // Handle edit field
  const handleEditField = (fieldId) => {
    setEditingFieldId(fieldId)
  }

  // Handle save field
  // const handleSaveField = () => {
  //   let isValid = true;
  //   for (let i = 0; i < formFields.length; i++) {
  //     const field = formFields[i];
  //     if (field.label.trim() === "") {
  //     isValid = false;
  //     return toast.error(`${field.type} question can't be empty`);
  //     }
  //     if (field.options.length !== 0) {
  //       for (let j = 0; j < field.options.length; j++) {
  //         if (field.options[j].value.trim() === "") {
  //           isValid = false;
  //           return toast.error(`Option ${j + 1} for ${field.type} question can't be empty`);
  //         }
  //       }
  //     }
  //   }
    
  //   if(isValid) setEditingFieldId(null)
  // }

  const handleSaveField = () => {
    for (let i = 0, len = formFields.length; i < len; i++) {
      const field = formFields[i];
      if (!field.label.trim()) {
        return toast.error(`${field.type} question can't be empty`);
      }
  
      const options = field.options;
      for (let j = 0, optLen = options.length; j < optLen; j++) {
        if (!options[j].value.trim()) {
          return toast.error(`Option ${j + 1} for ${field.type} question can't be empty`);
        }
      }
    }
  
    setEditingFieldId(null);
  };

  // Get icon for field type
  const getFieldTypeIcon = (type) => {
    switch (type) {
      case "text":
        return <TextFieldsIcon />
      case "multline":
        return <Subject />
      case "dropdown":
        return <DropdownIcon />
      case "multiple_choice":
        return <RadioButtonIcon />
      case "checkbox":
        return <CheckBoxIcon />
      case "date":
        return <CalendarIcon />
      case "time":
        return <AccessTimeOutlined />
      default:
        return <TextFieldsIcon />
    }
  }

  // Get field type name
  const getFieldTypeName = (type) => {
    switch (type) {
      case "text":
        return "Text Field"
      case "multiline":
        return "Multiline Text Field"
      case "dropdown":
        return "Dropdown"
      case "multiple_choice":
        return "Multiple Choice"
      case "checkbox":
        return "Checkbox"
      case "date":
        return "Date Picker"
      case "time":
        return "Time Picker"
      default:
        return "Unknown Type"
    }
  }

  // Get default label for field type
  const getDefaultLabelForType = (type) => {
    switch (type) {
      case "text":
        return "Text Question"
      case "multiline":
        return "Multiline Question"
      case "dropdown":
        return "Dropdown Question"
      case "multiple_choice":
        return "Multiple Choice Question"
      case "checkbox":
        return "Checkbox Question"
      case "date":
        return "Date Question"
      case "time":
        return "Time Question"
      default:
        return "New Question"
    }
  }

  // Handle form field addition
  const handleAddField = (fieldType) => {
    const newField = {
      type: fieldType,
      label: getDefaultLabelForType(fieldType),
      required: false,
      placeholder: "",
      options:
        fieldType === "dropdown" || fieldType === "multiple_choice" || fieldType === "checkbox"
          ? [{ id: `option_${Date.now()}`, value: "Option 1" }]
          : [],
    }

    setFormFields([...formFields, newField])
  }

  // Handle form field update
  const handleUpdateField = (fieldId, updates) => {
    setFormFields(formFields.map((field) => (field.id === fieldId ? { ...field, ...updates } : field)))
  }

  // Handle form field deletion
  const handleDeleteField = (fieldId) => {
    setFormFields(formFields.filter((field) => field.id !== fieldId))
  }

  // Handle form field reordering
  const handleReorderField = (startIndex, endIndex) => {
    const result = Array.from(formFields)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    setFormFields(result)
  }

  // Handle option addition for dropdown, multiple choice, or checkbox
  const handleAddOption = (fieldId) => {
    setFormFields(
      formFields.map((field) => {
        if (field.id === fieldId) {
          return {
            ...field,
            options: [...field.options, { id: `option_${Date.now()}`, value: `Option ${field.options.length + 1}` }],
          }
        }
        return field
      }),
    )
  }

  // Handle option update
  const handleUpdateOption = (fieldId, optionId, value) => {
    setFormFields(
      formFields.map((field) => {
        if (field.id === fieldId) {
          return {
            ...field,
            options: field.options.map((option) => (option.id === optionId ? { ...option, value } : option)),
          }
        }
        return field
      }),
    )
  }

  // Handle option deletion
  const handleDeleteOption = (fieldId, optionId) => {
    setFormFields(
      formFields.map((field) => {
        if (field.id === fieldId) {
          return {
            ...field,
            options: field.options.filter((option) => option.id !== optionId),
          }
        }
        return field
      }),
    )
  }


  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Form Builder
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddFieldClick} size="small">
          Add Field
        </Button>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleAddFieldClose}>
          <MenuItem onClick={() => handleFieldTypeSelect("text")}>
            <ListItemIcon>
              <TextFieldsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Text Field</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleFieldTypeSelect("multiline")}>
            <ListItemIcon>
              <Subject fontSize="small" />
            </ListItemIcon>
            <ListItemText>Multiline</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleFieldTypeSelect("dropdown")}>
            <ListItemIcon>
              <DropdownIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Dropdown</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleFieldTypeSelect("multiple_choice")}>
            <ListItemIcon>
              <RadioButtonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Multiple Choice</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleFieldTypeSelect("checkbox")}>
            <ListItemIcon>
              <CheckBoxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Checkbox</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleFieldTypeSelect("date")}>
            <ListItemIcon>
              <CalendarIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Date Picker</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleFieldTypeSelect("time")}>
            <ListItemIcon>
              <AccessTimeOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Time Picker</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {formFields.length === 0 ? (
        <Paper elevation={0} sx={{ p: 3, textAlign: "center", bgcolor: "action.hover" }}>
          <Typography variant="body2" color="text.secondary">
            No fields added yet. Click "Add Field" to start building your form.
          </Typography>
        </Paper>
      ) : (
        <List sx={{ p: 0 }}>
          {formFields.map((field, index) => (
            <Paper
              key={index}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', index)}
              onDrop={(e) => {
                const startIndex = e.dataTransfer.getData('text/plain'); 
                handleReorderField(parseInt(startIndex, 10), index);
              }}
              onDragOver={(e) => e.preventDefault()}
              elevation={1}
              sx={{
                mb: 2,
                p: 2,
                border: editingFieldId === field.id ? "2px solid" : "1px solid",
                borderColor: editingFieldId === field.id ? "primary.main" : "divider",
                borderRadius: 1,
              }}>
              <ListItem
                disableGutters
                secondaryAction={
                  // save, delete, edit icons
                  <Box>
                    {editingFieldId === field.id ? (
                      <IconButton onClick={handleSaveField} color="primary">
                        <SaveIcon sx={{mr: 1}} />
                      </IconButton>
                    ) : (
                      <IconButton disabled={field.id==="email"} onClick={() => handleEditField(field.id)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton disabled={field.id==="email"} onClick={() => handleDeleteField(field.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }>
                {/* Drag icon */}
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                  <Tooltip title="Drag to reorder">
                    <IconButton size="small" sx={{ cursor: "grab", mr: 1 }}>
                      <DragIcon />
                    </IconButton>
                  </Tooltip>

                  {/* Icon of the input type */}
                  <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>{getFieldTypeIcon(field.type)}</Box>

                  {/* input title */}
                  {editingFieldId === field.id ? (
                    // Title input
                    <TextField
                      fullWidth
                      value={field.label}
                      onChange={(e) => handleUpdateField(field.id, { label: e.target.value })}
                      size="small"
                      autoFocus
                    />
                  ) : (
                    // Title display when not editing
                    <Typography variant="subtitle1">
                      {field.label}
                      {field.id==="email" && <span style={{ color: "red" }}> *</span>}
                    </Typography>
                  )}
                </Box>
              </ListItem>

              {editingFieldId === field.id && (
                <Box sx={{ mt: 2, pl: 6 }}>

                  {/* Field Type */}
                  <Typography sx={{mb:2, mt: 1}} variant="caption" color="text.secondary" display="block" gutterBottom>
                    Field Type: {getFieldTypeName(field.type)}
                  </Typography>

                  {/* Plaaceholder input */}
                  {(field.type == "text" || field.type == "multiline" ) && (
                    <TextField
                      fullWidth
                      label="Placeholder Text"
                      value={field.placeholder || ""}
                      onChange={(e) => handleUpdateField(field.id, { placeholder: e.target.value })}
                      size="small"
                      sx={{ mb: 2 }}
                    />
                  )}

                  {/* is current field required? */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.required}
                        onChange={(e) => handleUpdateField(field.id, { required: e.target.checked })}
                      />
                    }
                    label="Required field"
                  />

                  {/* Specifying options */}
                  {(field.type === "dropdown" || field.type === "multiple_choice" || field.type === "checkbox") && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Options
                      </Typography>

                      {field.options.map((option, optionIndex) => (
                        <Box key={option.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <TextField
                            value={option.value}
                            onChange={(e) => handleUpdateOption(field.id, option.id, e.target.value)}
                            size="small"
                            fullWidth
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteOption(field.id, option.id)}
                            disabled={field.options.length <= 1}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}

                      <Button size="small" startIcon={<AddIcon />} onClick={() => handleAddOption(field.id)} sx={{ mt: 1 }}>
                        Add Option
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Paper>
          ))}
        </List>
      )}

      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddFieldClick} fullWidth sx={{ mt: 2 }}>
        Add Field
      </Button>
    </Box>
  )
}
