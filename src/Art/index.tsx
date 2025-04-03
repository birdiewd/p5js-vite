import { ReactP5Wrapper, Sketch } from '@p5-wrapper/react'
import { FC } from 'react'
import { ControlsProps } from '../App'
import { Ellipse, Point, QuadTree, Rect } from './quadTree'
import { Particle } from './particle'

// https://stackoverflow.com/questions/42437971/exporting-a-video-in-p5-js

type MySketchProps = Pick<ControlsProps, 'run' | 'showCircle' | 'circleCount' | 'circleSpacing'>

const sketch: Sketch<MySketchProps> = p => {
  const canvasW = 900
  const canvasH = 600
  let quadTree: QuadTree
  let boundary: Rect
  let capacity = 1
  let particleCount = 1200

  let particles: Particle[] = []

  //   controls
  //   controls

  let controls: MySketchProps = {
    run: false,
    showCircle: false,
    circleCount: 1,
    circleSpacing: 10,
  }

  p.updateWithProps = (props: MySketchProps) => {
    controls = {
      ...controls,
      ...props,
    }

    if (controls.run) {
      p.loop()
    } else {
      p.noLoop()
    }
  }

  //   setup
  //   setup

  p.setup = () => {
    p.createCanvas(canvasW, canvasH)
    p.frameRate(35)
    //   ===

    for (let i = 0; i < particleCount; i++) {
      //   particles[i] = new Particle(p, p.random(p.width), p.random(p.height), 3)
      particles[i] = new Particle(p, p.width / 2, p.height / 2, 3)
    }

    boundary = new Rect(p.width / 2, p.height / 2, p.width / 2, p.height / 2)
    quadTree = new QuadTree(boundary, capacity)

    p.print(quadTree)
  }

  //   draw
  //   draw

  p.draw = () => {
    p.background(255, 255, 255, 80)

    quadTree.clear()

    for (let i = 0; i < particleCount; i++) {
      let point = new Point(particles[i].x, particles[i].y, particles[i])
      quadTree.insert(point)

      particles[i].update(p)
      particles[i].display(p)
    }

    for (let i = 0; i < particleCount; i++) {
      let range = new Ellipse(particles[i].x, particles[i].y, particles[i].r, particles[i].r)
      let foundPoints: Point[] = []
      quadTree.query(range, foundPoints)

      for (let j = 0; j < foundPoints.length; j++) {
        let particle = foundPoints[j].ref

        if (particles[i] != particle && particles[i].collides(p, particle)) {
          particles[i].collided = true
          particles[i].collidedSpan = 10
        }
      }
    }

    // let range = new Ellipse(p.mouseX, p.mouseY, 20, 80)
    // let foundPoints: Point[] = []
    // quadTree.query(range, foundPoints)

    // p.push()
    // p.noFill()
    // p.strokeWeight(3)
    // p.stroke(0)
    // p.ellipse(range.x, range.y, range.rx * 2, range.ry * 2)
    // p.pop()

    // quadTree.display(p)

    // p.push()
    // p.fill(0, 0, 255)
    // for (let i = 0; i < foundPoints.length; i++) {
    //   p.ellipse(foundPoints[i].x, foundPoints[i].y, 10, 10)
    // }
    // p.pop()

    // p.print(p.frameRate())
  }

  //   others
  //   others
}

const Art: FC<MySketchProps> = (props: MySketchProps) => {
  return <ReactP5Wrapper sketch={sketch} {...props} />
}

export default Art
