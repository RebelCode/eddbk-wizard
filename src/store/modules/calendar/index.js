import { commonMutations } from '@/store/mixins'
import Vue from 'vue'
import _ from 'lodash'
import moment from 'moment'
import { prepareSessionObject } from './_sessionTransform.js'

const state = {
  allSessions: {}, // [serviceId][year][month][day][duration][{session}]
  selectedSession: null,
  activeYear: 2017,
  activeMonth: 8,
  activeDate: 30,
  activeDuration: null
}

const getters = {
  serviceId (state, getters, rootState, rootGetters) {
    return rootGetters['services/selectedId']
  },

  activeDateSessions (state, getters, rootState, rootGetters) {
    return _.get(state.allSessions, [
      getters.serviceId,
      state.activeYear,
      state.activeMonth,
      state.activeDate
    ], null)
  },

  activeSessions (state, getters, rootState, rootGetters) {
    if (!state.activeDuration) return _.reduce(getters.activeDateSessions, _.merge) // flaten

    return _.get(getters.activeDateSessions, [
      state.activeDuration
    ], null)
  }

}

const actions = {
  fetchSessions ({ commit }, { serviceId }) {
    Vue.$api.fetchSessions({ params: { serviceId }}).then(response => {
      const sessions = response.data
      const collection = sessions.map(session => {
        return prepareSessionObject({ session, serviceId })
      })
      commit('insertAsSessionsTree', { collection })
    })
  }
}

const mutations = {
  insertAsSessionsTree (state, { collection }) {
    _.each(collection, session => {
      const sessionStart = moment.unix(session.start)
      const objectPath = [
        session.serviceId,
        sessionStart.year(),
        sessionStart.month(),
        sessionStart.date(),
        session.duration,
        session.uId
      ]
      _.setWith(state.allSessions, objectPath, session, Object)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations: _.merge(mutations, commonMutations)
}
