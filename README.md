# redux-frr

Redux Filter and Reduce Reducers

# Motivation

Reducer can represent by compose reducers when using `reduce-reducers`.

```js
import {rr} from 'redux-frr'

const reducer1 = (state, action) => {...}
const reducer2 = (state, action) => {...}

const reducer = rr(reducer1, reducer2)
```

And redux actions can filter when using `redux-ignore`.

```js
import {filterActions} from 'redux-ignore'

filterActions(reducer, [SOME_ACTION])
```

Now, missing parts is compose above features function.

```js
import {frr} from 'redux-frr'

const reducer = frr(SOME_ACTION, reducer1, reducer2)
```

This function omit reducer function's `switch` syntax.

```js
const reducerA = (state, action) => {
  switch (action.type) {
    SOME_ACTION:
      // some process
    THING_ACTION:
      // some process
    default:
      return state
  }
}

// Are equals to

const reducer1 = frr(SOME_ACTION, (state, action) => {...})
const reducer2 = frr(THING_ACTION, (state, action) => {...})
const reducerB = rr(reducer1, reducer2)
```

It looks pretty simple.

## Works with initial state

```js
rr((state = init) => state, reducer1, reducer2)
```

## Full example

```js
// init.js
export default (state = init) => state

// process1.js
export default (state, action) => {
  const a = doSomeProcessForA(action)
  return {...state, a}
}

// process2.js
export default (state, action) => {
  const b = doSomeProcessForB(action)
  return {...state, b}
}

// handlerA.js
import process1 from './process1.js'
import process2 from './process2.js'

export default frr('action/x', process1, process2)

// process3.js
export default (state, action) => {
  const c = doSomeProcessForC(action)
  return {...state, c}
}

// handlerB.js
import process1 from './process1.js'
import process3 from './process3.js'

export default frr('action/y', process1, process3)

// reducer.js
import init from './init.js'
import handlerA from './handlerA.js'
import handlerB from './handlerB.js'

export default rr(init, handlerA, handlerB)

// reducers.js
import {combineReducers} from 'redux'
import reducer from './reducer.js'

export default combineReducers({reducer})
```

# References

## `frr(type, ...reducers)`

* type: `ActionType` || `[ActionType]`
* reducers: `[Function]`

### Example

```js
frr('action/x', fn1, fn2, fn3)
```

## `rr(...reducers)`

* reducers: `[Function]`

Using https://github.com/acdlite/reduce-reducers . Thanks to @acdlite .

### Example

```js
rr(fn1, fn2, fn3)
```

# Installation

```
% npm install redux-frr
```

# Requirements

* Node.js

# Build

```
% npm run build
```

# Test

```
% npm test
```

# Author

* jigsaw (http://jgs.me, [@e-jigsaw](http://github.com/e-jigsaw))

# License

MIT

The MIT License (MIT)

Copyright (c) 2016 Takaya Kobayashi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
