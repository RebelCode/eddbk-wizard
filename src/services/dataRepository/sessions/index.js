import _ from 'lodash'
import { prepareSessionObject } from './_sessionTransform.js'

const SessionsRepo = function ({ api }) {
  var allSessions = {}

  const cacheSessions = (sessions) => {
    for (const session of sessions) {
      _.set(allSessions, session.uId, session)
    }
  }

  return {
    load ({ serviceId, start, end }) {
      return api.fetchSessions({ serviceId, start, end }).then(response => {
        const sessionsPrepared = _.map(response.data, prepareSessionObject)
        cacheSessions(sessionsPrepared)
        return sessionsPrepared
      })
    },

    find (predicate: Function) {
      return _.filter(allSessions, predicate)
    },

    all () {
      return allSessions
    }

  }
}

export default SessionsRepo
