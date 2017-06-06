
const cjs = createjs;
class Fireball {
  constructor(canvas_id) {
    this.stage = new cjs.Stage(canvas_id);
    this.fireballs = [];
    this.steps = 300;
    this.diffusion = 3;
    this.life = 100;
    this.fire_container = new cjs.Container();
    this.fire_container.x = 0;
    this.fire_container.y = 0;
    this.stage.addChild(this.fire_container);
    this.initHandler();
  }

  emitParticles() {
    for (let i = 0; i < this.steps; i++) {
      const size = 10 * Math.random();
      const fireball = new cjs.Shape();
      fireball.graphics
        .beginFill("#fff")
        .drawCircle(0, 0, size);
      const angle = i * (360 / this.steps);
      const radian = angle * Math.PI / 180;
      fireball.x = this.stage.mouseX;
      fireball.y = this.stage.mouseY;
      fireball.vx = this.diffusion * Math.sin(radian) * Math.random();
      fireball.vy = this.diffusion * Math.cos(radian) * Math.random();

      fireball.life = this.life;
      this.fireballs.push(fireball);

      this.fire_container.addChild(fireball);
    }
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
        this.fire_container.removeChild(fireball);
        this.fireballs.splice(i, 1);
        i--;
      }
    }
  }

  initHandler() {
    cjs.Ticker.addEventListener("tick", this.stage);
    cjs.Ticker.timingMode = cjs.Ticker.RAF;
    const handleClick =()=>{
      this.emitParticles();
    }
    window.addEventListener("click", handleClick);
    cjs.Ticker.addEventListener("tick", ()=>{this.updateParticles()});

  }
}

window.onload = function(){
   const fire = new Fireball("ics-tutorial__canvas");
  }
