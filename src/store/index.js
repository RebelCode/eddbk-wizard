import Vue from 'vue'
import Vuex from 'vuex'
import services from './modules/services'
import { commonMutations } from '@/store/mixins'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    services
  },
  mutations: commonMutations
})
