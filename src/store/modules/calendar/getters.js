import _ from 'lodash'
import moment from 'moment'

export default {
  serviceId (state, getters, rootState, rootGetters) {
    return rootGetters['services/selectedId']
  },

  activeDateSessions (state, getters, rootState, rootGetters) {
    return _.get(state.allSessions, [
      getters.serviceId,
      state.activeDate.year,
      state.activeDate.month,
      state.activeDate.day
    ], [])
  },

  activeDateDurations (state, getters, rootState, rootGetters) {
    return _.keys(getters.activeDateSessions)
  },

  activeSessions (state, getters, rootState, rootGetters) {
    if (!state.activeDuration) return _.reduce(getters.activeDateSessions, _.merge) // flaten

    return _.get(getters.activeDateSessions, [
      state.activeDuration
    ], [])
  },

  activeMonthDays (state, getters, rootState, rootGetters) {
    const days = _.get(state.allSessions, [
      getters.serviceId,
      state.activeDate.year,
      state.activeDate.month
    ], [])
    return _.keys(days).map(Number)
  },

  visibleMonthDays (state, getters, rootState, rootGetters) {
    const days = _.get(state.allSessions, [
      getters.serviceId,
      state.visibleMonth.year,
      state.visibleMonth.month
    ], [])
    return _.keys(days).map(Number)
  },

  visibleMonthDisabledDates (state, getters, rootState, rootGetters) {
    if (!getters.visibleMonthDays) return []
    const daysInMonth = moment([state.visibleMonth.year, state.visibleMonth.month]).daysInMonth()
    const monthRange = _.range(1, daysInMonth + 1)
    const disabledDays = monthRange.filter(d => !getters.visibleMonthDays.includes(d))
    return disabledDays.map(date => new Date(state.visibleMonth.year, state.visibleMonth.month, date))
  }

}
