import {filterActions} from 'redux-ignore'
import _rr from 'reduce-reducers'

export function frr (...args) {
  const [type, ...reducers] = args
  return filterActions(_rr.apply(this, reducers), [type])
}

export const rr = _rr
