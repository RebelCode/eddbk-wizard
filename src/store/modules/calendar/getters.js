import moment from '@/utils/moment'
import mingo from '@/utils/mingo'
import Vue from 'vue'
import { nonPluralHumanizeDuration } from '@/utils/humanizeDuration'

/*
* Transforms given date object to timestamp ranges
* @param date { object }
* @param range { string } - 'month' | 'day'
* @return { object } - { start, end }
*/
const getRangeByDate = (date: { year: number, month: number, day?: number }, range: string = 'month') => {
  console.warn('getRangeByDate', JSON.stringify(date), range)
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
    if (!state.selectedSession) return
    const start = moment.unix(state.selectedSession.start)
    const duration = state.selectedSession.end - state.selectedSession.start

    return Vue.$_('You have selected %(duration)s appointment, starting at %(time)s on %(date)s. The price is of %(price)s.', {
      duration: nonPluralHumanizeDuration(duration * 1000),
      time: start.format(Vue.$config.dateFormats.time),
      date: start.format(Vue.$config.dateFormats.fullDate),
      price: state.selectedSession.data.price.formatted
    })
  },

  serviceId (state, getters, rootState, rootGetters) {
    return rootGetters['services/selectedId']
  },

  activeDateSessions (state, getters) {
    if (!state.activeDate.day) return []
    const dayRange = getRangeByDate(state.activeDate, 'day')
    const all = mingo.find(getters.sessions, {
      serviceId: getters.serviceId,
      start: {
        $gte: dayRange.start,
        $lte: dayRange.end
      }
    }).all()
    console.info('getters.sessions, state.activeDate.day', getters.sessions, state.activeDate.day, {
      serviceId: getters.serviceId,
      start: {
        $gte: dayRange.start,
        $lte: dayRange.end
      }
    })
    console.info('all active date sessions:', all)
    return all
  },

  activeDateDurations (state, getters, rootState, rootGetters) {
    console.info('active date sessions', getters.activeDateSessions)
    return mingo.aggregate(getters.activeDateSessions, [
      { $group: { _id: '$duration' }},
      { $sort: { _id: 1 }}
    ]).map(i => i._id)
  },

  activeSessions (state, getters, rootState, rootGetters) {
    if (!state.activeDuration) return []
    return mingo.find(getters.activeDateSessions, {
      duration: state.activeDuration,
      start: {
        $gt: moment().unix()
      }
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
    const startNow = moment().unix()
    const start = startNow > monthRange.start ? startNow : monthRange.start
    return mingo.find(getters.sessions, {
      serviceId: getters.serviceId,
      start: {
        $gte: start,
        $lte: monthRange.end
      }
    }).all()
  },

  visibleMonthDays (state, getters) {
    console.info('getters.visibleMonthSessions', getters.visibleMonthSessions)
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
