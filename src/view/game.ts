import Entity from "../model/entity";

export default class GameView {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.context = canvas.getContext("2d");
    this.width = width;
    this.height = height;
  }

  render(entities: Array<Entity>) {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = "#000";
    entities.forEach(entity => entity.draw(this.context));
  }
}
