// @flow

export const getSessionUniqueKey = (session: Object) => {
  return session.serviceId + '_' + session.start + '_' + session.end
}

export const prepareSessionObject = (session: Object) => {
  const uId = getSessionUniqueKey(session)
  session['_id'] = uId
  session['duration'] = session.end - session.start
  return session
}
