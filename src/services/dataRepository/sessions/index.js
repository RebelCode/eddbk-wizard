// @flow

import _ from 'lodash'
import { prepareSessionObject } from './_sessionTransform.js'
import { SessionsRepoInterface } from '../interfaces/SessionsRepoInterface.js'
import { ApiInterface } from '@/services/api/interfaces/ApiInterface.js'

const SessionsRepo = function (api: ApiInterface) {
  var allSessions = {}

  const cacheSessions = (sessions) => {
    for (const session of sessions) {
      _.set(allSessions, session.uId, session)
    }
  }

  const sessionsRepo: SessionsRepoInterface = {
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
      return _.map(allSessions)
    }

  }

  return sessionsRepo
}

export default SessionsRepo
