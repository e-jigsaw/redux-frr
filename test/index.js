import test from 'ava'
import {frr, rr} from '../index.js'

test('It works', (t) => {
  const reducer = frr(
    'test',
    (state, action) => {
      t.is(state, 0, 'Fires first reducer')
      t.is(action.type, 'test', 'Action type fine')
      return state + 1
    },
    (state, action) => {
      t.is(state, 1, 'Fires second reducer')
      return state + 1
    }
  )
  const result = reducer(0, {
    type: 'test'
  })
  t.is(result, 2, 'Final result fine')
})

test('Filter action works', (t) => {
  const reducer = frr(
    'valid',
    (state, action) => {
      t.fail('Reached invalid action')
      return state
    }
  )
  const result = reducer(0, {
    type: 'invalid'
  })
})

test('Works with initial state', (t) => {
  const initialState = 0
  const reducer = rr((state, action) => {
    return state === undefined ? initialState : state
  }, frr(
    'test',
    (state, action) => state + 1
  ))
  const result = reducer(undefined, {
    type: 'init'
  })
  t.is(result, 0, 'Initial state setted')
})
