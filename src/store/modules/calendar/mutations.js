import moment from '@/utils/moment'
// import { getSessionUniqueKey } from './_sessionTransform.js'
import { vueSet } from 'vue-deepset'
import _ from 'lodash'

export default {
  insertAsSessionsTree (state, { collection }) {
    _.each(collection, session => {
      const sessionStart = moment.unix(session.start)
      const objectPath = session.serviceId + '.' +
        sessionStart.year() + '.' +
        sessionStart.month() + '.' +
        sessionStart.date() + '.' +
        session.duration + '.' +
        session.uId
      vueSet(state.allSessions, objectPath, session)
    })
  }
}