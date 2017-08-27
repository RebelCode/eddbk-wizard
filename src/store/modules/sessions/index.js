import { commonMutations } from '@/store/mixins'
import Vue from 'vue'
import _ from 'lodash'
import { prepareSessionObject, getUniqueDurations } from './_sessionTransform.js'

const state = {
  all: {},
  selected: null,
  selectedDuration: null
}

const getters = {
  activeDateSessions (state, getters, rootState) {
    const activeDate = rootState.dates.activeDate
    return _.filter(state.all, session => { return session.date === activeDate })
  },

  activeDateDurations (state, getters) {
    return getUniqueDurations(getters.activeDateSessions)
  },

  activeSessions (state, getters) {
    if (!state.selectedDuration) return getters.activeDateSessions
    return _.filter(getters.activeDateSessions, session => {
      return session.duration === state.selectedDuration
    })
  }

}

const actions = {
  fetchAll ({ commit }, { serviceId }) {
    Vue.$s.fetchSessions({ params: { serviceId }}).then(response => {
      const sessions = response.data
      const collection = sessions.map(session => {
        return prepareSessionObject({ session, serviceId })
      })
      commit('insertBunch', { list: 'all', collection, keyProp: 'uId' })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations: commonMutations
}
