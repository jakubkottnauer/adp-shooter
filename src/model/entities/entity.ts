import Visitable from "../../visitor/visitable";
import Visitor from "../../visitor/visitor";

export default abstract class Entity implements Visitable {
  private _position: [number, number];
  private _dimensions: [number, number];

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    id: number = 0
  ) {
    this._position = [x, y];
    this._dimensions = [width, height];
  }

  accept(visitor: Visitor) {}

  move(dx: number, dy: number) {
    this._position = [(this.position[0] += dx), (this.position[1] += dy)];
  }

  get position() {
    return this._position;
  }

  get dimensions() {
    return this._dimensions;
  }

  isWithinWorld(
    worldWidth: number,
    worldHeight: number,
    dx: number = 0,
    dy: number = 0
  ) {
    const [x, y] = this.position;
    const [width, height] = this.dimensions;
    if (x + dx > worldWidth || y + dy + height > worldHeight) return false;
    if (x + dx < 0 || y + dy < 0) return false;
    return true;
  }

  private overlaps(
    point1: number,
    length1: number,
    point2: number,
    length2: number
  ) {
    const highestStartPoint = Math.max(point1, point2);
    const lowestEndPoint = Math.min(point1 + length1, point2 + length2);

    return highestStartPoint < lowestEndPoint;
  }

  collidesWith(other: Entity) {
    const [dx, dy] = other.position;
    const [dWidth, dHeight] = other.dimensions;
    const [x, y] = this.position;
    const [width, height] = this.dimensions;
    return (
      this.overlaps(x, width, dx, dWidth) &&
      this.overlaps(y, height, dy, dHeight)
    );
  }
}
