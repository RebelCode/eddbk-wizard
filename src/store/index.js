import Vue from 'vue'
import Vuex from 'vuex'
import services from './modules/services'
import _ from 'lodash'
import { commonMutations } from '@/store/mixins'

Vue.use(Vuex)

const mutations = {}

export default new Vuex.Store({
  modules: {
    services
  },
  mutations: _.merge(mutations, commonMutations)
})
