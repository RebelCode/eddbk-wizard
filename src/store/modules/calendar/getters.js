import _ from 'lodash'
import moment from '@/utils/moment'
import mingo from 'mingo'
window.mingo = mingo // debug, delete me
window.moment = moment // debug, delete me

export default {
  sessions (state, getters, rootState, rootGetters) {
    return rootGetters['sessions/all'] // reference for the single source of truth for the sessions
  },

  serviceId (state, getters, rootState, rootGetters) {
    return rootGetters['services/selectedId']
  },

  activeDateSessions (state, getters) {
    if (!state.activeDate.day) return []
    return mingo.find(getters.sessions, {
      serviceId: getters.serviceId,
      year: state.visibleMonth.year,
      month: state.visibleMonth.month,
      day: state.activeDate.day
    }).all()
  },

  activeDateDurations (state, getters, rootState, rootGetters) {
    return mingo.aggregate(getters.activeDateSessions,
      [
        { $group: { _id: '$duration' }},
        { $sort: { _id: 1 }}
      ]).map(i => i._id)
  },

  activeSessions (state, getters, rootState, rootGetters) {
    if (!state.activeDuration) return []
    return mingo.find(getters.activeDateSessions, {
      duration: state.activeDuration
    }).all()
  },

  activeLoadedDays (state, getters, rootState, rootGetters) {
    return []
  },

  visibleMonthSessions (state, getters) {
    if (!state.visibleMonth.month) return []
    return mingo.find(getters.sessions, {
      serviceId: getters.serviceId,
      year: state.visibleMonth.year,
      month: state.visibleMonth.month
    }).all()
  },

  visibleMonthDays (state, getters) {
    return mingo.aggregate(getters.visibleMonthSessions,
      [
        { $group: { _id: '$day' }},
        { $sort: { _id: 1 }}
      ]).map(i => i._id)
  },

  visibleMonthDisabledDates (state, getters, rootState, rootGetters) {
    if (!getters.visibleMonthDays) return []
    const daysInMonth = moment([state.visibleMonth.year, state.visibleMonth.month]).daysInMonth()
    const monthRange = _.range(1, daysInMonth + 1)
    const disabledDays = monthRange.filter(d => !getters.visibleMonthDays.includes(d))
    return disabledDays.map(date => new Date(state.visibleMonth.year, state.visibleMonth.month, date))
  }

}
