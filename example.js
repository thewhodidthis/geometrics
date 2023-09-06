import { rose as lookup } from "./main.js"

const target = document.querySelector("canvas").getContext("2d", { alpha: false })
const { width, height } = target.canvas

// These effectively reset the context and should come before any drawing code.
target.canvas.height = height * self.devicePixelRatio
target.canvas.width = width * self.devicePixelRatio

// Scale the context to ensure correct drawing operations.
target.scale(self.devicePixelRatio, self.devicePixelRatio)

// Set the "drawn" size of the canvas.
const [sheet] = document.styleSheets

sheet.insertRule(`canvas { height: ${height}px; width: ${width}px; }`, sheet.cssRules.length)

target.strokeStyle = "#888"
target.lineWidth = 1.5

const step = { x: width / 4, y: height / 3 }
const cell = { x: step.x * 0.5, y: step.y * 0.5 }
const size = cell.y * 0.75

const grid = (_, i) => ({ x: i % 4, y: Math.floor(i / 4) })

Array.from({ length: 4 * 3 }).map(grid).forEach((v) => {
  const x = (v.x * step.x) + cell.x
  const y = (v.y * step.y) + cell.y

  const g = 1 + v.x
  const n = 5 + (2 * (v.y - 2))
  const d = g === n ? 5 : g

  target.save()
  target.translate(x, y)
  target.beginPath()

  lookup(size, n, d).forEach((p) => {
    target.lineTo(p.x, p.y)
  })

  target.closePath()
  target.stroke()
  target.restore()
})
