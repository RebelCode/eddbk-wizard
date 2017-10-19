import Vue from 'vue'
import moment from '@/utils/moment'

const defaultSessionsRange = () => {
  const start = moment() // now
  const end = moment().add(1, 'month').endOf('month') // end of the next month
  return moment.range(start, end)
}

export default {
  loadSessionsByMonth ({ dispatch, commit, getters, state }, { serviceId, month }) {
    if (!serviceId) serviceId = getters.serviceId

    let mRange

    if (!month) {
      mRange = defaultSessionsRange()
    } else {
      const start = moment(month).startOf('month')
      const nextMonth = moment(month).add(1, 'month')
      const end = nextMonth.endOf('month')
      mRange = moment.range(start, end)
    }

    const start = mRange.start.unix()
    const end = mRange.end.unix()
    Vue.$eventBus.$emit('fetchingSessions:start', { serviceId, month })
    return dispatch('sessions/load', { serviceId, start, end }, { root: true }).then(
      result => {
        Vue.$eventBus.$emit('fetchingSessions:end', { serviceId, month, error: null })
        return result
      },
      error => {
        Vue.$eventBus.$emit('fetchingSessions:end', { serviceId, month, error })
        return error
      }
    )
  },

  resetSessionsForNewService ({ commit }, { firstSessionTime }) {
    // reset previously selected values once a service changed
    commit('set', {
      key: 'activeDate',
      value: { year: null, month: null, day: null }
    })
    commit('set', { key: 'selectedSession', value: null })
    commit('set', { key: 'activeDuration', value: null })

    // show first available month for the selected service's sessions
    const mDate = moment.unix(firstSessionTime)
    const year = mDate.year()
    const month = mDate.month()
    commit('set', {
      key: 'visibleMonth',
      value: { year, month }
    })
  }
}
