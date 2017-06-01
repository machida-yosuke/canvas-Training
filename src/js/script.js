window.addEventListener("load", init);
window.addEventListener("resize", canvasResize);

function canvasResize() {
  const ics_tutorial = document.getElementById("ics-tutorial__canvas");
  ics_tutorial.setAttribute("width", window.innerWidth);
  ics_tutorial.setAttribute("height", window.innerHeight);
}
canvasResize();


function init() {

  const stage = new createjs.Stage("ics-tutorial__canvas");
  const shape = new createjs.Shape();
  const shape_container = new createjs.Container();
  shape_container.x = 0;
  shape_container.y = 0;
  shape_container.addChild(shape)

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
  img.visible = true;

  const text = new createjs.Text("", "90px Arial", "#DB7BB1");
  text.text = "text";
  text.textAlign = "center";
  text.x = 200;
  text.textBaseline = "top";
  text.visible = true;

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
  stage.addChild(text, img, shape_container, circle_container);

  if (createjs.Touch.isSupported() == true){
     createjs.Touch.enable(stage);
    createjs.Touch.allowDefault=false
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

  function handleClick (ev){
    console.log(ev);
  }

  function handleMouseDown(event){
    dragPointX = mx - img.x;
    dragPointY = my - img.y;
    console.log(dragPointY);
  }

  function handleMouseMove(event){
    img.x = mx - dragPointX;
    img.y = my - dragPointY;
    //console.log(img.y );
  }

  function handleMouseKeyDown(event){
    let key = event.keyCode;
    if(key === 16 ){
      text.y -=1;
    }
    if(key === 40 ){
      text.y +=1;
    }
    if(key === 37 ){
      text.x -=1;
    }
    if(key === 39 ){
      text.x +=1;
    }
    console.log("押したボタン:" + key);
  }
}
