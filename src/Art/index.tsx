import { ReactP5Wrapper, Sketch } from '@p5-wrapper/react'
import { FC } from 'react'
import { ControlsProps } from '../App'
import { Point, QuadTree, Rect } from './quadTree'

// https://stackoverflow.com/questions/42437971/exporting-a-video-in-p5-js

type MySketchProps = Pick<ControlsProps, 'run' | 'showCircle' | 'circleCount' | 'circleSpacing'>

const sketch: Sketch<MySketchProps> = p => {
  const canvasH = 600
  let quadTree: QuadTree
  let boundary: Rect
  let capacity = 1
  let numberOfPoints = 1000

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
    p.createCanvas((canvasH / 4) * 3, canvasH)
    p.background(200)
    //   ===
    boundary = new Rect(p.width / 2, p.height / 2, p.width / 2, p.height / 2)
    quadTree = new QuadTree(boundary, capacity)

    p.print(quadTree)
    for (let i = 0; i < numberOfPoints; i++) {
      let pnt = new Point(p.random(p.width), p.random(p.height))
      quadTree.insert(pnt)
    }
  }

  //   draw
  //   draw

  p.draw = () => {
    p.background(200)
    let range = new Rect(p.mouseX, p.mouseY, 40, 40)
    let foundPoints: Point[] = []
    quadTree.query(range, foundPoints)

    p.push()
    p.noFill()
    p.strokeWeight(3)
    p.stroke(0)
    p.rect(range.x, range.y, range.w * 2, range.h * 2)
    p.pop()

    quadTree.display(p)
  }

  //   others
  //   others
}

const Art: FC<MySketchProps> = (props: MySketchProps) => {
  return <ReactP5Wrapper sketch={sketch} {...props} />
}

export default Art
