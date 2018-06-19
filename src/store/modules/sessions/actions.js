import Vue from 'vue'
import { prepareSessionObject } from './sessionTransform.js'
import RangeCache from './rangeCache.js'
import moment from '@/utils/moment'

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
   * @param {function} commit Vuex commit function.
   * @param {object} state Vuex module store.
   * @param {object} rootState Vuex root store.
   * @param {object} bookingSession Session that should be booked.
   * @param {string} timezone Client timezone.
   * @param {string|null} notes Additional notes for booking.
   *
   * @return {Promise<any>} Booking creation request promise.
   */
  bookSession ({ commit, state, rootState }, { bookingSession, timezone, notes }) {
    return Vue.$api.createBooking({
      start: moment.unix(bookingSession.start).format(),
      end: moment.unix(bookingSession.end).format(),
      service: bookingSession.serviceId,
      clientTz: timezone,
      notes
    })
  }
}
