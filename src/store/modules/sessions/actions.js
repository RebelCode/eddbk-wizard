import Vue from 'vue'
import { prepareSessionObject } from './sessionTransform.js'
import RangeCache from './rangeCache.js'

const rangeCache = new RangeCache()

export default {
  /**
   * Loads sessions from API
   * Caches queries
   */
  load ({ commit, state, rootState }, { serviceId, start, end }) {
    const uncachedRange = rangeCache.uncached({ serviceId, start, end })
    console.info('uncachedRange, { serviceId, start, end }', uncachedRange, { serviceId, start, end })
    if (!uncachedRange) {
      return Promise.resolve(null) // nothing loaded — everything is in cahce
    }
    return Vue.$api.fetchSessions(uncachedRange).then(response => {
      console.info('after Vue.$api.fetchSessions', response)
      rangeCache.remember(uncachedRange)
      const sessionsPrepared = response.data.items.map(item => {
        return prepareSessionObject(item, rootState.services.selected)
      })
      commit('insertArray', { collection: sessionsPrepared })
      return sessionsPrepared
    })
  },

  /**
   * Create booking based on selected session.
   *
   * @param commit
   * @param state
   * @param rootState
   * @param bookingSession
   */
  bookSession ({ commit, state, rootState }, { bookingSession }) {
    return Vue.$api.createBooking({
      start: bookingSession._start,
      end: bookingSession._end,
      service: bookingSession.serviceId
    })
  }
}
