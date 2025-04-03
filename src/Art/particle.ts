import p5 from 'p5'

const MIN_VELOCITY = 0.05
const VELOCITY_DECAY = 0.991

export class Particle {
  p: p5
  x: number
  y: number
  r: number
  vx: number
  vy: number

  collided: boolean
  collidedSpan: number

  constructor(p: p5, x: number, y: number, r: number) {
    this.p = p
    this.x = x
    this.y = y
    this.r = r
    this.vx = (p.random() > 0.5 ? 1 : -1) * p.random(0, 20)
    this.vy = (p.random() > 0.5 ? 1 : -1) * p.random(0, 20)
    this.collided = false
    this.collidedSpan = 0
  }

  display(p: p5) {
    p.push()
    p.fill(200, 200, 200, 20)
    p.strokeWeight(0.5)
    p.stroke(100, 100, 100, 40)
    p.ellipse(this.x, this.y, this.r * 2, this.r * 2)
    p.pop()

    if (this.collided) {
      p.push()
      p.strokeWeight(50)
      p.stroke(255, 255, 0, 50)
      p.fill(255, 0, 0, 150)
      p.ellipse(this.x, this.y, (this.r + this.collidedSpan) * 2, (this.r + this.collidedSpan) * 2)
      p.pop()
    }
  }

  checkEdges(p: p5) {
    if (this.x > p.width - this.r || this.x < this.r) {
      this.vx *= -1
      this.x = Math.min(p.width - this.r, Math.max(this.r, this.x))
    }
    if (this.y > p.height - this.r || this.y < this.r) {
      this.vy *= -1
      this.y = Math.min(p.height - this.r, Math.max(this.r, this.y))
    }
  }

  collides(p: p5, particle: Particle) {
    let distance = p.dist(this.x, this.y, particle.x, particle.y)

    if (distance <= this.r + particle.r && this.vx !== 0 && this.vy !== 0) {
      return true
    }

    return false
  }

  update(p: p5) {
    this.checkEdges(p)

    this.collidedSpan = Math.max(0, (this.collidedSpan -= 0.5))

    if (this.collidedSpan === 0) {
      this.collided = false
    }

    this.vx *= VELOCITY_DECAY
    this.vy *= VELOCITY_DECAY

    this.vx = this.vx > MIN_VELOCITY || this.vx < -MIN_VELOCITY ? this.vx : 0
    this.vy = this.vy > MIN_VELOCITY || this.vy < -MIN_VELOCITY ? this.vy : 0

    this.x += this.vx
    this.y += this.vy
  }
}
