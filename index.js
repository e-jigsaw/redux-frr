import {filterActions} from 'redux-ignore'
import _rr from 'reduce-reducers'

export function frr (type, ...reducers) {
  return filterActions(_rr.apply(this, reducers), [type])
}

export const rr = _rr
