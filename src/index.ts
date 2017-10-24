import GameController from "./controller/game";
import View from "./view/game";
import Model from "./model/model";

const worldWidth = 640;
const worldHeight = 480;

const model = new Model(worldWidth, worldHeight);
const view = new View(model);
const game = new GameController(model);
model.subscribe(view);

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  model.update();
}

gameLoop();
