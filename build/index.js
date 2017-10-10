(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enemy_1 = require("../model/enemy");
var bird_1 = require("../model/bird");
var game_1 = require("../view/game");
var keyboard_1 = require("../model/keyboard");
var GameController = /** @class */ (function () {
    function GameController() {
        this.ticks = 0;
        this.bird = new bird_1.default(20, 20);
        this.enemies = new Array();
        this.view = new game_1.default(500, 500);
        this.keyboard = new keyboard_1.default();
        var enemy = new enemy_1.default(50, 50);
        this.enemies.push(enemy);
    }
    GameController.prototype.update = function () {
        this.ticks++;
        if (this.keyboard.isLeftDown())
            this.bird.moveLeft();
        if (this.keyboard.isRightDown())
            this.bird.moveRight();
        if (this.keyboard.isUpDown())
            this.bird.moveUp();
        if (this.keyboard.isDownDown())
            this.bird.moveDown();
        this.enemies.map(function (enemy) {
            enemy.moveRight();
        });
        this.view.render(this.enemies.concat([this.bird]));
    };
    return GameController;
}());
exports.default = GameController;

},{"../model/bird":4,"../model/enemy":5,"../model/keyboard":6,"../view/game":7}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("./controller/game");
function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    game.update();
}
var game = new game_1.default();
gameLoop();

},{"./controller/game":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entity = /** @class */ (function () {
    function Entity(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Entity.prototype.moveRight = function () {
        this.x++;
    };
    Entity.prototype.moveLeft = function () {
        this.x--;
    };
    Entity.prototype.moveDown = function () {
        this.y++;
    };
    Entity.prototype.moveUp = function () {
        this.y--;
    };
    return Entity;
}());
exports.default = Entity;

},{}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Entity_1 = require("./Entity");
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird(x, y) {
        var _this = _super.call(this, x, y, 60, 60) || this;
        _this.sprite = new Image();
        _this.sprite.src = "assets/bird.png";
        return _this;
    }
    Bird.prototype.draw = function (ctx) {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    };
    return Bird;
}(Entity_1.default));
exports.default = Bird;

},{"./Entity":3}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Entity_1 = require("./Entity");
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(x, y) {
        var _this = _super.call(this, x, y, 60, 60) || this;
        _this.sprite = new Image();
        _this.sprite.src = "assets/pig.png";
        return _this;
    }
    Enemy.prototype.draw = function (ctx) {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    };
    return Enemy;
}(Entity_1.default));
exports.default = Enemy;

},{"./Entity":3}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var Keyboard = /** @class */ (function () {
    function Keyboard() {
        var _this = this;
        this.keys = (_a = {},
            _a[LEFT] = false,
            _a[RIGHT] = false,
            _a[DOWN] = false,
            _a[UP] = false,
            _a);
        window.addEventListener("keyup", function (event) {
            _this.onKeyup(event);
        }, false);
        window.addEventListener("keydown", function (event) {
            _this.onKeydown(event);
        }, false);
        var _a;
    }
    Keyboard.prototype.isLeftDown = function () {
        return this.keys[LEFT];
    };
    Keyboard.prototype.isRightDown = function () {
        return this.keys[RIGHT];
    };
    Keyboard.prototype.isDownDown = function () {
        return this.keys[DOWN];
    };
    Keyboard.prototype.isUpDown = function () {
        return this.keys[UP];
    };
    Keyboard.prototype.onKeydown = function (event) {
        this.keys[event.keyCode] = true;
    };
    Keyboard.prototype.onKeyup = function (event) {
        delete this.keys[event.keyCode];
    };
    return Keyboard;
}());
exports.default = Keyboard;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameView = /** @class */ (function () {
    function GameView(width, height) {
        var canvas = document.getElementById("canvas");
        this.context = canvas.getContext("2d");
        this.width = width;
        this.height = height;
    }
    GameView.prototype.render = function (entities) {
        var _this = this;
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillStyle = "#000";
        entities.forEach(function (entity) { return entity.draw(_this.context); });
    };
    return GameView;
}());
exports.default = GameView;

},{}]},{},[2]);
