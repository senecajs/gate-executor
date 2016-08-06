/* Copyright (c) 2014-2016 Richard Rodger, MIT License */
"use strict";


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
    pc: 10000*self.id,
    idc: 0,
    gate: false,
    running: false,
    clear: null,
    firstclear: null
  }

  function process (whence) {
    s.pc += 1

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
        // console.log(s.pc,'W',whence,self.state())

        work.fn(function () {
          p.m[work.id].done = true
          delete p.m[work.id]
          while (p.s[0] && p.s[0].done) {
            p.s.shift()
          }
          // console.log(s.pc,'D',whence,self.state())

          if (work.gate) {
            s.gate = false
          }

          if (0 === q.length && 0 === p.s.length) {
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
    work.fnn = work.fn.name
    work.ofn = work.fn
    var tfn = function (done) {
      work.callback = done
      work.start = Date.now()
      inflight.push(work)
      work.ofn(function () {
        // console.log(work.fnn,'D',work.fin)
        if (work.fin) return
        work.fin = true
        work.callback()
      })
    }
    return tfn
  }

  setInterval(function () {
    var now = Date.now()
    // console.log('I',now,inflight)
    for (var i = 0; i < inflight.length; ++i) {
      var work = inflight[i]
      // console.log(work.fnn,'T',work.tm < now - work.start,work.fin)
      if (work.tm < now - work.start && !work.fin) {
        //console.log(work.fnn,'TT',work.tm < now - work.start,work.fin)
        work.fin = true
        work.callback()

        if (work.ontm) {
          work.ontm()
        }
      }
    }
    while (inflight[0] && inflight[0].fin) {
      var work = inflight.shift()
      // console.log(work.fnn,'C',work.fin)
    }
  }, options.interval)

  self.start = function (firstclear) {
    setImmediate(function () {
      s.running = true
      s.firstclear = firstclear
      process('start')
    })
  }

  self.clear = function (done) {
    s.clear = done
  }

  self.add = function (work) {
    s.idc += 1
    work.id = s.idc
    work.ge = self.id
    work.tm = null == work.tm ? options.timeout : work.tm
    work.fn = timeout(work)
    //console.log(work)

    q.push(work)
    // console.log(s.pc,'A',self.state())
    
    if (s.running) {
      setImmediate(function () {
        process('add:'+work.id)
      })
    }
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
        o.push({s:'a', ge: qe.ge, fnn:qe.fnn, wid:qe.id})
      }
    }
    for (var i = 0; i < q.length; ++i) {
      var qe = q[i]
      if (qe.gate) {
        o.push(qe.gate.state())
      }
      else {
        o.push({s:'w', ge: qe.ge, fnn:qe.fnn, wid:qe.id})
      }
    }
    return o
  }
}



module.exports = make_GateExecutor
