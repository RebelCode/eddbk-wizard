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
    * Converts unix timestamp (in miliseconds) to Date object
    */
    $timestampToDate (item, expr) {
      const miliseconds = _.computeValue(item, expr)
      return new Date(miliseconds)
    }
  }
})

export default Mingo
