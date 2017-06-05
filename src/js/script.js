import "./lib/ics-basics.js"
import "./lib/particle.js"
import "./lib/firework01.js"

window.addEventListener("resize", canvasResize);
function canvasResize() {
  const ics_tutorial = document.getElementById("ics-tutorial__canvas");
  ics_tutorial.setAttribute("width", window.innerWidth);
  ics_tutorial.setAttribute("height", window.innerHeight);
}
canvasResize();
