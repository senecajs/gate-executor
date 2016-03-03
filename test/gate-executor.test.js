/* Copyright (c) 2014-2015 Richard Rodger, MIT License */
"use strict";

var util   = require('util')

var Lab = require('lab')
var Code = require('code')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var expect = Code.expect

var _ = require('lodash')

var executor = require('..')

// timerstub broken on node >0.10
//var timerstub = require('timerstub')

var timerstub = {
  setTimeout:  setTimeout,
  setInterval: setInterval,
  Date:        Date,
  wait: function(dur,fn){
    setTimeout(fn,dur)
  }
}


describe('executor', function(){

  it('happy', function(done) {
    if( ~process.version.indexOf('0.11.') ) return done();

    var e0 = executor({
      trace:true,
      timeout:150,
      stubs:timerstub
    })

    var printlog = []

    function print(err,out){
      if( err ) return printlog.push('ERROR: '+err)
      printlog.push(''+out)
    }

    function mfn(a,d) {
      var f = function(cb){
        timerstub.setTimeout(function(){
          if( 'b'==a ) return cb(new Error('B'));
          cb(null,a)
        },d)
      }
      return f
    }

    var start = timerstub.Date.now()
    e0.execute({id:'a',fn:mfn('a', 25),  cb:print})
    e0.execute({id:'b',fn:mfn('b', 25),  cb:print})
    e0.execute({id:'c',fn:mfn('cG',50), cb:print,gate:true})
    e0.execute({id:'d',fn:mfn('d', 25),  cb:print})

    timerstub.setTimeout( function(){
      e0.execute({id:'e',fn:mfn('eG', 50), cb:print,gate:true})
      e0.execute({id:'f',fn:mfn('fG', 50), cb:print,gate:true})
      e0.execute({id:'g',fn:mfn('g',  25),  cb:print})
      e0.execute({id:'h',fn:mfn('h',  25),  cb:print})

      e0.execute({id:'i',fn:mfn('i',175),cb:print})
    },100)

    timerstub.setTimeout( function(){
      e0.execute({id:'j',fn:mfn('j',25),cb:print})
      e0.execute({id:'k',fn:mfn('k',25),cb:print})
    },350)


    // hopefully a temporary hack until timerstub works properly with node 0.11
    function fixfuzz(mod,str) {
      str = str.replace(/\d+/g, function(m){ return mod*Math.floor(parseInt(m,10)/mod) })
      //console.log('\nA:'+str)
      str = str.replace(/\d\d\d/g, function(m){ return (2*mod)*Math.ceil(parseInt(m,10)/(mod*2)) })
      //console.log('\nB:'+str)
      str = str.replace(/150/g,'160')
      str = str.replace(/200/g,'210')
      str = str.replace(/350/g,'360')
      return str;
    }


    timerstub.setTimeout(function(){
      //console.log( util.inspect(printlog).replace(/\s+/g,' ') )
      printlog[8] = printlog[8].replace(/\[TIMEOUT.*\]/,'[TIMEOUT]')

      expect(printlog).to.deep.equal([ 'a', 'ERROR: Error: gate-executor: B',
         'cG', 'd', 'eG', 'fG', 'g', 'h',
         'ERROR: Error: gate-executor: [TIMEOUT]', 'j', 'k' ])

    },400)

    timerstub.wait(450, done)
  })


  it('no-callback', function (done){
    var e1 = executor({
      trace:true,
      timeout:30,
      stubs:timerstub
    })

    var t1 = false
    var start = timerstub.Date.now()
    e1.execute({id:'a',fn:function(done){t1=true;done()}})
    timerstub.wait(90,function(){
      expect(t1).to.be.true()
      done()
    })
  })


  it('ignore-gate', function (done){
    var e1 = executor({
      trace:true,
      timeout:20,
      stubs:timerstub
    })

    var seq = ''

    e1.execute({id:'a', fn:function(done){ seq+='a';done() }})

    e1.execute({id:'b', gate: true, fn: function(done){
      seq += 'b'

      e1.execute({id:'c', ungate:true, fn: function(done2){
        seq += 'c'

        done2()
        done()
      }})

      e1.execute({id: 'd', gate:true, fn:function(done3){
        seq+='d'
        timerstub.setTimeout(done3,20)
      }})

    }})
    e1.execute({id:'e',fn:function(done){ seq+='e';done()}})

    timerstub.wait(40,function(){
      //console.log('SEQ '+seq)

      expect(seq).to.equal('abcde')
      done()
    })
  })


  it('timeouts', function (fin) {
    var e1 = executor({
      trace:true,
      timeout:100,
      stubs:timerstub
    })

    var log = []

    function mfn (id,t) {
      return function(done) {
        log.push(id)
        if( t ) {
          setTimeout(function(){done(null,id)},t)
        }
        else done(null,id)
      }
    }

    function mcb (id) {
      return function(err,out) {
        //console.log('c',id,err,out)
        log.push('c'+id+'~'+(err&&err.timeout)+'~'+out)
      }
    }

    var cI = 0
    e1.on('clear', function () {
      cI++
      log.push('c'+cI)
      //console.log(cI, e1.tracelog)
      //console.log(log)

      if( 2 === cI ) {
        //console.log(log)

        expect(log).to.deep.equal(
          [ 0,
            1,
            'c0~null~0',
            'c1~true~null',
            'c1',
            5,
            'c5~null~5',
            2,
            'c2~null~2',
            3,
            'c3~true~null',
            6,
            'c6~null~6',
            4,
            'c4~null~4',
            7,
            'c7~null~7',
            'c2' ]
        )
        fin()
      }
    })

    // seq: 0,1
    e1.execute({id:0,fn:mfn(0,50),cb:mcb(0)})
    e1.execute({id:1,fn:mfn(1,200),cb:mcb(1)})

    setTimeout( function() {

      // seq: 5,2,3,6,4,7
      e1.execute({id:2,gate:true,fn:mfn(2,10),cb:mcb(2)})
      e1.execute({id:3,gate:true,fn:mfn(3,200),cb:mcb(3)})
      e1.execute({id:4,fn:mfn(4),cb:mcb(4)})
      e1.execute({id:5,ungate:true,fn:mfn(5),cb:mcb(5)})
      e1.execute({id:6,gate:true,fn:mfn(6,10),cb:mcb(6)})
      e1.execute({id:7,fn:mfn(7),cb:mcb(7,10)})
    }, 200)
  })

  it('can override timeout', function (fin) {
    var e1 = executor({
      trace:true,
      timeout:5000,
      stubs:timerstub
    })

    var log = []

    function mfn (id,t) {
      return function(done) {
        log.push(id)
        if( t ) {
          setTimeout(function(){done(null,id)},t)
        }
        else done(null,id)
      }
    }

    function mcb (id) {
      return function(err,out) {
        //console.log('c',id,err,out)
        log.push('c'+id+'~'+(err&&err.timeout)+'~'+out)
      }
    }

    var cI = 0
    e1.on('clear', function () {
      cI++
      log.push('c'+cI)
      //console.log(cI, e1.tracelog)
      //console.log(log)

      if( 2 === cI ) {
        //console.log(log)

        expect(log).to.deep.equal(
          [ 0,
            1,
            'c0~null~0',
            'c1~true~null',
            'c1',
            5,
            'c5~null~5',
            2,
            'c2~null~2',
            3,
            'c3~true~null',
            6,
            'c6~null~6',
            4,
            'c4~null~4',
            7,
            'c7~null~7',
            'c2' ]
        )
        fin()
      }
    })

    // seq: 0,1
    e1.execute({id:0,fn:mfn(0,50),cb:mcb(0),timeout:100})
    e1.execute({id:1,fn:mfn(1,200),cb:mcb(1),timeout:100})

    setTimeout( function() {

      // seq: 5,2,3,6,4,7
      e1.execute({id:2,gate:true,fn:mfn(2,10),cb:mcb(2),timeout:100})
      e1.execute({id:3,gate:true,fn:mfn(3,200),cb:mcb(3),timeout:100})
      e1.execute({id:4,fn:mfn(4),cb:mcb(4),timeout:100})
      e1.execute({id:5,ungate:true,fn:mfn(5),cb:mcb(5),timeout:100})
      e1.execute({id:6,gate:true,fn:mfn(6,10),cb:mcb(6),timeout:100})
      e1.execute({id:7,fn:mfn(7),cb:mcb(7,10),timeout:100})
    }, 200)
  })


  it('determinism', function (fin) {
    var e1 = executor({
      trace:true,
      timeout:100,
      stubs:timerstub
    })

    var log = []
    function mfn (id,t) {
      return function(done) {
        log.push(id)
        if( t ) {
          setTimeout(done,t)
        }
        else done()
      }
    }

    var cI = 0
    e1.on('clear', function () {
      cI++
      log.push('c'+cI)
      //console.log(cI, e1.tracelog)

      if( 4 === cI ) {
        //console.log(log)

        expect(log).to.deep.equal(
          [ 0, 1, 'c1', 2, 3, 'c2', 4, 6, 5, 'c3', 9, 7, 10, 8, 'c4' ]
        )

        fin()
      }
    })

    // seq: 0,1
    e1.execute({id:0,fn:mfn(0)})
    e1.execute({id:1,fn:mfn(1)})

    setTimeout( function() {

      // seq: 2,3
      e1.execute({id:2,fn:mfn(2,40)})
      e1.execute({id:3,fn:mfn(3,20)})

      setTimeout( function() {

        // seq: 4,6,5
        e1.execute({id:4,gate:true,fn:mfn(4)})
        e1.execute({id:5,fn:mfn(5)})
        e1.execute({id:6,gate:true,fn:mfn(6)})

        setTimeout( function() {

          // seq: 9,7,10,8
          e1.execute({id:7,gate:true,fn:mfn(7)})
          e1.execute({id:8,fn:mfn(8)})
          e1.execute({id:9,ungate:true,fn:mfn(9)})
          e1.execute({id:10,gate:true,fn:mfn(10)})
        },100)
      },100)
    },100)
  })


  it('errors', function (fin) {
    var e1 = executor({
      trace:true,
      timeout:100,
      stubs:timerstub
    })


    var log = []

    e1.on('error',function(err) {
      log.push('EE~'+err.message)
    })


    var MODE = {
      ok:0,
      throw:1,
      cberr:2
    }

    function mfn (mode,id,t) {
      return function(done) {
        log.push(id)

        if( MODE.throw === mode ) {
          throw new Error('AAA')
        }

        var err = MODE.cberr === mode ? new Error('BBB') : null

        if( t ) {
          setTimeout(function(){done(err,id)},t)
        }
        else done(err,id)
      }
    }

    function mcb (mode,id) {
      return function(err,out) {
        //console.log('c',id,err,out)
        log.push('c'+id+'~'+(err&&err.message)+'~'+out)

        if( MODE.throw === mode ) throw new Error('CCC')
      }
    }

    var cI = 0
    e1.on('clear', function () {
      cI++
      log.push('c'+cI)
      //console.log(cI, e1.tracelog)
      //console.log(log)

      if( 1 === cI ) {
        //console.log(log)

        expect(log).to.deep.equal(
          [ 0,
            'c0~null~0',
            1,
            'c1~gate-executor: AAA~null',
            2,
            'c2~gate-executor: BBB~2',
            3,
            'c3~null~3',
            'EE~gate-executor: CCC',
            'c1' ]
        )
        fin()
      }
    })

    // seq: 0,1
    e1.execute({id:0,fn:mfn(MODE.ok,0),cb:mcb(MODE.ok,0)})
    e1.execute({id:1,fn:mfn(MODE.throw,1),cb:mcb(MODE.ok,1)})
    e1.execute({id:2,fn:mfn(MODE.cberr,2),cb:mcb(MODE.ok,2)})
    e1.execute({id:3,fn:mfn(MODE.ok,3),cb:mcb(MODE.throw,3)})
  })

})
