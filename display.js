const { atom } = require('derivable')

function wrapPreviousState (f, init) {
  let previousState = init
  return function (nextState) {
    const prev = previousState
    previousState = nextState
    return f(nextState, prev)
  }
}

const SCALE = 4
const opacity = 0.4

const canvas = document.createElement('canvas')
document.body.insertBefore(canvas, document.body.children[0])

// window dimensions
const WindowDimensions = atom({
  width: window.innerWidth,
  height: window.innerHeight,
})

window.onresize = () =>
  WindowDimensions.set({
    width: window.innerWidth,
    height: window.innerHeight,
  })

WindowDimensions.react(({ width, height }) => {
  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
})

const CursorPosition = atom({
  x: Math.round(window.innerWidth / 2),
  y: Math.round(window.innerHeight / 2),
})

CursorPosition.react(
  wrapPreviousState((current, previous) => {
    const context = canvas.getContext('2d')
    context.beginPath()
    context.moveTo(previous.x, previous.y)
    context.lineTo(current.x, current.y)
    context.strokeStyle = `rgba(0,0,0,${opacity})`
    context.lineWidth = SCALE / 2
    context.stroke()
  }, CursorPosition.get())
)

// setInterval(() => {
//   CursorPosition.set({
//     x: Math.random() * window.innerWidth,
//     y: Math.random() * window.innerHeight,
//   })
// }, 200)

require('./input').register({
  horizontalDecrement () {
    CursorPosition.swap(({ x, y }) => ({ x: x - SCALE, y }))
  },
  horizontalIncrement () {
    CursorPosition.swap(({ x, y }) => ({ x: x + SCALE, y }))
  },
  verticalDecrement () {
    CursorPosition.swap(({ x, y }) => ({ x, y: y + SCALE }))
  },
  verticalIncrement () {
    CursorPosition.swap(({ x, y }) => ({ x, y: y - SCALE }))
  },
})

// const DECAY = 200 // ms

// class Veclocity {
//   constructor () {
//     this.velocity = 0
//     this.history = []
//     this.historyLength = 0
//     this.historyOffset = -1
//   }

//   increment () {
//     const now = Date.now()

//     // remove old history
//     for (let i = 0; i < this.historyLength; i++) {
//       const { timestamp, increment } = this.history[
//         (i + this.historyOffset) % this.historyLength
//       ]
//       if (timestamp + DECAY < now) {
//         this.historyOffset
//       }
//     }
//   }

//   decrement () {}
// }
