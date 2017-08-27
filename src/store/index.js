import Vue from 'vue'
import Vuex from 'vuex'
import { commonMutations } from '@/store/mixins'
import services from './modules/services'
import calendar from './modules/calendar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    services,
    calendar
  },
  mutations: commonMutations
})
