import Entity from "../model/entity";

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

export default class Keyboard {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  keys = {
    [LEFT]: false,
    [RIGHT]: false,
    [DOWN]: false,
    [UP]: false
  };

  constructor() {
    window.addEventListener(
      "keyup",
      event => {
        this.onKeyup(event);
      },
      false
    );
    window.addEventListener(
      "keydown",
      event => {
        this.onKeydown(event);
      },
      false
    );
  }

  isLeftDown() {
    return this.keys[LEFT];
  }

  isRightDown() {
    return this.keys[RIGHT];
  }

  isDownDown() {
    return this.keys[DOWN];
  }

  isUpDown() {
    return this.keys[UP];
  }

  onKeydown(event: KeyboardEvent) {
    this.keys[event.keyCode] = true;
  }

  onKeyup(event: KeyboardEvent) {
    delete this.keys[event.keyCode];
  }
}
