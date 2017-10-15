import _ from 'lodash'
import moment from '@/utils/moment'
import mingo from '@/utils/mingo'

/*
* Transforms given date object to timestamp ranges
* @param date { object }
* @param range { string } - 'month' | 'day'
* @return { object } - { start, end }
*/
const getRangeByDate = (date: { year: number, month: number, day?: number }, range: string = 'month') => {
  const m = moment(date)
  const start = m.startOf(range).unix()
  const end = m.endOf(range).unix()
  return {
    start,
    end
  }
}

window.getRangeByDate = getRangeByDate

export default {
  sessions (state, getters, rootState, rootGetters) {
    return rootGetters['sessions/all'] // reference for the single source of truth for the sessions
  },

  serviceId (state, getters, rootState, rootGetters) {
    return rootGetters['services/selectedId']
  },

  activeDateSessions (state, getters) {
    if (!state.activeDate.day) return []
    const dayRange = getRangeByDate(state.activeDate, 'day')
    return mingo.find(getters.sessions, {
      serviceId: getters.serviceId,
      start: {
        $gte: dayRange.start,
        $lte: dayRange.end
      }
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
    if (state.visibleMonth.month === null) return []
    const monthRange = getRangeByDate(state.visibleMonth, 'month')
    return mingo.find(getters.sessions, {
      serviceId: getters.serviceId,
      start: {
        $gte: monthRange.start,
        $lte: monthRange.end
      }
    }).all()
  },

  visibleMonthDays (state, getters) {
    return mingo.aggregate(getters.visibleMonthSessions,
      [
        {
          $group: {
            _id: {
              $dayOfMonth: {
                $epochTimeToDate: '$start'
              }
            }
          }
        },
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
