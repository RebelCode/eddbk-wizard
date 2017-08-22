// @flow

import store from '@/store'
import _ from 'lodash'

export default {
  get: (path?: string) => {
    if (!path) {
      return store.state
    }
    // check if a corresponding getter exists. Getters have priority
    const slashedPath = path.replace(/\./g, '/')
    if (store.getters.hasOwnProperty(slashedPath)) {
      return store.getters[slashedPath]
    }
    // otherwise try to return a raw store value
    return _.get(store.state, path)
  },

  set: (path: string, payload: {}) => {
    return store.commit('set', { key: path, value: payload })
  },

  dispatch: store.dispatch
}
