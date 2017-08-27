import Vue from 'vue'
import Vuex from 'vuex'
import { commonMutations } from '@/store/mixins'
import services from './modules/services'
import sessions from './modules/sessions'
import dates from './modules/dates'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    services,
    sessions,
    dates
  },
  mutations: commonMutations
})
