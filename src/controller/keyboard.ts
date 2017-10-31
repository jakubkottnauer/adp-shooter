const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const SPACE = 32;

export default class Keyboard {
  private keys = {
    [LEFT]: false,
    [RIGHT]: false,
    [DOWN]: false,
    [UP]: false,
    [SPACE]: false
  };

  private keyDownHandler = () => {};

  constructor(handler: () => void) {
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

    this.keyDownHandler = handler;
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

  isSpaceDown() {
    return this.keys[SPACE];
  }

  onKeydown(event: KeyboardEvent) {
    this.keys[event.keyCode] = true;
    this.keyDownHandler();
  }

  onKeyup(event: KeyboardEvent) {
    delete this.keys[event.keyCode];
  }
}
