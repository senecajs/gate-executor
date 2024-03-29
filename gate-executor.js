"use strict";
/* Copyright (c) 2014-2021 Richard Rodger, MIT License */
Object.defineProperty(exports, "__esModule", { value: true });
// Create root instance. Exported as module.
//   * `options` (object): instance options as key-value pairs.
//
// The options are:
//   * `interval` (integer): millisecond interval for timeout checks. Default: 111.
//   * `timeout` (integer): common millisecond timeout.
//      Can be overridden by work item options. Default: 2222.
function MakeGateExecutor(options) {
    options = options || {};
    options.interval = null == options.interval ? 111 : options.interval;
    options.timeout = null == options.timeout ? 2222 : options.timeout;
    return GateExecutor(options, 0);
}
// Create a new instance.
//   * `options` (object): instance options as key-value pairs.
//   * `instance_counter` (integer): count number of instances created;
//     used as identifier.
function GateExecutor(options, instance_counter) {
    let self = {};
    self.id = ++instance_counter;
    self.options = options;
    // Work queue.
    let q = [];
    // Work-in-progress set.
    let progress = {
        // Lookup work by id.
        lookup: {},
        // Work history - a list of work items in the order executed.
        history: [],
    };
    // List of work items to check for timeouts.
    let timeout_checklist = [];
    // Internal state.
    let s = {
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
        tm_in: null,
        hw_tmc: 0,
        hw_hst: 0,
    };
    // Process the next work item.
    function processor() {
        // If not running, don't process any work items.
        if (!s.running) {
            return;
        }
        // The timeout interval check is stopped and started only as needed.
        if (!self.isclear() && !s.tm_in) {
            s.tm_in = setInterval(timeout_check, options.interval);
        }
        // Process the next work item, returning `true` if there was one.
        let next = false;
        do {
            next = false;
            let work = null;
            // Remove next work item from the front of the work queue.
            if (!s.gate) {
                work = q.shift();
            }
            if (work) {
                // Add work item to the work-in-progress set.
                progress.lookup[work.id] = work;
                progress.history.push(work);
                s.hw_hst =
                    progress.history.length > s.hw_hst ? progress.history.length : s.hw_hst;
                // If work item is a gate, set the state of the instance as
                // gated.  This work item will need to complete before later
                // work items in the queue can be processed.
                s.gate = work.gate;
                // Call the work item function (which does the real work),
                // passing a callback. This callback has no arguments
                // (including no error!).  It is called only to indicate
                // completion of the work item.  Work items must handle their
                // own errors and results.
                work.start = Date.now();
                work.callback = make_work_fn_callback(work);
                timeout_checklist.push(work);
                s.hw_tmc =
                    timeout_checklist.length > s.hw_tmc ? timeout_checklist.length : s.hw_tmc;
                work.fn(work.callback);
                next = true;
            }
        } while (next);
        // Keep processing work items until none are left or a gate is reached.
    }
    // Create the callback for the work function
    function make_work_fn_callback(work) {
        return function work_fn_callback() {
            if (work.done) {
                return;
            }
            work.end = Date.now();
            // Remove the work item from the work-in-progress set.  As
            // work items may complete out of order, prune the history
            // from the front until the first incomplete work
            // item. Later complete work items will eventually be
            // reached on another processing round.
            work.done = true;
            delete progress.lookup[work.id];
            while (progress.history[0] && progress.history[0].done) {
                progress.history.shift();
            }
            while (timeout_checklist[0] && timeout_checklist[0].done) {
                timeout_checklist.shift();
            }
            // If the work item was a gate, it is now complete, and the
            // instance can be ungated, allowing later work items in the
            // queue to be processed.
            if (work.gate) {
                s.gate = false;
            }
            // If work queue and work-in-progress set are empty, then
            // call the registered clear functions.
            if (0 === q.length && 0 === progress.history.length) {
                clearInterval(s.tm_in);
                s.tm_in = null;
                if (s.firstclear) {
                    let fc = s.firstclear;
                    s.firstclear = null;
                    fc();
                }
                if (s.clear) {
                    s.clear();
                }
            }
            // Process each work item on next tick to avoid lockups.
            setImmediate(processor);
        };
    }
    // To be run periodically via setInterval. For timed out work items,
    // calls the done callback to allow work queue to proceed, and marks
    // the work item as finished. Work items can receive notification of
    // timeouts by providing an `ontm` callback property in the
    // work definition object. Work items must handle timeout errors
    // themselves, gate-executor cares only for the fact that a timeout
    // happened, so it can continue processing.
    function timeout_check() {
        let now = Date.now();
        let work = null;
        for (let i = 0; i < timeout_checklist.length; ++i) {
            work = timeout_checklist[i];
            if (!work.gate && !work.done && work.tm < now - work.start) {
                if (work.ontm) {
                    work.ontm(work.tm, work.start, now);
                }
                work.callback();
            }
        }
    }
    // Start processing work items. Must be called to start processing.
    // Can be called at anytime, interspersed with calls to other
    // methods, including `add`. Takes a function as argument, which is
    // called only once on the next time the queues are clear.
    self.start = function (firstclear) {
        // Allow API chaining by not starting in current execution path.
        setImmediate(function () {
            s.running = true;
            if (firstclear) {
                s.firstclear = firstclear;
            }
            processor();
        });
        return self;
    };
    // Pause the processing of work items. Newly added items, and items
    // not yet started, will not proceed, but items already in progress
    // will complete, and the clear function will be called once all in
    // progress items finish.
    self.pause = function () {
        s.running = false;
    };
    // Submit a function that will be called each time there are no more
    // work items to process. Multiple calls to this method will replace
    // the previously registered clear function.
    self.clear = function (done) {
        s.clear = done;
        return self;
    };
    // Returns `true` when there are no more work items to process.
    self.isclear = function () {
        return 0 === q.length && 0 === progress.history.length;
    };
    // Add a work item. This is an object with fields:
    //   * `fn` (function): the function that performs the work. Takes a
    //     single argument, the callback function to call when the work is
    //     complete. THis callback does **not** accept errors or
    //     results. It's only purpose is to indicate that the work is
    //     complete (whether failed or not). The work function itself must
    //     handle callbacks to the application. Required.
    //   * `id` (string): identifier for the work item. Optional.
    //   * `tm` (integer): millisecond timeout specific to this work item,
    //     overrides general timeout. Optional.
    //   * `ontm` (function): callback to indicate work item timeout. Optional.
    //   * `dn` (string): description of the work item, used in the
    //     state description. Optional.
    self.add = function (work) {
        s.work_counter += 1;
        work.id = work.id || '' + s.work_counter;
        work.ge = self.id;
        work.tm = null == work.tm ? options.timeout : work.tm;
        work.dn = work.dn || work.fn.name || '' + Date.now();
        // Used by calling code to store additional context.
        work.ctxt = {};
        q.push(work);
        if (s.running) {
            // Work items are **not** processed in the current execution path!
            // This prevents lockup, and avoids false positives in unit tests.
            // Work items are assumed to be inherently asynchronous.
            setImmediate(processor);
        }
        return self;
    };
    // Create a new gate. Returns a new `GateExecutor` instance.  All
    // work items added to the new instance must complete before the
    // gate is cleared, and work items in the queue can be processed.  A
    // gate is cleared when the new instance is **first** cleared. Work
    // items subsequently added to the new instance are not considered
    // part of the gate. Gates can extend to any depth and form a tree
    // structure that requires breadth-first traversal in terms of the
    // work item queue. Gates do not have timeouts, and can only be
    // cleared when all added work items complete.
    self.gate = function () {
        let ge = GateExecutor(options, instance_counter);
        let fn = function gate(done) {
            // This is the work function of the gate, which starts the new
            // instance, and considers the gate work item complete when the
            // work queue clears for the first time.
            ge.start(done);
        };
        self.add({ gate: ge, fn: fn });
        return ge;
    };
    // Return a data structure describing the current state of the work
    // queues, and organised as a tree structure indicating the gating
    // relationships.
    self.state = function () {
        let out = [];
        // First list any in-progress work items.
        for (let hI = 0; hI < progress.history.length; ++hI) {
            let pe = progress.history[hI];
            if (!pe.done) {
                out.push({ s: 'a', ge: pe.ge, dn: pe.dn, id: pe.id });
            }
        }
        // Then list any waiting work items.
        for (let qI = 0; qI < q.length; ++qI) {
            let qe = q[qI];
            if (qe.gate) {
                // Go down a level when there's a gate.
                out.push(qe.gate.state());
            }
            else {
                out.push({ s: 'w', ge: qe.ge, dn: qe.dn, id: qe.id });
            }
        }
        out.internal = {
            qlen: q.length,
            hlen: progress.history.length,
            klen: Object.keys(progress.lookup).length,
            tlen: timeout_check.length,
            hw_hst: s.hw_hst,
            hw_tmc: s.hw_tmc,
        };
        return out;
    };
    return self;
}
// The module function
exports.default = MakeGateExecutor;
if (undefined != typeof (module.exports)) {
    module.exports = MakeGateExecutor;
}
//# sourceMappingURL=gate-executor.js.map