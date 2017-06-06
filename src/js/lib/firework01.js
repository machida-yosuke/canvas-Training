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
