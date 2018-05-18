import { commonMutations } from '@/store/mixins'
import moment from '@/utils/moment'
import _ from 'lodash'
import Vue from 'vue'

const state = {
  list: [],
  selected: null
}

const getters = {
  selectedId (state) {
    return _.get(state, 'selected.id', null)
  },

  minServiceSession (state) {
    if (!state.selected) return
    const sessionLengths = state.selected.sessionLengths
    const prices = _.map(sessionLengths, s => s.price.amount).map(Number)
    const minPrice = _.min(prices)
    return _.find(sessionLengths, s => Number(s.price.amount) === minPrice)
  },

  serviceInfo (state, getters) {
    if (!state.selected) {
      return {}
    }
    console.info()

    const minSessionPrice = getters.minServiceSession.price.formatted
    const minSessionLength = getters.minServiceSession.sessionLength
    const minSessionLengthHumanized = moment.duration(minSessionLength, 'seconds').humanize()

    return {
      isOtherSessionsAvailable: Object.keys(state.selected.sessionLengths).length > 1,
      pricePreview: Vue.$_('Starting at %(price)s per %(duration)s appointment', {
        price: minSessionPrice,
        duration: minSessionLengthHumanized
      })
    }
  }
}

const actions = {
  fetch ({ commit }) {
    Vue.$api.fetchServices().then(response => {
      const services = _.map(response.data.items)
      commit('set', { key: 'list', value: services })
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
