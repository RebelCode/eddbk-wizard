import { commonMutations } from '@/store/mixins'

const state = {
  activeMonth: null,
  activeDate: null
}

const getters = {}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations: commonMutations
}
