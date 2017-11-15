import Entity from "../model/entities/entity";
import ModelInterface from "../model/modelInterface";
import Observer from "../observer/observer";
import State from "../gameStates";
import Drawer from "./drawer";
import BirdState from "../model/entities/bird/birdStates";

export default class GameView implements Observer {
  private context: CanvasRenderingContext2D;
  private dimensions: [number, number];
  private model: ModelInterface;

  constructor(model: ModelInterface) {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.context = canvas.getContext("2d");
    this.dimensions = model.worldDimensions;
    this.model = model;
  }

  private render(
    state: State,
    score: number,
    entities: Array<Entity>,
    birdState: BirdState,
    realismState: boolean
  ) {
    const [width, height] = this.dimensions;
    this.context.clearRect(0, 0, width, height);
    this.context.fillStyle = "#000";
    this.context.strokeRect(0, 0, width, height);

    const drawer = new Drawer();

    if (state === State.Playing) {
      entities.forEach(entity => drawer.render(this.context, entity));
      this.context.font = "15px Arial";
      this.context.fillText("Shooting mode: " + (birdState + 1), 10, 50);
      this.context.fillText("Is realistic: " + realismState, 10, 70);
      this.context.fillText("Score: " + score, 10, 90);
    } else {
      this.context.font = "30px Arial";
      this.context.fillText("YOU WON!", 10, 50);
    }
  }

  notify() {
    this.render(
      this.model.state,
      this.model.score,
      this.model.entities,
      this.model.birdState,
      this.model.realismState
    );
  }
}
