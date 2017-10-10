import Entity from "./Entity";

export default class Enemy extends Entity {

  sprite = new Image();

  constructor(x: number, y: number) {
    super(x, y, 60, 60);
    this.sprite.src = "assets/pig.png";
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
}
