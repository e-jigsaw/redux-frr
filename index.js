import {filterActions} from 'redux-ignore'
import _rr from 'reduce-reducers'

export function frr (type, ...reducers) {
  const types = Array.isArray(type) ? type : [type]
  return filterActions(_rr.apply(this, reducers), types)
}

export const rr = _rr
