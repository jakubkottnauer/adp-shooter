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

  moveRight() {
    this.x++;
  }

  moveLeft() {
    this.x--;
  }

  moveDown() {
    this.y++;
  }

  moveUp() {
    this.y--;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y
    }
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}
