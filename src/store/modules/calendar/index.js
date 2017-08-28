import { commonMutations } from '@/store/mixins'
import Vue from 'vue'
import _ from 'lodash'
import { prepareSessionObject, getUniqueDurations } from './_sessionTransform.js'

const state = {
  allSessions: {},
  selectedSession: null,
  selectedDuration: null,
  activeMonth: null,
  activeDate: null
}

const getters = {
  activeDateSessions (state, getters, rootState) {
    return _.filter(state.allSessions, session => {
      return session.date === state.activeDate &&
        session.serviceId === rootState.services.selected.id
    })
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
  fetchSessions ({ commit }, { serviceId }) {
    Vue.$s.fetchSessions({ params: { serviceId }}).then(response => {
      const sessions = response.data
      const collection = sessions.map(session => {
        return prepareSessionObject({ session, serviceId })
      })
      commit('insertBunch', { list: 'allSessions', collection, keyProp: 'uId' })
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
