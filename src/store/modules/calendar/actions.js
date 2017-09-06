import Vue from 'vue'
import moment from '@/utils/moment'
import _ from 'lodash'

const defaultSessionsRange = () => {
  const start = moment() // now
  const end = moment().add(1, 'month').endOf('month') // end of the next month
  return moment.range(start, end)
}

const isMonthCached = (allSessions, serviceId: number, month) => {
  if (!month) return false

  return _.has(allSessions, [
    serviceId,
    month.year,
    month.month
  ])
}

export default {
  loadSessionsByMonth ({ dispatch, getters, state }, { serviceId, month }) {
    if (!serviceId) serviceId = getters.serviceId

    if (isMonthCached(state.allSessions, serviceId, month)) return

    let mRange

    if (!month) {
      mRange = defaultSessionsRange()
    } else {
      mRange = moment(month).range('month')
    }

    const start = mRange.start.unix()
    const end = mRange.end.unix()
    Vue.$eventBus.$emit('fetchingSessions:start', { serviceId, month })
    return dispatch('loadSessions', { serviceId, start, end }).then(
      result => Vue.$eventBus.$emit('fetchingSessions:end', { serviceId, month, error: null }),
      error => Vue.$eventBus.$emit('fetchingSessions:end', { serviceId, month, error })
    )
  },

  loadSessions ({ commit }, { serviceId, start, end }) {
    return Vue.$repo.getSessions({ serviceId, start, end }).then(response => {
      const sessions = response.data
      commit('insertAsSessionsTree', { collection: sessions })
    })
  }
}
