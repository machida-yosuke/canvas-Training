(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ONECOLOR = [0x9e60e5, 0x7f6aff, 0xff4280, 0x36f9bf, 0x92b8e7];
var DECELERATION = 0.98;

var AppFireball = function () {
  function AppFireball(canvas_id) {
    _classCallCheck(this, AppFireball);

    this.stage = new PIXI.Container();
    this.renderer = new PIXI.WebGLRenderer({
      view: canvas_id,
      clearBeforeRender: false,
      preserveDrawingBuffer: true,
      resolution: 2,
      antialias: true
    });

    this.fire_container = new PIXI.Container();

    this.background = new PIXI.Graphics();
    this.background.drawRect(0, 0, 9999, 9999);
    this.background.beginFill(0x000000);
    this.background.alpha = 0.08;

    this.stage.addChild(this.fire_container, this.background);

    this.fireballs = [];
    this.initHandler();
  }

  _createClass(AppFireball, [{
    key: "initHandler",
    value: function initHandler() {
      var _this = this;

      var ticker = PIXI.ticker.shared;
      ticker.add(function (time) {
        _this.renderer.render(_this.stage);
      });

      var handleClick = function handleClick() {
        var color = ONECOLOR[Math.floor(Math.random() * ONECOLOR.length)];

        if (Math.random() > 0.5) {
          new HanabiOnecolor(_this.fire_container, window.innerWidth * Math.random(), window.innerHeight * Math.random(), color);
        } else {
          new HanabiColorful(_this.fire_container, window.innerWidth * Math.random(), window.innerHeight * Math.random());
        }
      };
      window.addEventListener("click", handleClick);
      var pixiResize = function pixiResize() {
        var width_size = window.innerWidth;
        var height_size = window.innerHeight;
        _this.renderer.resize(width_size, height_size);
      };
      window.addEventListener("resize", pixiResize);
    }
  }]);

  return AppFireball;
}();

var HanabiOnecolor = function () {
  function HanabiOnecolor(container, position_x, position_y, color) {
    _classCallCheck(this, HanabiOnecolor);

    this.container = container;
    this.fireballs = [];
    this.steps = 400;
    this.diffusion = 3;
    this.life = 80;
    this.color = color;
    this.size = 5 * Math.random();

    for (var i = 0; i < this.steps; i++) {
      var fireball = new PIXI.Graphics();
      fireball.beginFill(this.color);
      fireball.x = position_x;
      fireball.y = position_y;
      fireball.drawCircle(0, 0, this.size);
      fireball.blendMode = PIXI.BLEND_MODES.ADD;

      this.angle = i * (360 / this.steps);
      this.radian = this.angle * Math.PI / 180;

      fireball.vx = this.diffusion * Math.sin(this.radian) * Math.random();
      fireball.vy = this.diffusion * Math.cos(this.radian) * Math.random();

      fireball.life = this.life;
      this.fireballs.push(fireball);
      this.container.addChild(fireball);
    }

    this.initHandler();
  }

  _createClass(HanabiOnecolor, [{
    key: "updateParticles",
    value: function updateParticles() {
      for (var i = 0; i < this.fireballs.length; i++) {
        var fireball = this.fireballs[i];
        fireball.vx *= 0.98;
        fireball.vy *= 0.98;

        fireball.position.x += fireball.vx;
        fireball.position.y += fireball.vy;

        var scale = fireball.life / this.life;
        fireball.scaleX = fireball.scaleY = scale;
        fireball.alpha = scale;
        fireball.life -= 1;

        if (fireball.life <= 0) {
          this.container.removeChild(fireball);
          this.fireballs.splice(i, 1);
          i--;
        }
      }
    }
  }, {
    key: "initHandler",
    value: function initHandler() {
      var _this2 = this;

      var ticker = PIXI.ticker.shared;
      ticker.add(function (time) {
        _this2.updateParticles();
      });
    }
  }]);

  return HanabiOnecolor;
}();

var HanabiColorful = function () {
  function HanabiColorful(container, position_x, position_y) {
    _classCallCheck(this, HanabiColorful);

    this.container = container;
    this.fireballs = [];
    this.steps = 400;
    this.diffusion = 2;
    this.life = 100;
    this.size = 5 * Math.random();
    this.colourful = [0x9e60e5, 0x7f6aff, 0xff4280, 0x36f9bf, 0x92b8e7];

    for (var i = 0; i < this.steps; i++) {
      var fireball = new PIXI.Graphics();
      fireball.beginFill(this.colourful[Math.floor(Math.random() * this.colourful.length)]);
      fireball.x = position_x;
      fireball.y = position_y;
      fireball.drawCircle(0, 0, this.size);
      fireball.blendMode = PIXI.BLEND_MODES.ADD;

      this.angle = i * (360 / this.steps);
      this.radian = this.angle * Math.PI / 180;

      fireball.vx = this.diffusion * Math.sin(this.radian) * Math.random();
      fireball.vy = this.diffusion * Math.cos(this.radian) * Math.random();

      fireball.life = this.life;
      this.fireballs.push(fireball);
      this.container.addChild(fireball);
    }

    this.initHandler();
  }

  _createClass(HanabiColorful, [{
    key: "updateParticles",
    value: function updateParticles() {

      for (var i = 0; i < this.fireballs.length; i++) {
        var fireball = this.fireballs[i];
        fireball.vy += 0.03;

        fireball.vx *= DECELERATION;
        fireball.vy *= DECELERATION;

        fireball.position.x += fireball.vx;
        fireball.position.y += fireball.vy;

        var scale = fireball.life / this.life;
        fireball.scaleX = fireball.scaleY = scale;
        fireball.alpha = scale;
        fireball.life -= 1;

        if (fireball.life <= 0) {
          this.container.removeChild(fireball);
          this.fireballs.splice(i, 1);
          i--;
        }
      }
    }
  }, {
    key: "initHandler",
    value: function initHandler() {
      var _this3 = this;

      var ticker = PIXI.ticker.shared;
      ticker.add(function (time) {
        _this3.updateParticles();
      });
    }
  }]);

  return HanabiColorful;
}();

window.onload = function () {
  var fire = new AppFireball(document.getElementById("ics-tutorial__canvas"));
};

},{}],2:[function(require,module,exports){
"use strict";

require("./lib/firework01_pixi.js");

//window.addEventListener("resize", canvasResize);
function canvasResize() {
  var ics_tutorial = document.getElementById("ics-tutorial__canvas");
  ics_tutorial.setAttribute("width", window.innerWidth);
  ics_tutorial.setAttribute("height", window.innerHeight);
} // import "./lib/ics-basics.js"
// import "./lib/particle.js"
// import "./lib/firework01.js"
// import "./lib/firework01_class.js"

canvasResize();

},{"./lib/firework01_pixi.js":1}]},{},[2]);
