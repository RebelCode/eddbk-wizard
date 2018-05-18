const today = new Date()

export default {
  sessions: [],
  selectedSession: null,
  activeDate: {
    year: null,
    month: null,
    day: null
  },
  visibleMonth: {
    year: today.getFullYear(),
    month: today.getMonth()
  },
  activeDuration: null
}
