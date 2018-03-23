import moment from '@/utils/moment'
import mingo from '@/utils/mingo'
import Vue from 'vue'

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

const timestampToDate = (timestamp) => {
  const m = moment.unix(timestamp)
  return {
    year: m.year(),
    month: m.month(),
    day: m.date()
  }
}

export default {
  sessions (state, getters, rootState, rootGetters) {
    return rootGetters['sessions/all'] // reference for the single source of truth for the sessions
  },

  sessionInfo (state, getters) {
    const start = moment.unix(state.selectedSession.start)
    const duration = state.selectedSession.end - state.selectedSession.start

    return Vue.$_('You have selected %(duration)s appointment, starting at %(time)s on %(date)s. The price is of %(price)s.', {
      duration: moment.duration(duration, 'seconds').humanize(),
      time: start.format(Vue.$config.dateFormats.time),
      date: start.format(Vue.$config.dateFormats.fullDate),
      price: state.selectedSession.data.price.formatted
    })
  },

  serviceId (state, getters, rootState, rootGetters) {
    return rootGetters['services/selectedId']
  },

  activeDateSessions (state, getters) {
    console.info('activeDateSessions', state.activeDate.day)
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
    return mingo.aggregate(getters.activeDateSessions, [
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

  nextDate (state, getters) {
    if (!state.activeDate.day) return null
    const dayRange = getRangeByDate(state.activeDate, 'day')
    const firstNextSession = mingo.find(getters.sessions, {
      serviceId: getters.serviceId,
      start: {
        $gt: dayRange.end
      }
    })
    .sort({ start: 1 })
    .first()

    if (firstNextSession) return timestampToDate(firstNextSession.start)
    return null
  },

  prevDate (state, getters) {
    if (!state.activeDate.day) return null
    const dayRange = getRangeByDate(state.activeDate, 'day')
    const firstPrevSession = mingo.find(getters.sessions, {
      serviceId: getters.serviceId,
      start: {
        $lt: dayRange.start
      }
    })
    .sort({ start: -1 })
    .first()

    if (firstPrevSession) return timestampToDate(firstPrevSession.start)
    return null
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
  }
}
