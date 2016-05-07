import {filterActions} from 'redux-ignore'
import reduce from 'reduce-reducers'

module.exports = function (...args) {
  const [type, ...reducers] = args
  return filterActions(reduce.apply(this, reducers), [type])
}
