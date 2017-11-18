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

  private keyDownHandler = () => {};

  public isLeftDown() {
    return this.keys[LEFT];
  }

  public isRightDown() {
    return this.keys[RIGHT];
  }

  public isDownDown() {
    return this.keys[DOWN];
  }

  public isUpDown() {
    return this.keys[UP];
  }

  public isSpaceDown() {
    return this.keys[SPACE];
  }

  public isShiftDown() {
    return this.keys[SHIFT];
  }

  public isControlDown() {
    return this.keys[CTRL];
  }

  public isLKeyDown() {
    return this.keys[LKEY];
  }

  public isKKeyDown() {
    return this.keys[KKEY];
  }

  private onKeydown(event: KeyboardEvent): void {
    this.keys[event.keyCode] = true;
    this.keyDownHandler();
  }

  private onKeyup(event: KeyboardEvent) {
    delete this.keys[event.keyCode];
  }
}
