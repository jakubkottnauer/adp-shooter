import GameController from "./controller/game";

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  game.update();
}

const game = new GameController();

gameLoop();
