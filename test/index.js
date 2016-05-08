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

test('Multiple filter', (t) => {
  const reducer = frr(
    ['valid1', 'valid2'],
    (state, action) => {
      return state + 1
    }
  )
  const r1 = reducer(0, {
    type: 'valid1'
  })
  t.is(r1, 1, 'First fire')
  const r2 = reducer(1, {
    type: 'valid2'
  })
  t.is(r2, 2, 'Second fire')
  const r3 = reducer(2, {
    type: 'invalid'
  })
  t.is(r3, 2, 'Not fire')
})
