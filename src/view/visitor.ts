import Bird from "../model/entities/bird/bird";
import Enemy from "../model/entities/enemy/enemy";
import Entity from "../model/entities/entity";
import Explosion from "../model/entities/explosion";
import Missile from "../model/entities/missile";
import Visitor from "../visitor/visitor";

export default class DrawerVisitor implements Visitor {
  public position: [number, number];
  public dimensions: [number, number];
  public sprite: HTMLImageElement;
  private images: {
    bird: HTMLImageElement;
    kill: HTMLImageElement;
    missile: HTMLImageElement;
    pig: HTMLImageElement;
  };

  constructor() {
    this.images = {
      bird: new Image(),
      kill: new Image(),
      missile: new Image(),
      pig: new Image()
    };

    this.images.missile.src = "assets/missile.png";
    this.images.kill.src = "assets/kill.png";
    this.images.pig.src = "assets/pig.png";
    this.images.bird.src = "assets/bird.png";
  }

  private setInfo(entity: Entity) {
    this.position = entity.position;
    this.dimensions = entity.dimensions;
  }

  public visitMissile(missile: Missile) {
    this.setInfo(missile);
    this.sprite = this.images.missile;
  }

  public visitBird(bird: Bird) {
    this.setInfo(bird);
    this.sprite = this.images.bird;
  }

  public visitEnemy(enemy: Enemy) {
    this.setInfo(enemy);
    this.sprite = this.images.pig;
  }

  public visitExplosion(explosion: Explosion) {
    this.setInfo(explosion);
    this.sprite = this.images.kill;
  }
}
