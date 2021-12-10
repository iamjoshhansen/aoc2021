export interface PointLike {
  x: number;
  y: number;
}

const π = Math.PI;
const π2 = π * 2;
const πh = π / 2;

export class Point implements PointLike {
  public x: number;
  public y: number;

  static get center() {
    return new Point(0, 0);
  }

  constructor(x: number | PointLike = 0, y = 0) {
    if (typeof x === 'number') {
      this.x = x;
      this.y = y;
    } else {
      this.x = x.x;
      this.y = x.y;
    }
  }

  static distance(a: PointLike, b: PointLike = { x: 0, y: 0 }) {
    const x = a.x - b.x;
    const y = a.y - b.y;
    return Math.sqrt(x * x + y * y);
  }

  static manhattenDistance(a: PointLike, b: PointLike = { x: 0, y: 0 }) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  set(coords: PointLike) {
    this.x = coords.x;
    this.y = coords.y;
    return this;
  }

  distanceTo(point: PointLike) {
    return Point.distance(this, point);
  }

  manhattenDistanceTo(point: PointLike) {
    return Point.manhattenDistance(this, point);
  }

  move(vector: PointLike | number, y?: number) {
    if (typeof vector === 'number') {
      this.x += vector;
      this.y += y || 0;
    } else {
      this.x += vector.x;
      this.y += vector.y;
    }
    return this;
  }

  rotateAroundPoint(point: PointLike, angle: number) {
    const vector = new Vector(this, point);
    const newVector = vector.clone().rotate(angle);
    this.move(newVector.delta(vector));
    return this;
  }

  moveToward(point: PointLike, amount: number) {
    const dist = this.distanceTo(point);
    if (dist === 0) {
      return this;
    }

    const dx = point.x - this.x;
    const dy = point.y - this.y;
    const mult = amount * (1 / dist);
    this.x += dx * mult;
    this.y += dy * mult;

    return this;
  }

  mirrorPoint(point: PointLike) {
    const xDelta = point.x - this.x;
    const yDelta = point.y - this.y;
    return new Point(point.x + xDelta, point.y + yDelta);
  }

  clone() {
    return new Point(this);
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  draw(
    ctx: CanvasRenderingContext2D,
    radius = 10,
    color: string | CanvasGradient = '#00000099'
  ) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, π * 2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
}

export class Vector {
  public x!: number;
  public y!: number;

  static getPointLikeFromArgs(
    vector: number | PointLike,
    y?: number
  ): PointLike {
    return typeof vector === 'object' ? vector : { x: vector, y: y || 0 };
  }

  static get Up() {
    return new Vector(0, -1);
  }
  static get Down() {
    return new Vector(0, 1);
  }
  static get Left() {
    return new Vector(-1, 0);
  }
  static get Right() {
    return new Vector(1, 0);
  }

  constructor(x: number | PointLike = 0, y?: number | PointLike) {
    if (typeof x === 'object' && typeof y === 'object') {
      this.set(y.x - x.x, y.y - x.y);
    } else if (
      typeof x === 'object' &&
      typeof x.x === 'number' &&
      typeof x.y === 'number'
    ) {
      this.set(x.x, x.y);
    } else if (typeof y === 'undefined') {
      const a = x as number;
      switch (a) {
        case 0:
          this.set(1, 0);
          break;
        case π / 2:
          this.set(0, 1);
          break;
        case π:
          this.set(-1, 0);
          break;
        case (3 * π) / 2:
        case -π / 2:
          this.set(0, -1);
          break;
        default:
          this.set(
            Math.cos(a), // Math.round(Math.cos(a) * 100000) / 100000,
            Math.sin(a) // Math.round(Math.sin(a) * 100000) / 100000,
          );
      }
    } else if (typeof x === 'number' && typeof y === 'number') {
      this.set(x, y);
    }
  }

  set(coords: number | PointLike, y?: number): this {
    if (typeof coords === 'object') {
      this.x = coords.x;
      this.y = coords.y;
      return this;
    }

    this.x = coords;
    this.y = y || 0;
    return this;
  }

  normalize(magnitude = 1): this {
    const dist = Point.distance(this);
    if (Math.abs(dist) > 0) {
      const mult = magnitude * (1 / dist);
      this.x *= mult;
      this.y *= mult;
    }
    return this;
  }

  invert(): this {
    return this.multiply(-1);
  }

  multiply(scale: number): this {
    this.x *= scale;
    this.y *= scale;
    return this;
  }

  get angle(): number {
    return Math.atan2(this.y, this.x);
  }

  set angle(a: number) {
    this.rotate(a - this.angle);
  }

  get magnitude(): number {
    return Point.distance(this);
  }

  set magnitude(val: number) {
    this.normalize(val);
  }

  rotate(angle: number) {
    const mag = this.magnitude;
    let a = this.angle + angle;
    let v = new Vector(a).normalize(mag);
    this.set(v);
    return this;
  }

  clone() {
    return new Vector(this);
  }

  add(xOrPointLike: number | PointLike, y?: number) {
    const vector = Vector.getPointLikeFromArgs(xOrPointLike, y);

    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  subtract(xOrPointLike: number | PointLike, y?: number) {
    const vector = Vector.getPointLikeFromArgs(xOrPointLike, y);

    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  dotProduct(xOrPointLike: number | PointLike, y?: number) {
    const b = Vector.getPointLikeFromArgs(xOrPointLike, y);

    const na = this.clone().normalize();
    const nb = new Vector(b).normalize();
    return na.x * nb.x + na.y * nb.y;
  }

  delta(vector: PointLike) {
    return new Vector(vector.x - this.x, vector.y - this.y);
  }

  limit(magnitude: number) {
    if (this.magnitude > magnitude) {
      this.magnitude = magnitude;
    }
    return this;
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
    };
  }
}

export class Pointer {
  readonly center: Point;
  readonly rotation: Vector;

  relativeAngleToMouse = 0;

  constructor({
    center = new Point(),
    vector = new Vector(),
  }: {
    center?: PointLike;
    vector?: PointLike;
  }) {
    this.center = new Point(center);
    this.rotation = new Vector(vector);
  }

  relativeAngleTo(point: PointLike): number {
    const relativeAngle =
      new Vector({
        x: point.x - this.center.x,
        y: point.y - this.center.y,
      }).angle - this.rotation.angle;

    const d = (relativeAngle + π2) % π2;
    return ((d + π) % π2) - π;
  }

  lookAt(point: PointLike, rotationLimit = π) {
    const relativeAngle = this.relativeAngleTo(point);
    const amount = Math.min(rotationLimit, Math.abs(relativeAngle));
    this.rotation.rotate(relativeAngle > 0 ? amount : -amount);
  }
}
