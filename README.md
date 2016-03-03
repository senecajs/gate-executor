# gate-executor

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![Dependency Status][david-badge]][david-url]
[![Gitter chat][gitter-badge]][gitter-url]

#### Execute functions that return via callback in order, but pause if a function is marked as a gate.

[Annotated Source](http://rjrodger.github.io/gate-executor/doc/gate-executor.html)

A work execution queue that provides tracing and gating. Work
functions can have optional callbacks. Timeouts are triggered when
execution does not complete within a specified time.

Gating places execution into a serial mode, where all gated work
functions must complete in order before other work functions in the
queue are called. The gate can be ignored.

Used by [Seneca](http://senecajs.org/) micro-service communication to
execute tasks in order. If you haven't heard about Seneca, check out
the [getting started guide](http://senecajs.org/getting-started.html).


# Support

If you're using this module, feel free to contact me on twitter if you
have any questions! :) [@rjrodger](http://twitter.com/rjrodger)

# Usage

The gate executor provides functionality to pause gated tasks and to
quit tasks that exceed a given timeout. The executor can be created
with a few options:

```JavaScript
var e0 = executor({
  trace: true,              // Error logging trace, default false
  timeout: 150,             // Timout for tasks, default 33333
  error: function() {...},  // A function to wrap all errors in, default noop
  stubs: {		    // Stubs to substitute default node functions
    now: {...},
    setTimeout: {...},
    clearTimeout: {...}
  }
})
```

When calling the executor with a task, use the following pattern:
```JavaScript
e0.execute({
  id: 'a',              // Optional identifier for trace
  fn: function() {...}  // Function to be preformed
  cb: function(err, out) {...}
})
```

# Worker definition

The worker definition object has the following properties:

   * _id_:     an identifier string for the worker.
   * _desc_:   a description string for the worker.
   * _fn_:     the worker function itself; it should accept one argument, a completion callback, which must be called (this in turn then calls the task callback, if any).
   * _cb_:     optional callback function, of the form: function(err,result) { ... }.
   * _gate_:   this worker is a gate; all subsequent workers will wait for this one to complete.
   * _ungate_: this worker will ignore any gates that are active, and so will be executed regardless.
   * _timeout_: override the executor timeout for this individual work


# Testing

```js
npm test
```

[npm-badge]: https://badge.fury.io/js/gate-executor.svg
[npm-url]: https://badge.fury.io/js/gate-executor
[travis-badge]: https://api.travis-ci.org/rjrodger/gate-executor.svg
[travis-url]: https://travis-ci.org/rjrodger/gate-executor
[coveralls-badge]:https://coveralls.io/repos/rjrodger/gate-executor/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/rjrodger/gate-executor?branch=master
[david-badge]: https://david-dm.org/rjrodger/gate-executor.svg
[david-url]: https://david-dm.org/rjrodger/gate-executor
[gitter-badge]: https://badges.gitter.im/rjrodger/gate-executor.svg
[gitter-url]: https://gitter.im/rjrodger/gate-executor
