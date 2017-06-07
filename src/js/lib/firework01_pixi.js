// const ONECOLOR = [0x9e60e5, 0x7f6aff, 0xff4280, 0x36f9bf, 0x92b8e7];
// const DECELERATION = 0.98;
//
// class AppFireball {
//   constructor(canvas_id) {
//     this.stage = new PIXI.Container();
//     this.renderer = new PIXI.WebGLRenderer({
//       view: canvas_id,
//       clearBeforeRender: false,
//       preserveDrawingBuffer:true,
//       resolution:2,
//       antialias:true
//     });
//     this.fire_container = new PIXI.Container();
//
//     this.background = new PIXI.Graphics();
//     this.background.drawRect(0, 0, 9999, 9999);
//     this.background.beginFill(0x000000);
//     this.background.alpha = 0.08;
//
//     this.stage.addChild(this.fire_container, this.background);
//
//     this.fireballs = [];
//     this.initHandler();
//   }
//   initHandler() {
//     let ticker = PIXI.ticker.shared;
//     ticker.add((time) => {
//       this.renderer.render(this.stage);
//     });
//
//     const handleClick = () => {
//       const color = ONECOLOR[Math.floor(Math.random() * (ONECOLOR.length))];
//
//       if (Math.random() > 0.5) {
//         new HanabiOnecolor(this.fire_container, window.innerWidth * Math.random(), window.innerHeight * Math.random(), color);
//       } else {
//         new HanabiColorful(this.fire_container, window.innerWidth * Math.random(), window.innerHeight * Math.random());
//       }
//     }
//     window.addEventListener("click", handleClick);
//     const pixiResize = () => {
//       const width_size = window.innerWidth;
//       const height_size = window.innerHeight;
//       this.renderer.resize(width_size,height_size);
//     }
//     window.addEventListener("resize", pixiResize);
//   }
// }
//
// class HanabiOnecolor {
//   constructor(container, position_x, position_y, color) {
//     this.container = container;
//     this.fireballs = [];
//     this.steps = 400;
//     this.diffusion = 3;
//     this.life = 80;
//     this.color = color;
//     this.size = 5 * Math.random();
//
//     for (let i = 0; i < this.steps; i++) {
//       const fireball = new PIXI.Graphics();
//       fireball.beginFill(this.color);
//       fireball.x = position_x;
//       fireball.y = position_y;
//       fireball.drawCircle(0, 0, this.size);
//       fireball.blendMode = PIXI.BLEND_MODES.ADD;
//
//       this.angle = i * (360 / this.steps);
//       this.radian = this.angle * Math.PI / 180;
//
//       fireball.vx = this.diffusion * Math.sin(this.radian) * Math.random();
//       fireball.vy = this.diffusion * Math.cos(this.radian) * Math.random();
//
//       fireball.life = this.life;
//       this.fireballs.push(fireball);
//       this.container.addChild(fireball);
//     }
//
//     this.initHandler();
//   }
//
//   updateParticles() {
//     for (var i = 0; i < this.fireballs.length; i++) {
//       const fireball = this.fireballs[i];
//       fireball.vx *= 0.98;
//       fireball.vy *= 0.98;
//
//       fireball.position.x += fireball.vx;
//       fireball.position.y += fireball.vy;
//
//       const scale = fireball.life / this.life;
//       fireball.scaleX = fireball.scaleY = scale;
//       fireball.alpha = scale;
//       fireball.life -= 1;
//
//       if (fireball.life <= 0) {
//         this.container.removeChild(fireball);
//         this.fireballs.splice(i, 1);
//         i--;
//       }
//     }
//   }
//
//   initHandler() {
//     let ticker = PIXI.ticker.shared;
//     ticker.add((time) => {
//       this.updateParticles();
//     });
//   }
// }
//
// class HanabiColorful {
//   constructor(container, position_x, position_y) {
//     this.container = container;
//     this.fireballs = [];
//     this.steps = 400;
//     this.diffusion = 2;
//     this.life = 100;
//     this.size = 5 * Math.random();
//     this.colourful = [0x9e60e5, 0x7f6aff, 0xff4280, 0x36f9bf, 0x92b8e7];
//
//     for (let i = 0; i < this.steps; i++) {
//       const fireball = new PIXI.Graphics();
//       fireball.beginFill(this.colourful[Math.floor(Math.random() * (this.colourful.length))]);
//       fireball.x = position_x;
//       fireball.y = position_y;
//       fireball.drawCircle(0, 0, this.size);
//       fireball.blendMode = PIXI.BLEND_MODES.ADD;
//
//       this.angle = i * (360 / this.steps);
//       this.radian = this.angle * Math.PI / 180;
//
//       fireball.vx = this.diffusion * Math.sin(this.radian) * Math.random();
//       fireball.vy = this.diffusion * Math.cos(this.radian) * Math.random();
//
//       fireball.life = this.life;
//       this.fireballs.push(fireball);
//       this.container.addChild(fireball);
//     }
//
//     this.initHandler();
//   }
//
//   updateParticles() {
//
//     for (var i = 0; i < this.fireballs.length; i++) {
//       const fireball = this.fireballs[i];
//       fireball.vy += 0.03;
//
//       fireball.vx *= DECELERATION;
//       fireball.vy *= DECELERATION;
//
//       fireball.position.x += fireball.vx;
//       fireball.position.y += fireball.vy;
//
//       const scale = fireball.life / this.life;
//       fireball.scaleX = fireball.scaleY = scale;
//       fireball.alpha = scale;
//       fireball.life -= 1;
//
//       if (fireball.life <= 0) {
//         this.container.removeChild(fireball);
//         this.fireballs.splice(i, 1);
//         i--;
//       }
//     }
//   }
//
//   initHandler() {
//     let ticker = PIXI.ticker.shared;
//     ticker.add((time) => {
//       this.updateParticles();
//     });
//   }
// }
//
//
//
// window.onload = function () {
//   const fire = new AppFireball(document.getElementById("ics-tutorial__canvas"));
// }
