const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const SPACE = 32;
const SHIFT = 16;
const CTRL = 17;
const LKEY = 76;
const KKEY = 75;

export default class Keyboard {
  private keys = {
    [LEFT]: false,
    [RIGHT]: false,
    [DOWN]: false,
    [UP]: false,
    [SPACE]: false,
    [SHIFT]: false,
    [CTRL]: false,
    [LKEY]: false,
    [KKEY]: false
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

  isShiftDown() {
    return this.keys[SHIFT];
  }

  isControlDown() {
    return this.keys[CTRL];
  }

  isLKeyDown() {
    return this.keys[LKEY];
  }

  isKKeyDown() {
    return this.keys[KKEY];
  }

  private onKeydown(event: KeyboardEvent) {
    this.keys[event.keyCode] = true;
    this.keyDownHandler();
  }

  private onKeyup(event: KeyboardEvent) {
    delete this.keys[event.keyCode];
  }
}
