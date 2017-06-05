window.addEventListener("load", firework01);

function firework01() {
  const CR = createjs;
  const stage = new CR.Stage("ics-tutorial__canvas");





  CR.Ticker.addEventListener("tick", stage);
  CR.Ticker.timingMode = CR.Ticker.RFA;
  window.addEventListener("click", handleClick);
  CR.Ticker.addEventListener("tick", updateParticles);

  function handleClick() {
    emitparticles();
    updateParticles();
  }

  const fire = [];
  const steps = 300;
  const diffusion = 110;
  const life = 60;
  const max_life = 300;

  function emitparticles() {
    const fire_container = new CR.Container();
    fire_container.x = stage.mouseX;
    fire_container.y = stage.mouseY;

    for (let i = 0; i < steps; i++) {
      const size = 4 * Math.random();

      const fireball = new CR.Shape();
      fireball.graphics
        .beginFill("#fff")
        .drawCircle(0, 0, size);

      const angle = i * (360 / steps) - 90;
      const radian = angle * Math.PI / 180;
      fireball.vx = diffusion * Math.sin(radian) * (Math.random() - 0.5);
      fireball.vy = diffusion * Math.cos(radian) * (Math.random() - 0.5);

      fire[i] = fireball;
      fire_container.addChild(fireball);
      stage.addChild(fire_container);

      fireball.life = life;
      fire.push(fireball);
    }
  }

  function updateParticles() {
    for (var i = 0; i < fire.length; i++) {
      const fireball = fire[i];


      //fireball.vy += 1;

      fireball.vx *= 0.7;
      fireball.vy *= 0.7;

      fireball.x += fireball.vx;
      fireball.y += fireball.vy;

      const scale = fireball.life / life;
      fireball.scaleX = fireball.scaleY = scale;
      fireball.alpha = scale;
      fireball.life -= 1;

      if (fireball.life <= 0) {
        stage.removeChild(fireball);
        fire.splice(i, 1);
        i--;
      }
    }
  }
}
