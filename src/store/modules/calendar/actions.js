import Vue from 'vue'

export default {
  getSessionsByMonth ({ dispatch, getters }, { serviceId, month }) {
    if (!serviceId) serviceId = getters.serviceId
    // debug: set hardcode timestamps for now
    const start = 1504483200
    const end = 1509753600
    return dispatch('getSessions', { serviceId, start, end })
  },

  getSessions ({ commit }, { serviceId, start, end }) {
    Vue.$repo.getSessions({ serviceId, start, end }).then(response => {
      const sessions = response.data
      commit('insertAsSessionsTree', { collection: sessions })
      return true
    })
  }
}
