import Enemy from "./enemy";
import Visitor from "../../../visitor/visitor";

export default class JumpingEnemy extends Enemy {
  private _originalPosition: [number, number];
  private _dy = -1;
  constructor(x: number, y: number) {
    super(x, y);
    this._originalPosition = [x, y];
  }

  move() {
    const [curX, curY] = this.position;
    const [origX, origY] = this._originalPosition;

    if (curY - origY > 100) {
      this._dy = -1;
    } else if (curY - origY <= 0) {
      this._dy = 1;
    }
     return super.move(0, this._dy);
  }
}
