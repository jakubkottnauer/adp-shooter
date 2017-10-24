export default abstract class Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  id?: number;
  sprite = new Image();

  constructor(
    sprite: string,
    x: number,
    y: number,
    width: number,
    height: number,
    id: number = 0
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite.src = sprite;
    this.id = id;
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y
    };
  }

  getDimensions() {
    return {
      width: this.width,
      height: this.height
    };
  }

  isWithinWorld(
    worldWidth: number,
    worldHeight: number,
    dx: number = 0,
    dy: number = 0
  ) {
    if (this.x + dx > worldWidth || this.y + dy + this.height > worldHeight)
      return false;
    if (this.x + dx < 0 || this.y + dy < 0) return false;
    return true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
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
    const otherPosition = other.getPosition();
    const otherDimensions = other.getDimensions();
    return (
      this.overlaps(this.x, this.width, other.x, other.width) &&
      this.overlaps(this.y, this.height, other.y, other.height)
    );
  }
}
