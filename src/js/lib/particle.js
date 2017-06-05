window.addEventListener("load", particle_01);

function particle_01() {
  const stage = new createjs.Stage("ics-tutorial__canvas");

  const balls = [];
  let count = 0;
  const max_life = 100;
  createjs.Ticker.addEventListener("tick", stage);
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;

  function handleTick(event) {
    emitParticles();
    updateParticles();
  }

  function emitParticles() {
    for (let i = 0; i < 1; i++) {
      const ball = new createjs.Shape();
      const size = 50 * Math.random();
      count += 1;
      ball.graphics
        .beginFill(createjs.Graphics.getHSL(count, 50, 75))
        .drawCircle(0, 0, size);
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
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];

      const scale = ball.life / max_life;
      const test = ball.size * scale;
      ball.graphics
        .clear()
        .beginFill(createjs.Graphics.getHSL(count, 50, 75))
        .drawCircle(0, 0, test);

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

      if (ball.y > stage.canvas.height - test) { //下
        ball.y = stage.canvas.height - test;
        ball.vy *= -1;
      }
      if (ball.y < test) {　 //上
        ball.y = test;
        ball.vy *= -1;
      }

      if (ball.x > stage.canvas.width - test) { //右
        ball.x = stage.canvas.width - test;
        ball.vx *= -1;
      }

      if (ball.x < test) { //左
        ball.x = test;
        ball.vx *= -1;
      }
    }
  }
}
