import _ from 'lodash'
import { commonMutations } from '@/store/mixins'

import Vue from 'vue'

const state = {
  list: [],
  selected: null
}

const getters = {}

const mutations = {}

const actions = {
  fetch ({ commit }) {
    Vue.$s.fetchServices().then(response => {
      const services = response.data
      commit('set', { key: 'list', value: services })
    })
  }
}

export default {
  namespaced: true,
  state () {
    return state
  },
  getters,
  actions,
  mutations: _.merge(mutations, commonMutations)
}
