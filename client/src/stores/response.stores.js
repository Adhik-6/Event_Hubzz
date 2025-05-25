import { create } from 'zustand';

export const useResponseStore = create((set) => ({
  responseFormFields: [],
  currentEvent: {},
  responseData: {},
  registrationError: "",

  setResFormFields: (fields) => set({ responseFormFields: fields }),
  setCurrentEvent: (eventDetails) => set({ currentEvent: eventDetails }),
  setResponseData: (fieldName, value) => set((state) => ({ 
    responseData: { 
      ...state.responseData, 
      [fieldName]: value 
    },
  })),
  setRegistrationError: (error) => set({ registrationError: error }),
}));