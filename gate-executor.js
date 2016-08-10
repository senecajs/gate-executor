/* Copyright (c) 2014-2016 Richard Rodger, MIT License */
'use strict'


// Core modules.
var Assert = require('assert')


// Create root instance. Exported as module.
//   * `options` (object): instance options as key-value pairs.
//
// The options are:
//   * `interval` (integer): millisecond interval for timeout checks. Default: 111.
//   * `timeout` (integer): common millisecond timeout.
//      Can be overridden by work item options. Default: 2222.
function make_GateExecutor (options) {
  options = options || {}
  options.interval = null == options.interval ? 111 : options.interval
  options.timeout = null == options.timeout ? 2222 : options.timeout

  Assert.ok('object' === typeof options)
  Assert.ok('number' === typeof options.interval)
  Assert.ok('number' === typeof options.timeout)
  Assert.ok(0 < options.interval)
  Assert.ok(0 < options.timeout)

  return new GateExecutor(options, 0)
}

// Create a new instance.
//   * `options` (object): instance options as key-value pairs.
//   * `instance_counter` (integer): count number of instances created;
//     used as identifier.
function GateExecutor (options, instance_counter) {
  var self = this
  self.id = ++instance_counter

  // Work queue.
  var q = []

  // Work-in-progress set.
  var progress = {

    // Lookup work by id.
    lookup: {},

    // Work history - a list of work items in the order executed.
    history: []
  }

  // Internal state.
  var s = {

    // Count of work items added to this instance. Used as generated work identifier.
    work_counter: 0,

    // When `true`, the instance is in a gated state, and work cannot proceed
    // until the gated in-progress work item is completed.
    gate: false,

    // When `true`, the instance processes work items as they arrive.
    // When `false`, no processing happens, and the instance must be started by
    // calling the `start` method.
    running: false,

    // A function called when the work queue and work-in-progress set
    // are empty.  Set by calling the `clear` method. Will be called
    // each time the instance empty.
    clear: null,

    // A function called once only when the work queue and
    // work-in-progress set are first emptied after each start. Set as
    // an optional argument to the `start` method.
    firstclear: null,

    // Timeout interval reference value returned by `setInterval`.
    // Timeouts are not checked using `setTimeout`, as it is more
    // efficient, and more than sufficient, to check timeouts periodically.
    tm_in: null
  }

  // Process the next work item.
  function process () {

    // If not running, don't process any work items.
    if (!s.running) {
      return
    }

    // Process the next work item, returning `true` if there was one.
    function next () {
      var res = false
      var work

      // Remove next work item from the front of the work queue.
      if (!s.gate) {
        work = q.shift()
      }

      if (work) {

        // Add work item to the work-in-progress set.
        progress.lookup[work.id] = work
        progress.history.push(work)

        // If work item is a gate, set the state of the instance as
        // gated.  This work item will need to complete before later
        // work items in the queue can be processed.
        s.gate = work.gate

        // Call the work item function (which does the real work),
        // passing a callback. This callback has no arguments
        // (including no error!).  It is called only to indicate
        // completion of the work item.  Work items must handle their
        // own errors and results.
        work.fn(function () {

          // Remove the work item from the work-in-progress set.  As
          // work items may complete out of order, prune the history
          // from the front until the first incomplete work
          // item. Later complete work items will eventually be
          // reached on another processing round.
          progress.lookup[work.id].done = true
          delete progress.lookup[work.id]
          while (progress.history[0] && progress.history[0].done) {
            progress.history.shift()
          }

          // If the work item was a gate, it is now complete, and the
          // instance can be ungated, allowing later work items in the
          // queue to be processed.
          if (work.gate) {
            s.gate = false
          }

          // If work queue and work-in-progress set are empty, then
          // call the registered clear functions.
          if (0 === q.length && 0 === progress.history.length) {
            clearInterval(s.tm_in)
            s.tm_in = null

            if (s.firstclear) {
              var fc = s.firstclear
              s.firstclear = null
              fc()
            }

            if (s.clear) {
              s.clear()
            }
          }

          // Process each work item on next tick to avoid lockups.
          setImmediate(function () {
            process()
          })
        })

        res = true
      }
      return res
    }

    // Keep processing work items until none are left or a gate is reached.
    while (next()) {}
  }


  // List of work items to check for timeouts.
  var timeout_checklist = []


  // Wrapper function to construct the timeout check.
  function timeout (work) {
    work.finished = false
    work.orig_fn = work.fn

    var timeout_fn = function (callback) {
      work.callback = callback
      work.start = Date.now()
      timeout_checklist.push(work)

      work.orig_fn(function () {
        // Absorb multiple callbacks.
        if (work.finished) {
          return
        }
        work.finished = true
        work.callback()
      })
    }

    return timeout_fn
  }

  // To be run peridically via setInterval. For timed out work items,
  // calls the done callback to allow work queue to proceed, and makes
  // the work item as finished. Work items can receive notification of
  // timeouts by providing an `on_timeout` callback property in the
  // work definition object. Work items must handle timeout errors
  // themselves, gate-executor cares only for the fact that a timeout
  // happened, so it can continue processing.
  function timeout_check () {
    var now = Date.now()
    var work = null

    for (var i = 0; i < timeout_checklist.length; ++i) {
      work = timeout_checklist[i]

      if (!work.gate && !work.finished && work.tm < now - work.start) {
        work.finished = true
        work.callback()

        if (work.ontm) {
          work.ontm()
        }
      }
    }

    while (timeout_checklist[0] && timeout_checklist[0].finished) {
      work = timeout_checklist.shift()
    }
  }

  // Start processing work items. Must be called to start processing.
  // Can be called at anytime, interspersed with calls to other
  // methods, including `add`. Takes a function as argument, which is
  // called only once on the next time the queues are clear.
  self.start = function (firstclear) {

    // Allow API chaining by not starting in current execution path.
    setImmediate(function () {
      s.running = true

      if (firstclear) {
        s.firstclear = firstclear
      }

      // The timeout interval check is stopped and started only as needed.
      if (!s.tm_in) {
        s.tm_in = setInterval(timeout_check, options.interval)
      }

      process()
    })

    return self
  }

  self.pause = function () {
    s.running = false
  }

  self.clear = function (done) {
    s.clear = done
    return self
  }

  self.isclear = function () {
    return (0 === q.length && 0 === progress.history.length)
  }

  self.add = function (work) {
    s.work_counter += 1
    work.id = work.id || s.work_counter
    work.ge = self.id
    work.tm = null == work.tm ? options.timeout : work.tm
    work.description = work.description || work.fn.name || '' + Date.now()

    work.fn = timeout(work)

    q.push(work)

    if (s.running) {
      setImmediate(function () {
        process()
      })
    }

    return self
  }

  self.gate = function () {
    var ge = new GateExecutor(options, instance_counter)
    var fn = function gate (done) {
      ge.start(done)
    }

    self.add({gate: ge, fn: fn})

    return ge
  }

  self.state = function () {
    var o = []

    for (var hI = 0; hI < progress.history.length; ++hI) {
      var pe = progress.history[hI]
      if (!pe.done) {
        o.push({s: 'a', ge: pe.ge, d: pe.description, wid: pe.id})
      }
    }

    for (var qI = 0; qI < q.length; ++qI) {
      var qe = q[qI]
      if (qe.gate) {
        o.push(qe.gate.state())
      }
      else {
        o.push({s: 'w', ge: qe.ge, d: qe.description, wid: qe.id})
      }
    }
    return o
  }
}

module.exports = make_GateExecutor
