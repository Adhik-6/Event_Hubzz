import { create } from "zustand";

export const useAnalyticsStore = create(set => ({
  analytics_currentEvent : {},
  summaryData: {},
  registrationsOverTime: {},
  questionSummaries: {},
  tableData: [],
  filteredRegistrations: [],

  setAnalyticsEvent: (events) => set(state => ({ ...state, analytics_currentEvent: events })),
  setSummaryData: (registrations) => set(state => ({ ...state, summaryData: registrations })),
  setRegistrationsOverTime: (data) => set(state => ({ ...state, registrationsOverTime: data })),
  setQuestionSummaries: (data) => set(state => ({ ...state, questionSummaries: data })),
  setTableData: (data) => set(state => ({ ...state, tableData: data })),
  setFilteredRegistrations: (data) => set(state => ({ ...state, filteredRegistrations: data })),
}))