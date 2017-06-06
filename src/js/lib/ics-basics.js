//window.addEventListener("load", basics);
//window.addEventListener("load", button);
//window.addEventListener("load", ship);
//window.addEventListener("load", time_watch_digital)
//window.addEventListener("load", time_watch_analog)

function basics() {
  const stage = new createjs.Stage("ics-tutorial__canvas");
  const shape = new createjs.Shape();
  const shape_container = new createjs.Container();
  shape_container.x = 0;
  shape_container.y = 0;
  shape_container.addChild(shape);

  shape.graphics
    .beginLinearGradientFill(["#6CBAD8", "#DB7BB1"], [0, 1], 90, 0, 0, 100)
    .beginStroke("#fff")
    .setStrokeStyle(2)
    .drawCircle(0, 0, 50);
  shape.graphics
    .beginLinearGradientFill(["#DB7BB1", "#FBE481"], [0, 1], 90, 150, 0, 100)
    .beginStroke("#fff")
    .setStrokeStyle(2)
    .drawRoundRect(0, 0, 100, 100, 20, 20);
  shape.graphics
    .beginLinearGradientFill(["#FBE481", "#6CBAD8"], [0, 1], 90, 200, 0, 100)
    .beginStroke("#fff")
    .setStrokeStyle(2)
    .drawCircle(210, 0, 50);
  shape.graphics
    .drawPolyStar(50, 200, 100, 5, 0.5, 50)
    .beginLinearGradientFill(["#DB7BB1", "#6CBAD8"], [0, 1], 90, 200, 0, 100);
  shape.graphics
    .moveTo(0, 400)
    .lineTo(500, 0)
    .lineTo(0, 500);
  shape.alpha = 1;
  shape.scaleX = 1;
  shape.scaleY = 1;
  shape.visible = false;
  shape.x = 55;
  shape.y = 55;

  const img = new createjs.Bitmap("./images/benjomeshi_boy.png");
  img.regX = 100;
  img.regY = 100;
  img.visible = false;

  const text = new createjs.Text("", "90px Arial", "#DB7BB1");
  text.text = "text";
  text.textAlign = "center";
  text.x = 200;
  text.textBaseline = "top";
  text.visible = false;

  const circle_container = new createjs.Container();
  for (let i = 0; i < 10; i++) {
    const ball = new createjs.Shape();
    ball.graphics
      .beginFill("#000")
      .drawCircle(0, 0, 50);
    ball.x = 200 * Math.sin(i * 360 / 10 * Math.PI / 180);
    ball.y = 200 * Math.cos(i * 360 / 10 * Math.PI / 180);
    circle_container.addChild(ball);
  }
  circle_container.visible = false;
  stage.addChild(text, img, shape_container, circle_container);

  if (createjs.Touch.isSupported() == true) {
    createjs.Touch.enable(stage);
    createjs.Touch.allowDefault = false
  }
  stage.enableMouseOver();

  //描画の更新と動き
  createjs.Ticker.addEventListener("tick", stage);
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  img.addEventListener("click", handleClick)
  img.addEventListener("pressmove", handleMouseMove)
  img.addEventListener("mousedown", handleMouseDown)
  window.addEventListener("keydown", handleMouseKeyDown)

  let mx;
  let my;

  let dragPointX;
  let dragPointY;

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
    let key = event.keyCode;
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
  const stage = new createjs.Stage("ics-tutorial__canvas");

  const button_container = new createjs.Container();

  const button_text = new createjs.Text("aaa", "25px futura", "#DB7BB1");
  button_text.text = "button";

  const button_wrapper = new createjs.Shape();
  button_wrapper.graphics
    .beginFill("#fff")
    .setStrokeStyle(2)
    .beginStroke("#6CBAD8")
    .drawRoundRect(-65, 0, 200, 40, 10, 10);

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
    button_wrapper.graphics
      .clear()
      .beginFill("#DB7BB1")
      .setStrokeStyle(2)
      .beginStroke("#6CBAD8")
      .drawRoundRect(-65, 0, 200, 40, 10, 10);
  }

  function handleOut(ev) {
    button_wrapper.graphics
      .clear()
      .beginFill("#fff")
      .setStrokeStyle(2)
      .beginStroke("#6CBAD8")
      .drawRoundRect(-65, 0, 200, 40, 10, 10);
  }

  function handleClick(ev) {
    console.log("aaa");
  }
}

