/* Copyright (c) 2016-2021 Richard Rodger, MIT License */

import GateExecutor from '..'

import { LOG_ALL_EXPECTED } from './log_all_expected'


describe('gate-executor', () => {
  test('basic', (done) => {
    jest.useFakeTimers()

    var ge: any = GateExecutor()

    var log: any[] = []

    ge.add({
      fn: function first(done: any) {
        log.push('first')
        done()
      }
    })

    ge.start(function fc() {
      log.push('done')
      expect(log).toMatchObject(['first', 'done'])

      done()
    })
    jest.runAllTimers()
  })



  test('readme', (done) => {
    jest.useFakeTimers()

    var ge: any = GateExecutor()

    var log: any[] = []

    ge.add({
      fn: function first(done: any) {
        log.push('first')
        done()
      }
    })

    var subge = ge.gate()

    ge.add({
      fn: function second(done: any) {
        log.push('second')
        done()
      }
    })

    subge.add({
      fn: function second(done: any) {
        log.push('third')
        done()
      }
    })

    ge.start(function fc() {
      log.push('done')
      expect(log).toMatchObject(['first', 'third', 'second', 'done'])

      done()
    })
    jest.runAllTimers()
  })


  it('happy', function(done: any) {
    jest.useFakeTimers()
    var log: any[] = []

    var ge: any = GateExecutor({})

    ge.add({ fn: function aa(d: any) { log.push('aa'); d() } })
    ge.add({ fn: function bb(d: any) { log.push('bb'); d() } })


    var ge2 = ge.gate()
    ge2.add({ fn: function ccc(d: any) { log.push('ccc'); d() } })

    ge.add({ fn: function dd(d: any) { log.push('dd'); d() } })

    ge2.add({ fn: function ddd(d: any) { log.push('ddd'); d() } })

    expect(JJ(ge.state())).toMatchObject([
      { s: 'w', ge: 1, dn: 'aa', id: '1' },
      { s: 'w', ge: 1, dn: 'bb', id: '2' },
      [{ s: 'w', ge: 2, dn: 'ccc', id: '1' },
      { s: 'w', ge: 2, dn: 'ddd', id: '2' }],
      { s: 'w', ge: 1, dn: 'dd', id: '4' }])

    ge2.clear(function() {
      expect(log).toMatchObject(['aa', 'bb', 'ccc', 'ddd'])
      expect(JJ(ge.state())).toMatchObject([
        { s: 'w', ge: 1, dn: 'dd', id: '4' }])
    })

    ge.clear(function() {
      expect(log).toMatchObject(['aa', 'bb', 'ccc', 'ddd', 'dd'])
      done()
    })

    ge.start()
    jest.runAllTimers()
  })


  it('desc', function(done: any) {
    jest.useFakeTimers()
    var log: any[] = []

    var ge: any = GateExecutor({})

    // hack to avoid an inferred function name
    ge.add({ fn: [function(d: any) { log.push('aa'); d() }][0] })

    ge.add({ fn: function bb(d: any) { log.push('bb'); d() } })
    ge.add({ dn: 'CC', fn: function cc(d: any) { log.push('cc'); d() } })

    var s0 = ge.state()

    s0[0].dn = '' + Math.floor(parseInt(s0[0].dn, 10) / 36e5)
    var m0 = [
      { s: 'w', ge: 1, dn: '' + Math.floor(Date.now() / 36e5), id: '1' },
      { s: 'w', ge: 1, dn: 'bb', id: '2' },
      { s: 'w', ge: 1, dn: 'CC', id: '3' }]

    expect(s0[0]).toMatchObject(m0[0])
    expect(s0[1]).toMatchObject(m0[1])
    expect(s0[2]).toMatchObject(m0[2])

    done()
  })


  it('running', function(done: any) {
    jest.useFakeTimers()
    var log: any[] = []

    var ge: any = GateExecutor({})

    ge.add({ fn: function aa(d: any) { log.push('aa'); d() } })
    ge.add({ fn: function bb(d: any) { log.push('bb'); d() } })

    var cc = 0
    ge.clear(function() {
      ++cc
      if (1 === cc) {
        expect(log).toMatchObject(['aa', 'bb'])
      }
      else if (2 === cc) {
        expect(log).toMatchObject(['aa', 'bb', 'cc'])
        done()
      }
    })

    ge.start(function() {
      expect(log).toMatchObject(['aa', 'bb'])
    })
    setImmediate(function() {
      ge.add({ fn: function cc(d: any) { log.push('cc'); d() } })
    })
    jest.runAllTimers()


  })


  it('timeout-basic', function(done: any) {
    jest.useFakeTimers()

    var log: any[] = []

    var ge: any = GateExecutor({ timeout: 200, interval: 11 })

    ge.add({
      fn: function aa(d: any) {
        log.push('s-aa')
        setTimeout(function() { log.push('e-aa'); d() }, 100)
      }
    })

    ge.add({
      fn: function bb(d: any) {
        log.push('s-bb')
        setTimeout(function() { log.push('e-bb'); d() }, 300)
      }
    })

    ge.add({
      fn: function cc(d: any) {
        log.push('s-cc')
        setTimeout(function() { log.push('e-cc'); d() }, 150)
      }
    })

    ge.add({
      tm: 50,
      ontm: function(timeout: any, start: any, end: any) {
        log.push('t-dd:' + timeout + ':' + (end - start > timeout ? 'P' : 'F'))
      },
      fn: function dd(d: any) {
        log.push('s-dd')
        setTimeout(function() { log.push('e-dd'); d() }, 150)
      }
    })

    ge.clear(function() {
      expect(log).toMatchObject(
        ['s-aa', 's-bb', 's-cc', 's-dd', 't-dd:50:P', 'e-aa', 'e-cc', 'e-dd'])
      done()
    })

    ge.start()
    jest.runAllTimers()
  })


  it('timeout-after-clear', function(done: any) {
    jest.useFakeTimers()

    var log: any = []

    var ge: any = GateExecutor({ timeout: 200, interval: 11 })

    expect(ge.options).toMatchObject({ timeout: 200, interval: 11 })

    var firstTime = true

    ge.add({
      fn: function aa(d: any) {
        log.push('s-aa')
        log.push('e-aa')
        d()
      }
    })

    ge.clear(function() {
      if (firstTime) {
        expect(log).toMatchObject(['s-aa', 'e-aa'])
        firstTime = false

        ge.add({
          tm: 50,
          ontm: function() {
            log.push('t-bb')
          },
          fn: function bb(d: any) {
            log.push('s-bb')
            setTimeout(function() { log.push('e-bb'); d() }, 150)
          }
        })

        return
      }

      expect(log).toMatchObject(['s-aa', 'e-aa', 's-bb', 't-bb'])
      done()
    })

    ge.start()
    jest.runAllTimers()
  })


  it('traverse', function(done: any) {
    jest.useFakeTimers()
    var all = descend([], 1, 0)

    var ge_all = []
    for (var i = 0; i < all.length; ++i) {
      var b: any = build(all[i])
      b.i = i
      ge_all[i] = b
    }

    var log_all: any[] = []
    var j = 0
    ge_all.forEach(function(b) {
      b.ge.start(function() {
        log_all[b.i] = b.log
        j++
        if (j === ge_all.length) {
          verify()
        }
      })
      jest.runAllTimers()
    })

    function verify() {
      expect(log_all).toMatchObject(LOG_ALL_EXPECTED)

      // IMPORTANT: confirms memory usage is well-behaved
      expect(process.memoryUsage().rss < 150000000)

      done()
    }

    function descend(all: any, gec: any, depth: any) {
      if (4 < depth) {
        return
      }

      var jump = all[all.length - 1] || []

      for (var ge = 0; ge < gec; ++ge) {
        var add_jump = jump.concat([])
        add_jump.push({ type: 'add', ge: ge })
        all.push(add_jump)
        descend(all, gec, depth + 1)
      }

      for (ge = 0; ge < gec; ++ge) {
        var gate_jump = jump.concat([])
        gate_jump.push({ type: 'gate', ge: ge })
        all.push(gate_jump)
        descend(all, gec + 1, depth + 1)
      }

      return all
    }


    function build(path: any) {
      var log: any[] = []
      var ge: any = [GateExecutor({})]
      for (var i = 0; i < path.length; i++) {
        var part = path[i]
        var fn: any, n: any
        if ('add' === part.type) {
          n = 'a_p_' + i + '_g_' + part.ge
          eval("fn = function " + n +
            " (done) { log.push('" + n + "'); done() }")
          ge[part.ge].add({ fn: fn })
        }
        else if ('gate' === part.type) {
          var geI = ge.length
          ge[geI] = ge[part.ge].gate()
          n = 'g_p_' + i + '_g_' + part.ge
          eval("fn = function " + n +
            " (done) { log.push('" + n + "'); done() }")
          ge[geI].add({ fn: fn })
        }
      }

      return {
        log: log,
        ge: ge[0]
      }
    }
  })


  it('gate-timeout', function(done: any) {
    jest.useFakeTimers()
    var log: any[] = []

    var ge: any = GateExecutor({ timeout: 200, interval: 11 })

    ge.add({
      id: 'aa',
      dn: 'Daa',
      fn: function(d: any) {
        log.push('s-aa')
        setTimeout(function() { log.push('e-aa'); d() }, 100)
      }
    })

    var ge2 = ge.gate()

    ge2.add({
      id: 'bb',
      dn: 'Dbb',
      tm: 400,
      fn: function bb(d: any) {
        log.push('s-bb')
        setTimeout(function() { log.push('e-bb'); d() }, 300)
      }
    })

    ge.add({
      id: 'cc',
      dn: 'Dcc',
      fn: function cc(d: any) {
        log.push('s-cc')
        setTimeout(function() { log.push('e-cc'); d() }, 100)
      }
    })

    ge.start(function() {
      expect(log).toMatchObject(['s-aa', 's-bb', 'e-aa', 'e-bb', 's-cc', 'e-cc'])
      done()
    })

    jest.runAllTimers()
  })


  it('start-pause', function(done: any) {
    jest.useRealTimers()
    var log: any[] = []
    var ge: any = GateExecutor({ timeout: 200, interval: 11 })

    ge.add({
      fn: function(d: any) {
        log.push('s-aa')
        expect(ge.isclear()).toEqual(false)
        setTimeout(function() { log.push('e-aa'); d() }, 100)
      }
    })

    expect(ge.isclear()).toEqual(false)

    ge.start()

    ge.add({
      fn: function(d: any) {
        log.push('s-bb')
        expect(ge.isclear()).toEqual(false)
        setTimeout(function() { log.push('e-bb'); d() }, 100)
      }
    })

    ge.start(function() {
      throw new Error('should never get here as replaced')
    })

    ge.start(function() {
      expect(log).toMatchObject(['s-aa', 's-bb', 'e-aa', 'e-bb'])
      expect(ge.isclear()).toEqual(true)
      ge.pause()

      ge.add({
        fn: function(d: any) {
          log.push('s-cc')
          expect(ge.isclear()).toEqual(false)
          setTimeout(function() { log.push('e-cc'); d() }, 100)
        }
      })

      setTimeout(function() {
        expect(log).toMatchObject(['s-aa', 's-bb', 'e-aa', 'e-bb'])

        ge.start(function() {
          expect(log).toMatchObject(
            ['s-aa', 's-bb', 'e-aa', 'e-bb', 's-cc', 'e-cc'])
          expect(ge.isclear()).toEqual(true)
          done()
        })
      }, 333)
    })
  })

  it('memory', function(done: any) {
    jest.useFakeTimers()
    var ge: any = GateExecutor({})
    var start = Date.now()

    for (var i = 0; i < 10000; ++i) {
      ge.add({
        fn: function foo(done: any) {
          done()
        }
      })
    }
    var added = Date.now()

    ge.start(function() {
      var end = Date.now()
      var ges = ge.state().internal

      expect(end - start < 444)
      expect(added - start < 222)
      expect(ges.qlen).toEqual(0)
      expect(ges.hlen).toEqual(0)
      expect(ges.klen).toEqual(0)
      expect(ges.tlen).toEqual(0)

      done()
    })
    jest.runAllTimers()
  })

})


// Normalize arrays with properties.
const JJ = (x: any) => JSON.parse(JSON.stringify(x))
