import { create } from 'zustand'
import { useAuthStore } from './index.stores.js';

const useEventStore = create((set, get) => {
  const user = useAuthStore.getState().user ?? {};

  return {
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
      organiser: user.organization || user.fullName
    },

    externalUrl: "",

    formFields: [
      {
        id: "email",
        type: "text",
        label: "Email",
        required: true,
        placeholder: "Enter your email address",
        options: [],
      }
    ],

    setEventDetails: (field, value) => {
      if (!field) return;
      set(state => ({ eventDetails: { ...state.eventDetails, [field]: value } }));
    },

    setEventDetailsAll: (newValue) => set( state => ({...state, eventDetails: newValue})),

    handleImageUpload: (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        set(state => ({
          eventDetails: { 
            ...state.eventDetails, 
            eventImage: reader.result 
          }
        }));
      };
      reader.readAsDataURL(file);
    },

    setActiveStep: (step) => set(state => ({
      activeStep: step === "next" ? state.activeStep + 1 : Math.max(0, state.activeStep - 1)
    })),

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

    setFormFields: (newFields) => set(() => ({ formFields: newFields })),
    setFormFieldsAll: (newFields) => set(state => ({ ...state, formFields: newFields }))
  }
});

export default useEventStore;