function ship() {
  const stage = new createjs.Stage("ics-tutorial__canvas");
  const ship = new createjs.Shape();

  ship.graphics
    .beginFill("DarkRed")
    .moveTo(-10, 5)
    .lineTo(-10, -5)
    .lineTo(5, 0);
  ship.x = stage.canvas.width / 2;
  ship.y = stage.canvas.height / 2;

  const stars = [];

  for (let i = 0; i < 10; i++) {
    const star = new createjs.Shape();
    star.graphics
      .beginFill("#000")
      .drawPolyStar(0, 0, 75, 5, 0.6, -90);
    star.x = 500 * Math.random();
    star.y = 500 * Math.random();

    stars[i] = star;
    stage.addChild(star);
  }


  stage.addChild(ship);
  createjs.Ticker.addEventListener("tick", stage)
  createjs.Ticker.timingMode = createjs.Ticker.RAF;

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
  createjs.Ticker.addEventListener("tick", handleShipMove)
  let isPressup = false;
  let isPressdown = false;
  let isPressright = false;
  let isPressleft = false;

  let angle = 0;
  let speed = 0;

  function handleKeydown(event) {
    const key = event.keyCode;
    console.log(key);
    if (key === 38) { //上
      isPressup = true;
      ship.rotation = -90;
    }
    if (key === 40) { //下
      isPressdown = true;
      ship.rotation = 90;
    }
    if (key === 37) { //左
      isPressleft = true;
      ship.rotation = 180;

    }
    if (key === 39) { //右
      isPressright = true;
      ship.rotation = 0;
    }

  }

  function handleKeyup(event) {
    const key = event.keyCode;
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
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      const point = ship.localToLocal(0, 0, star);
      const isHit = star.hitTest(point.x, point.y)
      if (isHit === true) {
        star.graphics
          .clear()
          .beginFill("#fff")
          .drawPolyStar(0, 0, 75, 5, 0.6, -90);
      }
      if (isHit === false) {
        star.graphics
          .clear()
          .beginFill("#000")
          .drawPolyStar(0, 0, 75, 5, 0.6, -90);
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
  const stage = new createjs.Stage("ics-tutorial__canvas");
  const time_Text = new createjs.Text("", "20px Arial", "#000");

  stage.addChild(time_Text);
  createjs.Ticker.addEventListener("tick", stage);
  createjs.Ticker.addEventListener("tick", handleTime);
  createjs.Ticker.timeMode = createjs.Ticker.RAF;

  function handleTime() {
    let time = new Date();
    let h = time.getHours(); // 時(0〜23)
    let m = time.getMinutes(); // 分(0〜59)
    let s = time.getSeconds(); // 秒(0〜59)
    time_Text.text = h + ':' + m + ':' + s;
  }
}

function time_watch_analog() {
  const stage = new createjs.Stage("ics-tutorial__canvas");
  const container_analog_watch = new createjs.Container();
  const analog_circle = new createjs.Shape();
  const second　 = new createjs.Shape();
  const minute　 = new createjs.Shape();
  const Hour　 = new createjs.Shape();
  const gradations　 = new createjs.Shape();

  second.graphics
    .setStrokeStyle(1)
    .beginStroke("#000")
    .moveTo(0, 0)
    .lineTo(0, -300);

  minute.graphics
    .setStrokeStyle(4, "round")
    .beginStroke("#000")
    .moveTo(0, 0)
    .lineTo(0, -250);

  Hour.graphics
    .setStrokeStyle(8, "round")
    .beginStroke("#000")
    .moveTo(0, 0)
    .lineTo(0, -200);

  analog_circle.graphics
    .setStrokeStyle(1)
    .beginStroke("#000")
    .drawCircle(0, 0, 300);

  const steps = 60;
  for (let i = 0; i < steps; i++) {
    const angle = i * (360 / steps) - 90; //角度を計算
    const radian = angle * Math.PI / 180; // ラジアンに変換
    // A点 (直交座標に変換)
    const startX = 300 * Math.cos(radian);
    const startY = 300 * Math.sin(radian);
    // B点 (直交座標に変換)
    const endX = 280 * Math.cos(radian);
    const endY = 280 * Math.sin(radian);

    gradations.graphics
      .setStrokeStyle(1)
      .beginStroke("#000")
      .moveTo(startX, startY)
      .lineTo(endX, endY);
  }

  const time_step = 12;
  for (let i = 0; i < time_step; i++) {
    const angle = i * (360 / time_step) - 90;
    const radian = angle * Math.PI / 180;
    const xx = 250 * Math.cos(radian);
    const yy = 250 * Math.sin(radian);

    let moji = i;

    if (i == 0) {
      moji = 12;
    }

    const t = new createjs.Text("", "32px sans-serif", "gray");
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


  createjs.Ticker.addEventListener("tick", stage)
  createjs.Ticker.addEventListener("tick", handleTick)
  createjs.Ticker.timeMode = createjs.Ticker.RAF;

  function handleTick() {
    const time = new Date();
    let s = time.getSeconds();
    let m = time.getMinutes();
    let h = time.getHours();
    second.rotation = s * (360 / 60);
    minute.rotation = m * (360 / 60);
    Hour.rotation = h * (360 / 12) + m * (360 / 12 / 60);
  }
}
