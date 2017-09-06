import Vue from 'vue'
import moment from '@/utils/moment'

const defaultSessionsRange = () => {
  const start = moment() // now
  const end = moment().add(1, 'month').endOf('month') // end of the next month
  return moment.range(start, end)
}

export default {
  loadSessionsByMonth ({ dispatch, getters }, { serviceId, month }) {
    if (!serviceId) serviceId = getters.serviceId

    let mRange

    if (!month) {
      mRange = defaultSessionsRange()
    } else {
      mRange = moment(month).range('month')
    }

    const start = mRange.start.unix()
    const end = mRange.end.unix()
    return dispatch('loadSessions', { serviceId, start, end })
  },

  loadSessions ({ commit }, { serviceId, start, end }) {
    Vue.$repo.getSessions({ serviceId, start, end }).then(response => {
      const sessions = response.data
      commit('insertAsSessionsTree', { collection: sessions })
      return true
    })
  }
}
