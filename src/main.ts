import p5, { POINTS, Vector } from 'p5'
import './style.css'

const _app = new p5(p5Instance => {
  const p = p5Instance as unknown as p5

  const pts: Vector[] = []

  type CircleProps = {
    x: number
    y: number
    d: number
  }
  const circles: CircleProps[] = []

  let collisions = 0

  //   setup
  //   setup
  //   setup
  //   setup

  p.setup = function setup() {
    p.createCanvas(600, 800)

    pts.push(p.createVector(142, 526))
    pts.push(p.createVector(201, 379))
    pts.push(p.createVector(373, 477))
  }

  //   draw
  //   draw
  //   draw
  //   draw

  p.draw = function draw() {
    p.noLoop()

    p.background('#fff29c')

    p.stroke('#301551')
    p.fill(pointInPoly(pts, p.createVector(p.mouseX, p.mouseY)) ? 'white' : 'grey')
    p.beginShape()
    pts.forEach(pt => p.vertex(pt.x, pt.y))
    p.endShape(p.CLOSE)

    const minMax = getBoundingBox()

    p.stroke('#301551')

    p.frameRate(1)

    for (let i = minMax.minX; i < minMax.maxX; i += 5) {
      for (let j = minMax.minY; j < minMax.maxY; j += 5) {
        if (pointInPoly(pts, p.createVector(i, j))) {
          const fillColor = p.random(0, 255)
          p.fill(fillColor)

          if (fillColor > 100) {
            if (circles.length === 0) {
              circles.push({ x: i, y: j, d: 10 })
              p.circle(i, j, 10)
            } else {
              let notIn = true

              circles.forEach(c => {
                if (Math.sqrt((i - c.x) ** 2 + (j - c.y) ** 2) < c.d * 0.8) {
                  notIn = false
                }
              })

              if (notIn) {
                circles.push({ x: i, y: j, d: 10 })
                p.circle(i, j, 10)
              } else {
                collisions++
              }
            }
          }
        }
      }
    }

    p.print(collisions)
  }

  //   others
  //   others
  //   others
  //   others

  function pointInPoly(verts: Vector[], pt: Vector) {
    let c = false
    for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
      if (
        verts[i].y > pt.y != verts[j].y > pt.y &&
        pt.x <
          ((verts[j].x - verts[i].x) * (pt.y - verts[i].y)) / (verts[j].y - verts[i].y) + verts[i].x
      )
        c = !c
    }
    return c
  }

  function getBoundingBox() {
    if (pts.length === 0) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 }
    }

    let minX = p.width
    let minY = p.height
    let maxX = 0
    let maxY = 0

    // Calculate the bounding box
    for (let pt of pts) {
      let { x, y } = pt

      minX = p.min(minX, x)
      minY = p.min(minY, y)
      maxX = p.max(maxX, x)
      maxY = p.max(maxY, y)
    }

    return { minX, maxX, minY, maxY }
  }
}, document.getElementById('app')!)
