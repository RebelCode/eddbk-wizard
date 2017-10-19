import moment from '@/utils/moment'
import _ from 'lodash'

const getFullMonthsRanges = ({ serviceId, start, end }) => {
  const range = moment.range(moment.unix(start).startOf('month'), moment.unix(end).endOf('month'))
  const months = Array.from(range.by('month')) // create an array from months iterator
  return months.map(m => {
    return {
      serviceId,
      start: m.startOf('month').unix(),
      end: m.endOf('month').unix()
    }
  })
}

function RangeCache () {
  let rangeCache = []
  return {
    /*
    * Return the range which is difference between requested and cached
    * (the range that should be fetched in order to fill the gap)
    * @return { object } - range
    */
    uncached ({ serviceId, start, end }) {
      // transform given range to the list of full months ranges
      const ranges = getFullMonthsRanges({ serviceId, start, end })
      // look which months from this list are not cached
      const uncached = _.differenceWith(ranges, rangeCache, _.isEqual)
      // to optimise the number of requests, we are merging uncached ranges by taking only first and last timestamps of the list
      if (uncached.length) {
        const first = uncached[0]
        const [last] = uncached.slice(-1)
        return {
          serviceId,
          start: first.start,
          end: last.end
        }
      }
      return null
    },

    /*
    * Cache the query by remembering the list of full months of given range
    */
    remember ({ serviceId, start, end }) {
      const ranges = getFullMonthsRanges({ serviceId, start, end })
      const uncached = _.differenceWith(ranges, rangeCache, _.isEqual)
      if (!uncached) return
      rangeCache = [...rangeCache, ...uncached]
      return rangeCache
    },

    /*
    * Clear the cache
    */
    clear () {
      rangeCache = []
    },

    get cache () {
      return rangeCache
    },

    set cache (value) {
      rangeCache = value
    }
  }
}

export default RangeCache
