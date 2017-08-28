import moment from 'moment'
import { dateFormats } from '@/config'
import _ from 'lodash'

const getSessionUniqueKey = ({ session, serviceId }) => {
  return serviceId + '_' + session.start + '_' + session.end
}

export function prepareSessionObject ({ session, serviceId }) {
  const uId = getSessionUniqueKey({ session, serviceId })
  session['uId'] = uId
  session['serviceId'] = serviceId
  const startMoment = moment.unix(session.start)
  session['duration'] = session.end - session.start
  session['month'] = startMoment.format(dateFormats.month)
  session['date'] = startMoment.format(dateFormats.date)
  session['time'] = startMoment.format(dateFormats.time)
  return session
}

export function getUniqueDurations (sessions) {
  return _.map(_.uniqBy(sessions, 'duration'), item => {
    return {
      duration: item.duration,
      title: moment.duration(item.duration, 'seconds').humanize()
    }
  })
}
