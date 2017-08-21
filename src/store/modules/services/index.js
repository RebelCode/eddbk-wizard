import Vue from 'vue'

const state = {
  list: [],
  selected: null
}

const getters = {
  list: state => state.list,
  selected: state => state.selected
}

const actions = {
  fetch ({ commit }) {
    Vue.$s.fetchServices().then(response => {
      const services = response.data
      commit('setList', { services })
    })
  }
}

const mutations = {
  setList (state, { services }) {
    state.list = services
  },
  setSelected (state, { service }) {
    state.selected = service
  }
}

export default {
  namespaced: true,
  state () {
    return state
  },
  getters,
  actions,
  mutations
}
