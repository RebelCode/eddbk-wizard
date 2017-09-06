export default {
  allSessions: {}, // nested object: [serviceId][year][month][day][duration][sessionKey][{session}]
  selectedSession: null,
  activeDate: {
    year: null,
    month: null,
    day: null
  },
  visibleMonth: {
    year: null,
    month: null
  },
  activeDuration: null
}
