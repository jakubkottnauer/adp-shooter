export default abstract class Entity {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y
    }
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}
