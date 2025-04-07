import { create } from 'zustand'
import { useAuthStore } from './index.stores.js';

const useEventStore = create((set, get) => ({
  activeStep: 0,
  eventDetails: {
    title: "",
    description: "",
    venue: "",
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    capacity: "",
    category: "",
    eventImage: null,
    registrations: 0, // not needed
    organiser: useAuthStore.getState().user.organization || useAuthStore.getState().user.fullName
  },

  registrationType: "custom",
  externalUrl: "",

  formFields: [
    {
      id: "email",
      type: "text",
      label: "Email",
      required: true,
      placeholder: "Enter your email address",
      options: [],
    },
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name",
      options: [],
    },
  ],

  setEventDetails: (field, value) => set(state => ({ eventDetails: { ...state.eventDetails, [field]: value } })),
  handleImageUpload: (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => set(state => ({ eventDetails: {...state.eventDetails, eventImage: reader.result }}))
      reader.readAsDataURL(file) // this will be executed before the above line because the above line is asynchronous
    }
  },

  setActiveStep: (step) => set(state => ({ activeStep: (step==="next")?state.activeStep+1:state.activeStep-1 })),
  // isStepValid: () => {
  //   const { eventDetails, activeStep, registrationType, externalUrl, formFields } = get()
  //   let isValid = false;

  //   if (activeStep === 0) {
  //     isValid = eventDetails.title.trim() !== "" &&
  //     eventDetails.venue.trim() !== "" &&
  //     eventDetails.startDate !== null &&
  //     eventDetails.endDate !== null &&
  //     eventDetails.startTime !== null &&
  //     eventDetails.endTime !== null &&
  //     eventDetails.category.trim() !== "" &&
  //     new Date(eventDetails.startDate).getTime() > Date.now() &&
  //     (new Date(eventDetails.startDate).getTime() < new Date(eventDetails.endDate).getTime() || 
  //     (new Date(eventDetails.startDate).getTime() === new Date(eventDetails.endDate).getTime() && eventDetails.startTime < eventDetails.endTime));

  //     console.log(isValid)
  //     return isValid
  //     // isValid always seems to be true
  //   } else if (activeStep === 1) {
  //     // Validate registration setup
  //     if (registrationType === "external") {
  //       return externalUrl.trim() !== ""
  //     } else {
  //       return formFields.length > 0
  //     }
  //   }

  //   return true
  // },
  isStepValid: () => {
    const { eventDetails, activeStep, registrationType, externalUrl, formFields } = get();
  
    if (activeStep === 0) {
      const { title, venue, startDate, endDate, startTime, endTime, category } = eventDetails;
  
      if (
        !title.trim() || !venue.trim() || !category.trim() ||
        !startDate || !endDate || !startTime || !endTime
      ) return false;
  
      const startDateTime = new Date(startDate).getTime();
      const endDateTime = new Date(endDate).getTime();
      const now = Date.now();
  
      return startDateTime > now && 
        (startDateTime < endDateTime || (startDateTime === endDateTime && startTime < endTime));
  
    } else if (activeStep === 1) {
      // console.log(formFields)
      return registrationType === "external" ? !!externalUrl.trim() : formFields.length > 0;
    }
  
    return true;
  },

  setRegistrationType: (type) => set(() => ({ registrationType: type })),
  setExternalUrl: (url) => set(() => ({ externalUrl: url })),

  setFormFields: (newFields) => set(() => ({ formFields: newFields }))
}));

export default useEventStore;