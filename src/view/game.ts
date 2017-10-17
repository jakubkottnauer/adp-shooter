import Entity from "../model/entities/entity";
import Model from "../model/model";
import Observer from "../observer/observer";

export default class GameView implements Observer {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  model: Model;

  constructor(model: Model) {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.context = canvas.getContext("2d");
    const dimensions = model.getWorldDimensions()
    this.width = dimensions.width;
    this.height = dimensions.height;
    this.model = model;
  }

  private render(entities: Array<Entity>) {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = "#000";
    entities.forEach(entity => entity.draw(this.context));
  }

  notify() {
    this.render(this.model.getEntities());
  }
}
