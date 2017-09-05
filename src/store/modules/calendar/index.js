import { commonMutations } from '@/store/mixins'
import Vue from 'vue'
import _ from 'lodash'
import moment from 'moment'
import { getSessionUniqueKey } from './_sessionTransform.js'
import { vueSet } from 'vue-deepset'

const state = {
  allSessions: {}, // [serviceId][year][month][day][duration][sessionKey][{session}]
  selectedSession: null,
  activeDate: {
    year: null,
    month: null,
    day: null
  },
  visibleMonth: {
    year: null,
    month: null
  },
  activeDuration: null
}

const getters = {
  serviceId (state, getters, rootState, rootGetters) {
    return rootGetters['services/selectedId']
  },

  activeDateSessions (state, getters, rootState, rootGetters) {
    return _.get(state.allSessions, [
      getters.serviceId,
      state.activeDate.year,
      state.activeDate.month,
      state.activeDate.day
    ], [])
  },

  activeDateDurations (state, getters, rootState, rootGetters) {
    return _.keys(getters.activeDateSessions)
  },

  activeSessions (state, getters, rootState, rootGetters) {
    if (!state.activeDuration) return _.reduce(getters.activeDateSessions, _.merge) // flaten

    return _.get(getters.activeDateSessions, [
      state.activeDuration
    ], [])
  },

  activeMonthDays (state, getters, rootState, rootGetters) {
    const days = _.get(state.allSessions, [
      getters.serviceId,
      state.activeDate.year,
      state.activeDate.month
    ], [])
    return _.keys(days).map(Number)
  },

  visibleMonthDays (state, getters, rootState, rootGetters) {
    const days = _.get(state.allSessions, [
      getters.serviceId,
      state.visibleMonth.year,
      state.visibleMonth.month
    ], [])
    return _.keys(days).map(Number)
  },

  visibleMonthDisabledDates (state, getters, rootState, rootGetters) {
    if (!getters.visibleMonthDays) return []
    const daysInMonth = moment([state.visibleMonth.year, state.visibleMonth.month]).daysInMonth()
    const monthRange = _.range(1, daysInMonth + 1)
    const disabledDays = monthRange.filter(d => !getters.visibleMonthDays.includes(d))
    return disabledDays.map(date => new Date(state.visibleMonth.year, state.visibleMonth.month, date))
  }

}

const actions = {
  fetchSessions ({ commit }, { serviceId }) {
    // debug: set hardcode timestamps for now
    const start = 1504483200
    const end = 1509753600
    Vue.$api.fetchSessions({ params: { serviceId, start, end }}).then(response => {
      const sessions = response.data
      commit('insertAsSessionsTree', { collection: sessions })
    })
  }
}

const mutations = {
  insertAsSessionsTree (state, { collection }) {
    _.each(collection, session => {
      const sessionStart = moment.unix(session.start)
      const duration = session.end - session.start
      const uniqueKey = getSessionUniqueKey(session)
      const objectPath = session.serviceId + '.' +
        sessionStart.year() + '.' +
        sessionStart.month() + '.' +
        sessionStart.date() + '.' +
        duration + '.' +
        uniqueKey
      vueSet(state.allSessions, objectPath, session)
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
