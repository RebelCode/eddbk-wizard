// @flow
import moment from '@/utils/moment'

export const getSessionUniqueKey = (session: Object) => {
  return session.id + '_' + session.start + '_' + session.end
}

const sessionCache = {}
const getSessionData = (session: Object, service: Object) => {
  const cacheKey = session.serviceId + '.' + session.duration
  if (!sessionCache[cacheKey]) {
    for (const sessionLength of service.sessionLengths) {
      if (sessionLength.sessionLength === session.duration) {
        sessionCache[cacheKey] = sessionLength
        break
      }
    }
  }
  return {
    price: sessionCache[cacheKey].price
  }
}

export const prepareSessionObject = (session: Object, service: Object) => {
  const uId = getSessionUniqueKey(session)
  session['_id'] = uId
  session['serviceId'] = service.id
  session['start'] = moment(session.start).unix()
  session['end'] = moment(session.end).unix()
  session['duration'] = session.end - session.start
  session['data'] = getSessionData(session, service)
  return session
}

