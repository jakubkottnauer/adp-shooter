import config from "./config"
import GameController from "./controller/game";
import AbstractFactory from "./factory/abstractFactory";
import RealisticFactory from "./factory/realisticFactory";
import SimpleFactory from "./factory/simpleFactory";
import Model from "./model/model";
import ModelProxy from "./model/modelProxy";
import View from "./view/game";

enum Mode {
  Simple,
  Realistic
}

const GAME_MODE: Mode = Mode.Realistic;

const factory = GAME_MODE === 0 ? new SimpleFactory() : new RealisticFactory()
const model = new ModelProxy(new Model(config.worldWidth, config.worldHeight, factory));
const view = new View(model);
const game = new GameController(model);
model.subscribe(view);

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  model.update();
}

gameLoop();
