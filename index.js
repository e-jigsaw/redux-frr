import _rr from 'reduce-reducers'

// Acknowledgement
// redux-ignore broken by https://github.com/omnidan/redux-ignore/commit/d2b235653e3957f04779dbb00b1b4a2044e0b98f
// I decided to copy and rollback

function isFunction (obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply)
}

function createActionHandler (ignore) {
  return function handleAction (reducer, actions = []) {
    const predicate = isFunction(actions)
        ? actions
        : (action) => actions.indexOf(action.type) >= 0
    return (state, action) => {
      if (predicate(action)) {
        return ignore ? state : reducer(state, action)
      }
      return ignore ? reducer(state, action) : state
    }
  }
}

const filterActions = createActionHandler(false)

export function frr (type, ...reducers) {
  const types = Array.isArray(type) ? type : [type]
  return filterActions(_rr.apply(this, reducers), types)
}

export const rr = _rr
