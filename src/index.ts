import GameController from "./controller/game";
import View from "./view/game";
import ModelProxy from "./model/modelProxy";
import Model from "./model/model";
import SimpleFactory from "./factory/simpleFactory";
import RealisticFactory from "./factory/realisticFactory";
import AbstractFactory from "./factory/abstractFactory";

enum Mode {
  Simple,
  Realistic
}

const GAME_MODE: Mode = Mode.Realistic;


const worldWidth = 640;
const worldHeight = 480;

const factory = GAME_MODE === 0 ? new SimpleFactory() : new RealisticFactory()
const model = new ModelProxy(new Model(worldWidth, worldHeight, factory));
const view = new View(model);
const game = new GameController(model);
model.subscribe(view);

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  model.update();
}

gameLoop();
