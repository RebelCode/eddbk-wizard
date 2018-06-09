import { commonMutations } from '@/store/mixins'
import _ from 'lodash'
import Vue from 'vue'
import { nonPluralHumanizeDuration } from '@/utils/humanizeDuration'

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

    const minSessionPrice = getters.minServiceSession.price.formatted
    const minSessionLength = getters.minServiceSession.sessionLength
    const minSessionLengthHumanized = nonPluralHumanizeDuration(minSessionLength * 1000)

    return {
      isOtherSessionsAvailable: Object.keys(state.selected.sessionLengths).length > 1,
      pricePreview: Vue.$_('Starting at %(price)s for a %(duration)s appointment.', {
        price: minSessionPrice,
        duration: minSessionLengthHumanized
      })
    }
  }
}

const actions = {
  fetch ({ commit }) {
    Vue.$eventBus.$emit('fetchingServices:start')
    return Vue.$api.fetchServices().then(response => {
      const services = _.map(response.data.items)
      commit('set', { key: 'list', value: services })
      Vue.$eventBus.$emit('fetchingServices:end')
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
