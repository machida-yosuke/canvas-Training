(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// window.addEventListener("load", firework01);
//
// function firework01() {
//   const cjs = createjs;
//   const stage = new cjs.Stage("ics-tutorial__canvas");
//
//   const fire_container = new cjs.Container();
//
//   fire_container.x = 0;
//   fire_container.y = 0;
//
//   stage.addChild(fire_container);
//
//   cjs.Ticker.addEventListener("tick", stage);
//
//   cjs.Ticker.timingMode = cjs.Ticker.RAF;
//   window.addEventListener("click", handleClick);
//   cjs.Ticker.addEventListener("tick", updateParticles);
//   function handleClick() {
//     emitParticles();
//   }
//
//   const fireballs = [];
//   const steps = 300;
//   const diffusion = 3;
//   const life = 100;
//
//   function emitParticles() {
//     for (let i = 0; i < steps; i++) {
//       const size = 10 * Math.random();
//       const fireball = new cjs.Shape();
//       fireball.graphics
//         .beginFill("#fff")
//         .drawCircle(0, 0, size);
//       const angle = i * (360 / steps);
//       const radian = angle * Math.PI / 180;
//       fireball.x = stage.mouseX;
//       fireball.y = stage.mouseY;
//       fireball.vx = diffusion * Math.sin(radian) * Math.random();
//       fireball.vy = diffusion * Math.cos(radian) * Math.random();
//
//       fireball.life = life;
//       fireballs.push(fireball);
//
//       fire_container.addChild(fireball);
//     }
//   }
//
//   function updateParticles() {
//     for (var i = 0; i < fireballs.length; i++) {
//
//       const fireball = fireballs[i];
//
//       fireball.vx *= 0.98;
//       fireball.vy *= 0.98;
//
//       fireball.x += fireball.vx;
//       fireball.y += fireball.vy;
//
//       const scale = fireball.life / life;
//       fireball.scaleX = fireball.scaleY = scale;
//       fireball.alpha = scale;
//       fireball.life -= 1;
//
//       if (fireball.life <= 0) {
//         fire_container.removeChild(fireball);
//         fireballs.splice(i, 1);
//         i--;
//       }
//     }
//   }
// }
"use strict";

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cjs = createjs;

var App_Fireball = function () {
  function App_Fireball(canvas_id) {
    _classCallCheck(this, App_Fireball);

    this.stage = new cjs.Stage(canvas_id);
    this.fireballs = [];
    this.fire_container = new cjs.Container();
    this.fire_container.x = 0;
    this.fire_container.y = 0;
    this.stage.addChild(this.fire_container);
    this.initHandler();
    this.colors = ["#9e60e5", "#7f6aff", "#ff4280", "#36f9bf", "#92b8e7"];
  }

  _createClass(App_Fireball, [{
    key: "initHandler",
    value: function initHandler() {
      var _this = this;

      cjs.Ticker.addEventListener("tick", this.stage);
      cjs.Ticker.timingMode = cjs.Ticker.RAF;
      var handleClick = function handleClick() {
        var color = _this.colors[Math.floor(Math.random() * (_this.colors.length - 1))];
        new Hanabi(_this.fire_container, _this.stage.mouseX, _this.stage.mouseY, color);
      };
      window.addEventListener("click", handleClick);
    }
  }]);

  return App_Fireball;
}();

var Hanabi = function () {
  function Hanabi(stage, x, y, color) {
    _classCallCheck(this, Hanabi);

    this.stage = stage;
    this.fireballs = [];
    this.steps = 300;
    this.diffusion = 3;
    this.life = 100;
    this.color = color;
    this.size = 5 * Math.random();
    for (var i = 0; i < this.steps; i++) {
      var fireball = new cjs.Shape();
      fireball.x = x;
      fireball.y = y;

      fireball.graphics.beginFill(this.color).drawCircle(0, 0, this.size);
      fireball.compositeOperation = "screen";

      this.angle = i * (360 / this.steps);
      this.radian = this.angle * Math.PI / 180;

      fireball.vx = this.diffusion * Math.sin(this.radian) * Math.random();
      fireball.vy = this.diffusion * Math.cos(this.radian) * Math.random();

      fireball.life = this.life;
      this.fireballs.push(fireball);
      this.stage.addChild(fireball);
    }

    this.initHandler();
  }

  _createClass(Hanabi, [{
    key: "updateParticles",
    value: function updateParticles() {
      for (var i = 0; i < this.fireballs.length; i++) {
        var fireball = this.fireballs[i];

        fireball.vx *= 0.98;
        fireball.vy *= 0.98;

        fireball.x += fireball.vx;
        fireball.y += fireball.vy;

        var scale = fireball.life / this.life;
        fireball.scaleX = fireball.scaleY = scale;
        fireball.alpha = scale;
        fireball.life -= 1;

        if (fireball.life <= 0) {
          this.stage.removeChild(fireball);
          this.fireballs.splice(i, 1);
          i--;
        }
      }
    }
  }, {
    key: "initHandler",
    value: function initHandler() {
      var _this2 = this;

      cjs.Ticker.addEventListener("tick", function () {
        _this2.updateParticles();
      });
    }
  }]);

  return Hanabi;
}();

window.onload = function () {
  var Fire = new App_Fireball("ics-tutorial__canvas");
};

},{}],3:[function(require,module,exports){
"use strict";

//window.addEventListener("load", basics);
//window.addEventListener("load", button);
//window.addEventListener("load", ship);
//window.addEventListener("load", time_watch_digital)
//window.addEventListener("load", time_watch_analog)

function basics() {
  var stage = new createjs.Stage("ics-tutorial__canvas");
  var shape = new createjs.Shape();
  var shape_container = new createjs.Container();
  shape_container.x = 0;
  shape_container.y = 0;
  shape_container.addChild(shape);

  shape.graphics.beginLinearGradientFill(["#6CBAD8", "#DB7BB1"], [0, 1], 90, 0, 0, 100).beginStroke("#fff").setStrokeStyle(2).drawCircle(0, 0, 50);
  shape.graphics.beginLinearGradientFill(["#DB7BB1", "#FBE481"], [0, 1], 90, 150, 0, 100).beginStroke("#fff").setStrokeStyle(2).drawRoundRect(0, 0, 100, 100, 20, 20);
  shape.graphics.beginLinearGradientFill(["#FBE481", "#6CBAD8"], [0, 1], 90, 200, 0, 100).beginStroke("#fff").setStrokeStyle(2).drawCircle(210, 0, 50);
  shape.graphics.drawPolyStar(50, 200, 100, 5, 0.5, 50).beginLinearGradientFill(["#DB7BB1", "#6CBAD8"], [0, 1], 90, 200, 0, 100);
  shape.graphics.moveTo(0, 400).lineTo(500, 0).lineTo(0, 500);
  shape.alpha = 1;
  shape.scaleX = 1;
  shape.scaleY = 1;
  shape.visible = false;
  shape.x = 55;
  shape.y = 55;

  var img = new createjs.Bitmap("./images/benjomeshi_boy.png");
  img.regX = 100;
  img.regY = 100;
  img.visible = false;

  var text = new createjs.Text("", "90px Arial", "#DB7BB1");
  text.text = "text";
  text.textAlign = "center";
  text.x = 200;
  text.textBaseline = "top";
  text.visible = false;

  var circle_container = new createjs.Container();
  for (var i = 0; i < 10; i++) {
    var ball = new createjs.Shape();
    ball.graphics.beginFill("#000").drawCircle(0, 0, 50);
    ball.x = 200 * Math.sin(i * 360 / 10 * Math.PI / 180);
    ball.y = 200 * Math.cos(i * 360 / 10 * Math.PI / 180);
    circle_container.addChild(ball);
  }
  circle_container.visible = false;
  stage.addChild(text, img, shape_container, circle_container);

  if (createjs.Touch.isSupported() == true) {
    createjs.Touch.enable(stage);
    createjs.Touch.allowDefault = false;
  }
  stage.enableMouseOver();

  //描画の更新と動き
  createjs.Ticker.addEventListener("tick", stage);
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  img.addEventListener("click", handleClick);
  img.addEventListener("pressmove", handleMouseMove);
  img.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("keydown", handleMouseKeyDown);

  var mx = void 0;
  var my = void 0;

  var dragPointX = void 0;
  var dragPointY = void 0;

  function handleTick() {
    mx = stage.mouseX;
    my = stage.mouseY;
    circle_container.x = mx;
    circle_container.y = my;

    circle_container.rotation += 1;
    shape_container.x += 0;
    if (shape_container.x > 500) {
      shape_container.x = 0;
    }
  }

  function handleClick(ev) {
    console.log(ev);
  }

  function handleMouseDown(event) {
    dragPointX = mx - img.x;
    dragPointY = my - img.y;
    console.log(dragPointY);
  }

  function handleMouseMove(event) {
    img.x = mx - dragPointX;
    img.y = my - dragPointY;
    //console.log(img.y );
  }

  function handleMouseKeyDown(event) {
    var key = event.keyCode;
    if (key === 16) {
      text.y -= 1;
    }
    if (key === 40) {
      text.y += 1;
    }
    if (key === 37) {
      text.x -= 1;
    }
    if (key === 39) {
      text.x += 1;
    }
    console.log("押したボタン:" + key);
  }
}

function button() {
  var stage = new createjs.Stage("ics-tutorial__canvas");

  var button_container = new createjs.Container();

  var button_text = new createjs.Text("aaa", "25px futura", "#DB7BB1");
  button_text.text = "button";

  var button_wrapper = new createjs.Shape();
  button_wrapper.graphics.beginFill("#fff").setStrokeStyle(2).beginStroke("#6CBAD8").drawRoundRect(-65, 0, 200, 40, 10, 10);

  button_container.addChild(button_wrapper, button_text);
  button_container.x = 100;
  stage.addChild(button_container);
  stage.enableMouseOver();
  createjs.Ticker.addEventListener("tick", stage);
  button_container.addEventListener("mouseover", handleOver);
  button_container.addEventListener("mouseout", handleOut);
  button_container.addEventListener("click", handleClick);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;

  function handleOver(ev) {
    button_wrapper.graphics.clear().beginFill("#DB7BB1").setStrokeStyle(2).beginStroke("#6CBAD8").drawRoundRect(-65, 0, 200, 40, 10, 10);
  }

  function handleOut(ev) {
    button_wrapper.graphics.clear().beginFill("#fff").setStrokeStyle(2).beginStroke("#6CBAD8").drawRoundRect(-65, 0, 200, 40, 10, 10);
  }

  function handleClick(ev) {
    console.log("aaa");
  }
}

function ship() {
  var stage = new createjs.Stage("ics-tutorial__canvas");
  var ship = new createjs.Shape();

  ship.graphics.beginFill("DarkRed").moveTo(-10, 5).lineTo(-10, -5).lineTo(5, 0);
  ship.x = stage.canvas.width / 2;
  ship.y = stage.canvas.height / 2;

  var stars = [];

  for (var i = 0; i < 10; i++) {
    var star = new createjs.Shape();
    star.graphics.beginFill("#000").drawPolyStar(0, 0, 75, 5, 0.6, -90);
    star.x = 500 * Math.random();
    star.y = 500 * Math.random();

    stars[i] = star;
    stage.addChild(star);
  }

  stage.addChild(ship);
  createjs.Ticker.addEventListener("tick", stage);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
  createjs.Ticker.addEventListener("tick", handleShipMove);
  var isPressup = false;
  var isPressdown = false;
  var isPressright = false;
  var isPressleft = false;

  var angle = 0;
  var speed = 0;

  function handleKeydown(event) {
    var key = event.keyCode;
    console.log(key);
    if (key === 38) {
      //上
      isPressup = true;
      ship.rotation = -90;
    }
    if (key === 40) {
      //下
      isPressdown = true;
      ship.rotation = 90;
    }
    if (key === 37) {
      //左
      isPressleft = true;
      ship.rotation = 180;
    }
    if (key === 39) {
      //右
      isPressright = true;
      ship.rotation = 0;
    }
  }

  function handleKeyup(event) {
    var key = event.keyCode;
    console.log(key);
    if (key === 38) {
      isPressup = false;
    }
    if (key === 40) {
      isPressdown = false;
    }
    if (key === 37) {
      isPressleft = false;
    }
    if (key === 39) {
      isPressright = false;
    }
  }

  function handleShipMove() {
    if (isPressup === true) {
      ship.y -= 1;
    }
    if (isPressdown === true) {
      ship.y += 1;
    }
    if (isPressleft === true) {
      ship.x -= 1;
    }
    if (isPressright === true) {
      ship.x += 1;
    }

    //あたり判定
    for (var _i = 0; _i < stars.length; _i++) {
      var _star = stars[_i];
      var point = ship.localToLocal(0, 0, _star);
      var isHit = _star.hitTest(point.x, point.y);
      if (isHit === true) {
        _star.graphics.clear().beginFill("#fff").drawPolyStar(0, 0, 75, 5, 0.6, -90);
      }
      if (isHit === false) {
        _star.graphics.clear().beginFill("#000").drawPolyStar(0, 0, 75, 5, 0.6, -90);
      }
    }
    //壁
    if (ship.x < 0) {
      ship.x = 0;
    }
    if (ship.x > stage.canvas.width) {
      ship.x = stage.canvas.width;
    }
    if (ship.y < 0) {
      ship.y = 0;
    }
    if (ship.y > stage.canvas.height) {
      ship.y = stage.canvas.height;
    }
  }
}

function time_watch_digital() {
  var stage = new createjs.Stage("ics-tutorial__canvas");
  var time_Text = new createjs.Text("", "20px Arial", "#000");

  stage.addChild(time_Text);
  createjs.Ticker.addEventListener("tick", stage);
  createjs.Ticker.addEventListener("tick", handleTime);
  createjs.Ticker.timeMode = createjs.Ticker.RAF;

  function handleTime() {
    var time = new Date();
    var h = time.getHours(); // 時(0〜23)
    var m = time.getMinutes(); // 分(0〜59)
    var s = time.getSeconds(); // 秒(0〜59)
    time_Text.text = h + ':' + m + ':' + s;
  }
}

function time_watch_analog() {
  var stage = new createjs.Stage("ics-tutorial__canvas");
  var container_analog_watch = new createjs.Container();
  var analog_circle = new createjs.Shape();
  var second = new createjs.Shape();
  var minute = new createjs.Shape();
  var Hour = new createjs.Shape();
  var gradations = new createjs.Shape();

  second.graphics.setStrokeStyle(1).beginStroke("#000").moveTo(0, 0).lineTo(0, -300);

  minute.graphics.setStrokeStyle(4, "round").beginStroke("#000").moveTo(0, 0).lineTo(0, -250);

  Hour.graphics.setStrokeStyle(8, "round").beginStroke("#000").moveTo(0, 0).lineTo(0, -200);

  analog_circle.graphics.setStrokeStyle(1).beginStroke("#000").drawCircle(0, 0, 300);

  var steps = 60;
  for (var i = 0; i < steps; i++) {
    var angle = i * (360 / steps) - 90; //角度を計算
    var radian = angle * Math.PI / 180; // ラジアンに変換
    // A点 (直交座標に変換)
    var startX = 300 * Math.cos(radian);
    var startY = 300 * Math.sin(radian);
    // B点 (直交座標に変換)
    var endX = 280 * Math.cos(radian);
    var endY = 280 * Math.sin(radian);

    gradations.graphics.setStrokeStyle(1).beginStroke("#000").moveTo(startX, startY).lineTo(endX, endY);
  }

  var time_step = 12;
  for (var _i2 = 0; _i2 < time_step; _i2++) {
    var _angle = _i2 * (360 / time_step) - 90;
    var _radian = _angle * Math.PI / 180;
    var xx = 250 * Math.cos(_radian);
    var yy = 250 * Math.sin(_radian);

    var moji = _i2;

    if (_i2 == 0) {
      moji = 12;
    }

    var t = new createjs.Text("", "32px sans-serif", "gray");
    t.text = moji;
    t.textAlign = "center";
    t.textBaseline = "middle";
    t.x = xx;
    t.y = yy;
    container_analog_watch.addChild(t);
  }

  container_analog_watch.addChild(analog_circle, second, minute, Hour, gradations);
  container_analog_watch.x = stage.canvas.width / 2;
  container_analog_watch.y = stage.canvas.height / 2;

  stage.addChild(container_analog_watch);

  createjs.Ticker.addEventListener("tick", stage);
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.timeMode = createjs.Ticker.RAF;

  function handleTick() {
    var time = new Date();
    var s = time.getSeconds();
    var m = time.getMinutes();
    var h = time.getHours();
    second.rotation = s * (360 / 60);
    minute.rotation = m * (360 / 60);
    Hour.rotation = h * (360 / 12) + m * (360 / 12 / 60);
  }
}

},{}],4:[function(require,module,exports){
"use strict";

//window.addEventListener("load", particle_01);

function particle_01() {
  var stage = new createjs.Stage("ics-tutorial__canvas");

  var balls = [];
  var count = 0;
  var max_life = 100;
  createjs.Ticker.addEventListener("tick", stage);
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;

  function handleTick(event) {
    emitParticles();
    updateParticles();
  }

  function emitParticles() {
    for (var i = 0; i < 1; i++) {
      var ball = new createjs.Shape();
      var size = 50 * Math.random();
      count += 1;
      ball.graphics.beginFill(createjs.Graphics.getHSL(count, 50, 75)).drawCircle(0, 0, size);
      stage.addChild(ball);
      ball.x = stage.mouseX;
      ball.y = stage.mouseY;

      //拡散
      ball.vx = 10 * (Math.random() - 0.5);
      ball.vy = 10 * (Math.random() - 0.5);

      //寿命
      ball.life = max_life;
      ball.size = size;
      balls.push(ball);
    }
  }

  function updateParticles(event) {
    for (var i = 0; i < balls.length; i++) {
      var ball = balls[i];

      var scale = ball.life / max_life;
      var test = ball.size * scale;
      ball.graphics.clear().beginFill(createjs.Graphics.getHSL(count, 50, 75)).drawCircle(0, 0, test);

      //console.log(ball.size);
      ball.life -= 1;
      ball.vy += 0.1;

      ball.vx *= 0.98;
      ball.vy *= 0.98;

      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.life <= 0) {
        stage.removeChild(ball);
        balls.splice(i, 1);
        i--;
      }

      if (ball.y > stage.canvas.height - test) {
        //下
        ball.y = stage.canvas.height - test;
        ball.vy *= -1;
      }
      if (ball.y < test) {
        //上
        ball.y = test;
        ball.vy *= -1;
      }

      if (ball.x > stage.canvas.width - test) {
        //右
        ball.x = stage.canvas.width - test;
        ball.vx *= -1;
      }

      if (ball.x < test) {
        //左
        ball.x = test;
        ball.vx *= -1;
      }
    }
  }
}

},{}],5:[function(require,module,exports){
"use strict";

require("./lib/ics-basics.js");

require("./lib/particle.js");

require("./lib/firework01.js");

require("./lib/firework01_class.js");

window.addEventListener("resize", canvasResize);
function canvasResize() {
  var ics_tutorial = document.getElementById("ics-tutorial__canvas");
  ics_tutorial.setAttribute("width", window.innerWidth);
  ics_tutorial.setAttribute("height", window.innerHeight);
}
canvasResize();

},{"./lib/firework01.js":1,"./lib/firework01_class.js":2,"./lib/ics-basics.js":3,"./lib/particle.js":4}]},{},[5]);
