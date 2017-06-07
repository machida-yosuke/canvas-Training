const cjs = createjs;
const ONECOLOR = ["#9e60e5", "#7f6aff", "#ff4280", "#36f9bf", "#92b8e7"];
const DECELERATION = 0.98;

class AppFireball {
  constructor(canvas_id) {
    this.stage = new cjs.Stage(canvas_id);
    this.stage.autoClear = false;
    this.fireballs = [];
    this.fire_container = new cjs.Container();
    this.fire_container.x = 0;
    this.fire_container.y = 0;
    this.background = new cjs.Shape();
    this.background.graphics
      .beginFill("#000")

      .drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.width);

    this.background.alpha = 0.08;

    this.stage.addChild(this.fire_container, this.background);
    this.initHandler();
  }

  initHandler() {
    cjs.Ticker.addEventListener("tick", this.stage);
    cjs.Ticker.timingMode = cjs.Ticker.RAF;
    const handleClick = () => {
      const color = ONECOLOR[Math.floor(Math.random() * (ONECOLOR.length))];
      console.log(ONECOLOR[Math.floor(Math.random() * (ONECOLOR.length))]);
      if(Math.random() > 0.5){
        new HanabiOnecolor(this.fire_container, this.stage.canvas.width * Math.random(), this.stage.canvas.height * Math.random(), color);
      }else{
        new HanabiColorful(this.fire_container, this.stage.canvas.width * Math.random(), this.stage.canvas.height * Math.random());
      }
    }
    window.addEventListener("click", handleClick);
  }
}


class HanabiOnecolor {
  constructor(container, x, y, color) {
    this.container = container;

    this.fireballs = [];
    this.steps = 400;
    this.diffusion = 3;
    this.life = 80;
    this.color = color;

    this.size = 10 * Math.random();


    for (let i = 0; i < this.steps; i++) {
      const fireball = new cjs.Shape();
      fireball.x = x;
      fireball.y = y;

      fireball.graphics
        .beginFill(this.color)
        .drawCircle(0, 0, this.size);
      fireball.compositeOperation = "lighter";


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

  updateParticles() {

    for (var i = 0; i < this.fireballs.length; i++) {
      const fireball = this.fireballs[i];

      fireball.vx *= 0.98;
      fireball.vy *= 0.98;

      fireball.x += fireball.vx;
      fireball.y += fireball.vy;

      const scale = fireball.life / this.life;
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

  initHandler() {
    cjs.Ticker.addEventListener("tick", () => {
      this.updateParticles()
    });
  }
}

class HanabiColorful {
  constructor(container, x, y) {
    this.container = container;
    this.fireballs = [];
    this.steps = 400;
    this.diffusion = 2;
    this.life = 100;
    this.size = 10 * Math.random();
    this.colourful = ["#9e60e5", "#7f6aff", "#ff4280", "#36f9bf", "#92b8e7"];

    for (let i = 0; i < this.steps; i++) {
      const fireball = new cjs.Shape();
      fireball.x = x;
      fireball.y = y;

      fireball.graphics
        .beginFill(this.colourful[Math.floor(Math.random() * (this.colourful.length))])

        .drawCircle(0, 0, this.size);
      fireball.compositeOperation = "lighter";

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

  updateParticles() {

    for (var i = 0; i < this.fireballs.length; i++) {
      const fireball = this.fireballs[i];
      fireball.vy += 0.03;


      fireball.vx *= DECELERATION;
      fireball.vy *= DECELERATION;


      fireball.x += fireball.vx;
      fireball.y += fireball.vy;

      const scale = fireball.life / this.life;
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

  initHandler() {
    cjs.Ticker.addEventListener("tick", () => {
      this.updateParticles()
    });
  }
}



window.onload = function () {
  const fire = new AppFireball("ics-tutorial__canvas");
}
