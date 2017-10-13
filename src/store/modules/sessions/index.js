import { commonMutations } from '@/store/mixins'
import _ from 'lodash'

import state from './state.js'
import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations: _.merge(mutations, commonMutations)
}
