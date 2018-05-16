// @flow
import moment from '@/utils/moment'

export const getSessionUniqueKey = (session: Object) => {
  return session.serviceId + '_' + session.start + '_' + session.end
}

const sessionCache = {}
const getSessionData = (session: Object) => {
  const cacheKey = session.serviceId + '.' + session.duration
  if (!sessionCache[cacheKey]) {
    for (const sessionLength of session.service.sessionLengths) {
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

export const prepareSessionObject = (session: Object) => {
  const uId = getSessionUniqueKey(session)
  session['_id'] = uId
  session['serviceId'] = session.service.id
  session['start'] = moment(session.start).unix()
  session['end'] = moment(session.end).unix()
  session['duration'] = session.end - session.start
  session['data'] = getSessionData(session)
  return session
}

