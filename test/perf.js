
// Unless overloaded (work items added too quickly),
// wpm should be relatively constant and independent of max size.


const GateExecutor = require('..')


let inc = 25000
let factor = 1
let iterations = 20

let max = inc

console.log('it\tmax\td\twpm\tmaxk\tdh\thst\ttmc\tw')

next(0)

function next(it) {
  if( iterations <= it) return
  
  let ge = GateExecutor()

  let log = []
  let w = 0

  let start = Date.now()
  
  for(let i = 0; i < max; i++) {
    setTimeout(()=>{
      ge.add({
        fn: function w0(done) {
          setTimeout(()=>{
            log.push(w++)
            done()
          },Math.random()*100)
        }
      })
    },Math.random()*500*(1+it))
  }

  setTimeout(()=>{
    ge.start()

    ge.clear(function fc() {
      let end = Date.now()
      log.push(-1)
      //console.log(log.slice(0,21))
      // console.log(log.slice(max-20,max))
      let d = end-start
      let s = ge.state().internal
      console.log([it,max,d,max/d,Math.floor(max/1000),d/100,s.hw_hst,s.hw_tmc,w].join('\t'))
      
      // max = Math.floor(max*factor)
      max = max+inc
      setImmediate(()=>next(++it))
    })
  },50)
}


