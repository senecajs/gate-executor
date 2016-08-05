/* Copyright (c) 2014-2016 Richard Rodger, MIT License */
"use strict";

var Util   = require('util')

var Lab = require('lab')
var Code = require('code')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var expect = Code.expect

var GateExecutor = require('..')


describe('gate-executor', function(){
  it('happy', function(done) {
    var log = []

    var ge = GateExecutor()

    ge.add({fn: function aa (d) {log.push('aa'); d()}})
    ge.add({fn: function bb (d) {log.push('bb'); d()}})


    var ge2 = ge.gate()
    ge2.add({fn: function ccc (d) {log.push('ccc'); d()}})

    ge.add({fn: function dd (d) {log.push('dd'); d()}})

    ge2.add({fn: function ddd (d) {log.push('ddd'); d()}})

    expect(ge.state()).to.deep.equal([ 
      { s: 'w', ge: 1, fnn: 'aa', wid: 1 },
      { s: 'w', ge: 1, fnn: 'bb', wid: 2 },
      [ { s: 'w', ge: 2, fnn: 'ccc', wid: 1 },
        { s: 'w', ge: 2, fnn: 'ddd', wid: 2 } ],
      { s: 'w', ge: 1, fnn: 'dd', wid: 4 } ])

    ge2.clear(function () {
      expect(log).to.deep.equal(['aa', 'bb', 'ccc', 'ddd'])      
      expect(ge.state()).to.deep.equal([
        { s: 'w', ge: 1, fnn: 'dd', wid: 4 } ])
    })

    ge.clear(function () {
      expect(log).to.deep.equal(['aa', 'bb', 'ccc', 'ddd', 'dd'])      
      done()
    })

    ge.start()
  })

/*
  it('traverse', function(done) {

    var p = [
      {type:'add'}
    ]

    console.log(build(p))

    function build (path) {
      var log = []
      var ge = [GateExecutor()]
      for (var i = 0; i < path.length; i++) {
        var part = path[i]
        
        if( 'add' === part.type ) {
          ge[part.ge].add({
            fn: function (done) {
              log.push('p:'+i+';g:'+part.ge)
              done()
            }
          })
        }
        else if( 'gate' === part.type ) {
          ge[ge.length] = ge[part.ge].gate()
        }
      }

      return {
        log: log,
        ge: ge[0]
      }
    }
  })
*/
})
