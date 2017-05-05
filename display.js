const { atom } = require('derivable')

function wrapPreviousState (f, init) {
  let previousState = init
  return function (nextState) {
    const prev = previousState
    previousState = nextState
    return f(nextState, prev)
  }
}

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

// window dimensions
const WindowDimensions = atom({
  width: window.innerWidth,
  height: window.innerHeight,
})

const WindowHeight = atom(window.innerHeight)

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
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
})

CursorPosition.react(
  wrapPreviousState((current, previous) => {
    const context = canvas.getContext('2d')
    context.beginPath()
    context.moveTo(previous.x, previous.y)
    context.lineTo(current.x, current.y)
    context.stroke()
  }, CursorPosition.get())
)

setInterval(() => {
  CursorPosition.set({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  })
}, 200)
