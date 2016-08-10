/* Copyright (c) 2014-2016 Richard Rodger, MIT License */
"use strict";

// FIX: gates should not timeout as subactions need time


function make_GateExecutor (options) {
  options = options || {}
  options.interval = null == options.interval ? 111 : options.interval
  options.timeout = null == options.timeout ? 2222 : options.timeout

  var ge = new GateExecutor(options, 0)
  return ge
}


function GateExecutor (options, gec) {
  var self = this
  self.id = ++gec

  var q = []

  var p = {
    m: {},
    s: []
  }

  var s = {
    pc: 10000000 * self.id,
    idc: 0,
    gate: false,
    running: false,
    clear: null,
    firstclear: null,
    tm_in: null
  }

  function process (whence) {
    s.pc += 1

    if (!s.running) {
      return
    }

    function next() {
      var res = false
      var work

      if (!s.gate) { 
        // console.log(s.pc,'Q',whence,self.state())
        work = q.shift()
      }

      if (work) {
        p.m[work.id] = work
        p.s.push(work)
        s.gate = work.gate

        // console.log('GE',self.id,s.pc,'W',whence,self.state())

        work.fn(function () {
          p.m[work.id].done = true
          delete p.m[work.id]
          while (p.s[0] && p.s[0].done) {
            p.s.shift()
          }
          // console.log('GE',self.id,s.pc,'D',whence,self.state())

          if (work.gate) {
            s.gate = false
          }

          if (0 === q.length && 0 === p.s.length) {
            //console.log('GE',self.id,'CLEAR')

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

          setImmediate(function () {
            process('fn-done:'+work.id)
          })
        })

        res = true
      }
      return res
    }

    while (next()) {}
  }


  var inflight = []

  function timeout (work) {
    work.fin = false
    work.ofn = work.fn

    var tfn = function (callback) {
      work.callback = callback
      work.start = Date.now()
      inflight.push(work)
      work.ofn(function () {
        // console.log('GE',work.description,'D',work.fin)

        if (work.fin) return
        work.fin = true
        work.callback()
      })
    }
    return tfn
  }

  function timeout_check () {
    var now = Date.now()
    // console.log('I',now,inflight)
    for (var i = 0; i < inflight.length; ++i) {
      var work = inflight[i]
      // console.log('GE',self.id,work.id,work.description,'T',work.tm < now - work.start,work.fin)

      if (!work.gate && !work.fin && work.tm < now - work.start) {
        //console.log('GE',self.id,work.id,work.description,'TT',work.tm < now - work.start,work.fin)
        work.fin = true
        work.callback()

        if (work.ontm) {
          work.ontm()
        }
      }
    }
    while (inflight[0] && inflight[0].fin) {
      var work = inflight.shift()
      // console.log(work.description,'C',work.fin)
    }
  }

  self.start = function (firstclear) {
    setImmediate(function () {
      s.running = true

      if (firstclear) {
        s.firstclear = firstclear
      }

      if (!s.tm_in) {
        s.tm_in = setInterval(timeout_check, options.interval)
      }

      process('start')
    })
    return self
  }

  // TODO: test
  self.pause = function () {
    s.running = false
  }
  
  self.clear = function (done) {
    s.clear = done
    return self
  }

  self.isclear = function () {
    return (0 === q.length && 0 === p.s.length)
  }

  self.add = function (work) {
    s.idc += 1
    work.id = work.id || s.idc
    work.ge = self.id
    work.tm = null == work.tm ? options.timeout : work.tm
    work.description = work.description || work.fn.name || ''+Date.now()

    work.fn = timeout(work)
    // console.log(work)

    q.push(work)
    // console.log(s.pc,'A',work.description,self.id,self.state())
    
    if (s.running) {
      //if (!s.tm_in) {
      //  s.tm_in = setInterval(timeout_check, options.interval)
      //}

      setImmediate(function () {
        process('add:'+work.id)
      })
    }

    return self
  }

  self.gate = function () {
    var ge = new GateExecutor(options, self.id)
    var fn = function gate (done) {
      ge.start(done)
    }

    self.add({gate:ge, fn:fn})

    return ge
  }

  self.state = function () {
    var o = []
    for (var i = 0; i < p.s.length; ++i) {
      var qe = p.s[i]
      if (!qe.done) {
        o.push({s:'a', ge: qe.ge, d:qe.description, wid:qe.id})
      }
    }
    for (var i = 0; i < q.length; ++i) {
      var qe = q[i]
      if (qe.gate) {
        o.push(qe.gate.state())
      }
      else {
        o.push({s:'w', ge: qe.ge, d:qe.description, wid:qe.id})
      }
    }
    return o
  }
}

module.exports = make_GateExecutor
