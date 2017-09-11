// @flow

export function getSessionUniqueKey (session: Object) {
  return session.serviceId + '_' + session.start + '_' + session.end
}

export function prepareSessionObject (session: Object) {
  const uId = getSessionUniqueKey(session)
  session['uId'] = uId
  session['duration'] = session.end - session.start
  return session
}
