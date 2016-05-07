import {filterActions} from 'redux-ignore'
import reduce from 'reduce-reducers'

export default function reducer (...args) {
  const [type, ...reducers] = args
  return filterActions(reduce.apply(this, reducers), [type])
}
