// @flow
import moment from '@/utils/moment'

export function getSessionUniqueKey (session: Object) {
  return session.serviceId + '_' + session.start + '_' + session.end
}

export function prepareSessionObject (session: Object) {
  const uId = getSessionUniqueKey(session)
  const sessionStart = moment.unix(session.start)
  session['_id'] = uId
  session['duration'] = session.end - session.start
  session['year'] = sessionStart.year()
  session['month'] = sessionStart.month()
  session['day'] = sessionStart.date()

  return session
}
