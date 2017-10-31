import Entity from "../model/entities/entity";
import Model from "../model/model";
import Observer from "../observer/observer";
import State from "../gameStates";
import Drawer from "./drawer";
import BirdState from '../model/entities/bird/birdStates';

export default class GameView implements Observer {
  private context: CanvasRenderingContext2D;
  private dimensions: [number, number];
  private model: Model;

  constructor(model: Model) {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.context = canvas.getContext("2d");
    this.dimensions = model.getWorldDimensions();
    this.model = model;
  }

  private render(state: State, entities: Array<Entity>, birdState: BirdState) {
    const [width, height] = this.dimensions;
    this.context.clearRect(0, 0, width, height);
    this.context.fillStyle = "#000";
    this.context.strokeRect(0, 0, width, height);

    const drawer = new Drawer();

    if (state === State.Playing) {
      entities.forEach(entity => drawer.render(this.context, entity));
      this.context.font = "15px Arial";
      this.context.fillText("Shooting mode: " + birdState, 10, 50);
    } else {
      this.context.font = "30px Arial";
      this.context.fillText("YOU WON!", 10, 50);
    }
  }

  notify() {
    this.render(this.model.getState(), this.model.getEntities(), this.model.birdState);
  }
}
