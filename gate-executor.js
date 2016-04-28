/* Copyright (c) 2014-2015 Richard Rodger, MIT License */
/* jshint node:true, asi:true, eqnull:true */
"use strict";


var events = require('events')
var util   = require('util')

var _      = require('lodash')
var async  = require('async')
var error  = require('eraro')({package:'gate-executor'})


util.inherits( GateExecutor, events.EventEmitter )

// Create new GateExecutor
// options:
//    * _timeout_:   take timeout
//    * _trace_:     true => built in tracing, function => custom tracing
//    * _error_:     function for unexpected errors, default: emit: 'error'
//    * _msg_codes_: custom tracing code names
function GateExecutor( options ) {
  var self = this
  events.EventEmitter.call(self)

  options = _.extend({
    timeout: 33333,
    trace:   false,
    stubs:   {Date:{}},

    clear: function() {
      self.emit('clear')
    },
  },options)

  options.msg_codes = _.extend({
    msg_codes: {
      timeout:   'task-timeout',
      error:     'task-error',
      callback:  'task-callback',
      execute:   'task-execute',
      abandoned: 'task-abandoned'
    }
  },options.msg_codes)


  var set_timeout   = options.stubs.setTimeout   || setTimeout
  var clear_timeout = options.stubs.clearTimeout || clearTimeout
  var now           = options.stubs.Date.now     || Date.now

  var q = async.queue(work,1)

  var gated    = false
  var waiters  = []
  var inflight = 0

  var runtrace = !!options.trace
  self.tracelog = runtrace ? (_.isFunction(options.trace) ? null : []) : null

  var tr = !runtrace ? _.noop :
        (_.isFunction(options.trace) ? options.trace : function() {
          var args = Array.prototype.slice.call(arguments)
          args.unshift(now())
          self.tracelog.push( args )
        })


  q.drain = function(){
    /* jshint boss:true */

    tr('ungate',gated,inflight)
    gated = false

    var task = null
    while( task = waiters.shift() ) {
      work(task,task.cb)
    }
  }

  function check_clear() {
    inflight--

    if( self.clear() ) {
      tr('clear',gated,inflight)
      options.clear()
    }
  }

  function work( task, done ) {
    tr('work',gated,inflight,task.id,task.desc)

    var completed = false
    var timedout  = false
    var timeout = (typeof task.timeout === 'number') ? task.timeout : options.timeout

    if( done ) {
      var toref = set_timeout(function(){
        timedout = true
        if( completed ) return;

        tr('timeout',gated,inflight,task.id,task.desc)
        task.time.end = now()

        var err = new Error(
          '[TIMEOUT:'+task.id+':'+
            timeout+'<'+task.time.end+'-'+task.time.start+':'+
            task.desc+']')

        err.timeout = true

        err = error(err,options.msg_codes.timeout,task)

        done(err,null)

        check_clear()
      }, timeout)
    }

    task.time = {start:now()}

    var task_start = Date.now()
    task.fn(function(err,out){
      var args = _.toArray(arguments)

      completed = true
      if( timedout ) return

      tr('done',gated,inflight,task.id,task.desc,Date.now()-task_start)
      task.time.end = now()

      if( toref ) {
        clear_timeout(toref)
      }

      if( err ) {
        args[0] = error(err,options.msg_codes.error,task)
      }

      if( done ) {
        done.apply(null,args)
      }

      check_clear()
    })
  }


  self.execute = function( task ) {
    inflight++

    if( task.gate ) {
      tr('gate',gated,inflight,task.id,task.desc)
      gated = true
      q.push(task, task.cb)
    }
    else if( gated && !task.ungate ) {
      tr('wait',gated,inflight,task.id,task.desc)
      waiters.push( task )
    }
    else {
      tr('run',gated,inflight,task.id,task.desc)
      work( task, task.cb )
    }
  }


  self.clear = function() {
    return ( 0 == inflight && 0 === waiters.length && 0 === q.length() )
  }

  return self
}


module.exports = function( options) {
  return new GateExecutor(options)
}
