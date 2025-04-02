import p5 from 'p5'

export class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export class Rect {
  x: number
  y: number
  w: number
  h: number

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  contains(point: Point) {
    if (
      point.x >= this.x - this.w &&
      point.x < this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y < this.y + this.h
    ) {
      return true
    }

    return false
  }

  intersects(boundary: Rect) {
    let boundaryR = boundary.x + boundary.w
    let boundaryL = boundary.x - boundary.w
    let boundaryT = boundary.y - boundary.h
    let boundaryB = boundary.y + boundary.h

    let rangeR = this.x + this.w
    let rangeL = this.x - this.w
    let rangeT = this.y - this.h
    let rangeB = this.y + this.h

    if (boundaryR >= rangeL && boundaryL <= rangeR && boundaryT <= rangeB && boundaryB >= rangeT)
      return true

    return false
  }
}

export class QuadTree {
  boundary: Rect
  capacity: number
  points: Point[]
  divided: boolean
  northEast?: QuadTree
  southEast?: QuadTree
  northWest?: QuadTree
  southWest?: QuadTree

  constructor(boundary: Rect, capacity: number) {
    this.boundary = boundary
    this.capacity = capacity
    this.points = []
    this.divided = false
  }

  insert(point: Point) {
    if (!this.boundary.contains(point)) {
      return false
    }

    if (this.points.length < this.capacity) {
      this.points.push(point)
      return true
    } else {
      if (!this.divided) {
        this.subdivide()
      }

      if (this.northEast?.insert(point)) return true
      if (this.northWest?.insert(point)) return true
      if (this.southEast?.insert(point)) return true
      if (this.southWest?.insert(point)) return true
    }

    return false
  }

  subdivide() {
    const { x, y, w, h } = this.boundary

    const northEastBound = new Rect(x + w / 2, y - h / 2, w / 2, h / 2)
    const northWestBound = new Rect(x - w / 2, y - h / 2, w / 2, h / 2)
    const southEastBound = new Rect(x + w / 2, y + h / 2, w / 2, h / 2)
    const southWestBound = new Rect(x - w / 2, y + h / 2, w / 2, h / 2)

    this.northEast = new QuadTree(northEastBound, this.capacity)
    this.northWest = new QuadTree(northWestBound, this.capacity)
    this.southEast = new QuadTree(southEastBound, this.capacity)
    this.southWest = new QuadTree(southWestBound, this.capacity)

    this.divided = true
  }

  query(range: Rect, found: Point[]) {
    if (!range.intersects(this.boundary)) return false

    for (let i = 0; i < this.points.length; i++) {
      if (range.contains(this.points[i])) {
        found.push(this.points[i])
      }

      if (this.divided) {
        this.northEast?.query(range, found)
        this.northWest?.query(range, found)
        this.southEast?.query(range, found)
        this.southWest?.query(range, found)
      }
    }

    // console.log(found)

    return found
  }

  display(p: p5) {
    p.noFill()
    p.stroke(0)
    p.rectMode(p.CENTER)
    p.rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2)

    p.push()
    p.noStroke()
    p.fill(255, 0, 0)
    for (let i = 0; i < this.points.length; i++) {
      p.ellipse(this.points[i].x, this.points[i].y, 10, 10)
    }
    p.pop()

    if (this.divided) {
      this.northEast?.display(p)
      this.northWest?.display(p)
      this.southEast?.display(p)
      this.southWest?.display(p)
    }
  }
}
