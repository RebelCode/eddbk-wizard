import Vue from 'vue'
import _ from 'lodash'
import { prepareSessionObject } from './sessionTransform.js'
import RangeCache from './rangeCache.js'

const rangeCache = new RangeCache()

export default {
  /*
  * Loads sessions from API
  * Caches queries
  */
  load ({ commit }, { serviceId, start, end }) {
    const uncachedRange = rangeCache.uncached({ serviceId, start, end })
    console.info('uncachedRange, { serviceId, start, end }', uncachedRange, { serviceId, start, end })
    if (!uncachedRange) {
      return Promise.resolve(null) // nothing loaded — everything is in cahce
    }
    return Vue.$api.fetchSessions(uncachedRange).then(response => {
      console.info('after Vue.$api.fetchSessions', response)
      rangeCache.remember(uncachedRange)
      const sessionsPrepared = _.map(response.data.items, prepareSessionObject)
      commit('insertArray', { collection: sessionsPrepared })
      return sessionsPrepared
    })
  }
}
