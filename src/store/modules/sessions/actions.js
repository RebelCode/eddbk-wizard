import Vue from 'vue'
import { prepareSessionObject } from './_sessionTransform.js'
import _ from 'lodash'
import RangeCache from './_rangeCache.js'

const rangeCache = new RangeCache()

window.rangeCache = rangeCache

export default {
  /*
  * Loads sessions from API.
  * Catches queries
  */
  load ({ commit }, { serviceId, start, end }) {
    const uncachedRange = rangeCache.uncached({ serviceId, start, end })
    if (!uncachedRange) {
      return Promise.resolve(null) // nothing loaded — everything is in cahce
    }
    return Vue.$api.fetchSessions(uncachedRange).then(response => {
      rangeCache.remember(uncachedRange)
      const sessionsPrepared = _.map(response.data, prepareSessionObject)
      commit('insertArray', { collection: sessionsPrepared })
      return sessionsPrepared
    })
  }
}
