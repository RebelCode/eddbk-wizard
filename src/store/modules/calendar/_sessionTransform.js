const getSessionUniqueKey = ({ session, serviceId }) => {
  return serviceId + '_' + session.start + '_' + session.end
}

export function prepareSessionObject ({ session, serviceId }) {
  const uId = getSessionUniqueKey({ session, serviceId })
  session['uId'] = uId
  session['serviceId'] = serviceId
  session['duration'] = session.end - session.start
  return session
}
