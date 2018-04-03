import Mingo from 'mingo'

/*
* Add custom operators to the Mingo
* @see https://github.com/kofrasa/mingo/wiki/Custom-Operators
*/
Mingo.addOperators(Mingo.OP_EXPRESSION, (_) => {
  return {
    /*
    * Converts epoch time (in seconds) to Date object
    */
    $epochTimeToDate (item, expr) {
      const seconds = _.computeValue(item, expr)
      return new Date(seconds * 1000)
    },

    /*
    * Converts unix timestamp (in milliseconds) to Date object
    */
    $timestampToDate (item, expr) {
      const milliseconds = _.computeValue(item, expr)
      return new Date(milliseconds)
    }
  }
})

export default Mingo
