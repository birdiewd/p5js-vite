import p5 from 'p5'

// https://stackoverflow.com/questions/42437971/exporting-a-video-in-p5-js

const canvasH = 600

const art = () =>
  new p5(p5Instance => {
    const p = p5Instance as unknown as p5

    let particles = []
    let particleCount = 100
    let amplitude = 100
    let frequency = 0.05
    let phase = 0
    let center_y = canvasH / 2

    let minY = 0
    let maxY = 0

    //   setup
    //   setup
    //   setup
    //   setup

    p.setup = function setup() {
      p.createCanvas((canvasH / 4) * 3, canvasH)
    }

    //   draw
    //   draw
    //   draw
    //   draw

    p.draw = function draw() {
      p.background(200)

      // p.noLoop()

      // Create particles if they don't exist
      if (particles.length === 0) {
        for (let i = 0; i < particleCount; i++) {
          let x = p.map(i, 0, particleCount - 1, 0, p.width)
          let y = amplitude * p.sin(frequency * x + phase) + center_y
          particles.push({ x: x, y: y, o: 0 })
        }
      }

      p.noStroke()
      // Draw the particles
      for (let i = 0; i < particles.length; i++) {
        minY = p.min(minY, particles[i].y)
        maxY = p.max(maxY, particles[i].y)

        p.fill(255, 255, 255, particles[i].o)

        p.ellipse(particles[i].x, particles[i].y, 10, 10)
      }

      // Update particle positions for animation
      for (let i = 0; i < particles.length; i++) {
        let x = p.map(i, 0, particleCount - 1, 0, p.width)
        let y = amplitude * p.sin(frequency * x + phase) + center_y
        particles[i].y = y

        particles[i].o = p.abs(255 - p.map(y, 0, 200, 0, 512, true))
      }

      // Update phase for animation
      phase += 0.02
    }

    //   others
    //   others
    //   others
    //   others
  }, document.getElementById('art')!)

export default art
