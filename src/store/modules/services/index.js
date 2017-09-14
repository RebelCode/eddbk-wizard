import { commonMutations } from '@/store/mixins'
import _ from 'lodash'
import Vue from 'vue'

const state = {
  list: [],
  selected: null
}

const getters = {
  selectedId (state) {
    return _.get(state, 'selected.id', null)
  }
}

const actions = {
  fetch ({ commit }) {
    Vue.$api.fetchServices().then(response => {
      const services = _.map(response.data)
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