// import Moment from 'moment'
import { extendMoment } from 'moment-range'
import momentTimezone from 'moment-timezone'

const momentExtended = extendMoment(momentTimezone)

export default momentExtended
