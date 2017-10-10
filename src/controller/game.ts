import Enemy from "../model/enemy";
import Bird from "../model/bird";
import GameView from "../view/game";
import Keyboard from '../model/keyboard';

export default class GameController {
  ticks = 0;
  bird = new Bird(20, 20);
  enemies = new Array<Enemy>();
  view = new GameView(500, 500);
  keyboard = new Keyboard();

  constructor() {
    const enemy = new Enemy(50, 50);
    this.enemies.push(enemy);
  }

  update() {
    this.ticks++;

    if (this.keyboard.isLeftDown()) this.bird.moveLeft();
    if (this.keyboard.isRightDown()) this.bird.moveRight();
    if (this.keyboard.isUpDown()) this.bird.moveUp();
    if (this.keyboard.isDownDown()) this.bird.moveDown();

    this.enemies.map(enemy => {
      enemy.moveRight();
    });

    this.view.render([...this.enemies, this.bird]);
  }
}
