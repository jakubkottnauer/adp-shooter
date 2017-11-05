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

  move(dx: number, dy: number): boolean {
    this._position = [(this.position[0] += dx), (this.position[1] += dy)];
    // TODO: Fix!
    if (!this.isWithinWorld(640, 480)) {
      this._position = [(this.position[0] -= dx), (this.position[1] -= dy)];
      return false;
    }

    return true;
  }

  get position() {
    return this._position;
  }

  get dimensions() {
    return this._dimensions;
  }

  isWithinWorld(
    worldWidth: number,
    worldHeight: number
  ) {
    const [x, y] = this.position;
    const [width, height] = this.dimensions;
    if (x > worldWidth || y + height > worldHeight) return false;
    if (x < 0 || y < 0) return false;
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
