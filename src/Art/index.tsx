import { ReactP5Wrapper, Sketch } from '@p5-wrapper/react'
import { FC } from 'react'
import { ControlsProps } from '../App'

// https://stackoverflow.com/questions/42437971/exporting-a-video-in-p5-js

type MySketchProps = Pick<ControlsProps, 'run' | 'showCircle' | 'circleCount' | 'circleSpacing'>

const sketch: Sketch<MySketchProps> = p => {
  const canvasH = 600

  let controls: MySketchProps = {
    run: false,
    showCircle: false,
    circleCount: 1,
    circleSpacing: 10,
  }

  //   setup
  //   setup

  p.setup = () => {
    p.createCanvas((canvasH / 4) * 3, canvasH)
  }

  p.updateWithProps = (props: MySketchProps) => {
    p
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

  //   draw
  //   draw

  p.draw = () => {
    p.background(100)
    p.noFill()

    if (controls.showCircle) {
      for (let c = 0; c < controls.circleCount; c++) {
        p.stroke(p.random(200))
        p.circle(50 + c * controls.circleSpacing, 50 + c * controls.circleSpacing, 50)
      }
    }

    p.frameRate(30)
  }

  //   others
  //   others
}

const Art: FC<MySketchProps> = (props: MySketchProps) => {
  return <ReactP5Wrapper sketch={sketch} {...props} />
}

export default Art
