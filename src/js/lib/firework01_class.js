const cjs = createjs;

class App_Fireball {
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
      .drawRect(0,0,this.stage.canvas.width,this.stage.canvas.width);
    this.background.alpha = 0.08;

    this.stage.addChild(this.fire_container, this.background);
    this.initHandler();
    this.colors = ["#9e60e5", "#7f6aff", "#ff4280", "#36f9bf", "#92b8e7"];
  }
  initHandler() {
    cjs.Ticker.addEventListener("tick", this.stage);
    cjs.Ticker.timingMode = cjs.Ticker.RAF;
    const handleClick = () => {
      const color = this.colors[Math.floor(Math.random() * (this.colors.length - 1))];
      new Hanabi(this.fire_container, this.stage.mouseX, this.stage.mouseY, color);
    }
    window.addEventListener("click", handleClick);
  }
}

class Hanabi {
  constructor(Container, x, y, color) {
    this.container = Container;
    this.fireballs = [];
    this.steps = 300;
    this.diffusion = 3;
    this.life = 100;
    this.color = color;
    this.size = 5 * Math.random();

    for (let i = 0; i < this.steps; i++) {
      const fireball = new cjs.Shape();
      fireball.x = x;
      fireball.y = y;

      fireball.graphics
        .beginFill(this.color)
        .drawCircle(0, 0, this.size);
      fireball.compositeOperation = "lighter";

      const blurFilter = new cjs.BlurFilter(5, 5, 1);
      fireball.filters = [blurFilter];
      const bounds = blurFilter.getBounds();
      fireball.cache(-50 + bounds.x, -50 + bounds.y, 100 + bounds.width, 100 + bounds.height);

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


window.onload = function () {
  const Fire = new App_Fireball("ics-tutorial__canvas");
}
