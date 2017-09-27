// @flow
import PouchDB from 'pouchdb'
import PouchDbMemoryAdapter from 'pouchdb-adapter-memory'
import PouchDbFind from 'pouchdb-find'
import _ from 'lodash'
import { prepareSessionObject } from './_sessionTransform.js'
import { SessionsRepoInterface } from '../interfaces/SessionsRepoInterface.js'
import { ApiInterface } from '@/services/api/interfaces/ApiInterface.js'
import moment from '@/utils/moment'

PouchDB.plugin(PouchDbMemoryAdapter)
PouchDB.plugin(PouchDbFind)

const db = new PouchDB('sessions', { 'revs_limit': 1 })
db.createIndex({
  index: {
    fields: ['serviceId', 'start', 'end', 'duration', 'price']
  }
}).then(function (result) {
  console.log(result)
})
window.db = db // debug
window.moment = moment // debug
let queryCache: Array<Object> = []

const getFullMonthsRanges = function ({ serviceId, start, end }) {
  const range = moment.range(moment.unix(start).startOf('month'), moment.unix(end).endOf('month'))
  const months = Array.from(range.by('month'))
  return months.map(m => {
    return {
      serviceId,
      start: m.startOf('month').unix(),
      end: m.endOf('month').unix()
    }
  })
}

const getUncachedRange = function ({ serviceId, start, end }) {
  const ranges = getFullMonthsRanges({ serviceId, start, end })
  const uncached = _.differenceWith(ranges, queryCache, _.isEqual) // get all uncached ranges
  if (uncached.length) {
    const first = uncached[0]
    const [last] = uncached.slice(-1)
    return {
      serviceId,
      start: first.start,
      end: last.end
    }
  }
  return null
}

const cacheQuery = function ({ serviceId, start, end }) {
  const ranges = getFullMonthsRanges({ serviceId, start, end })
  const uncached = _.differenceWith(ranges, queryCache, _.isEqual)
  if (!uncached) return
  queryCache = [...queryCache, ...uncached]
  return queryCache
}

const SessionsRepo = function (api: ApiInterface) {
  const sessionsRepo: SessionsRepoInterface = {
    load ({ serviceId, start, end }) {
      const uncachedRange = getUncachedRange({ serviceId, start, end })
      const query = {
        serviceId: serviceId,
        start: {
          $gte: +start
        },
        end: {
          $lte: +end
        }
      }
      // if we've got everything we need in the cache just do a query
      if (!uncachedRange) {
        return this.find(query)
      }
      // else we need to cache first
      return api.fetchSessions(uncachedRange)
        .then(response => {
          return _.map(response.data, prepareSessionObject)
        })
        .then(sessionsPrepared => {
          return this.store(sessionsPrepared)
        })
        .then(() => {
          cacheQuery({ serviceId, start, end })
          return this.find(query)
        })
    },

    store (sessions: Array<Object> | Object) {
      return Array.isArray(sessions) ? db.bulkDocs(sessions) : db.put(sessions)
    },

    find (selector) {
      return db.find({
        selector
      }).then(r => r.docs)
    }
  }

  return sessionsRepo
}

export default SessionsRepo
