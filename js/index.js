let degrees = 0;
let x = 400;
let y = 80;
let deltaX = 0;
let deltaY = 0;

let mainShip = document.getElementById('main-ship');
let fire = document.getElementById('fire');
let degreeLog = document.getElementById('degree-log');
let keyLog = document.getElementById('key-log');
let xLog = document.getElementById('x-log');
let yLog = document.getElementById('y-log');

mainShip.style.left = "" + x + "px";
mainShip.style.top = "" + y + "px";

function moveShip(e) {
  if (e.code == "ArrowRight") {
    degrees += 6;
  } else if (e.code == "ArrowLeft") {
    degrees -= 6;
  } else if (e.code == "ArrowDown") {
    deltaX = Math.cos((degrees + 90) * Math.PI / 180);
    deltaY = Math.sin((degrees + 90) * Math.PI / 180);
    x -= deltaX * 10;
    y -= deltaY * 10;
    fire.style.visibility = "visible";
    setTimeout(function(){
      fire.style.visibility = "hidden";
    }, 100);
  }
  
  if (degrees > 359) {
    degrees = 0;
  }
  
  if (degrees < 0) {
    degrees = 360 - 6;
  }
  
  if (x <= 10) {
    x = 780;
  } else if (x >= 780) {
    x = 10;
  }
  
  if (y < 0) {
    y = 170;
  } else if (y > 170) {
    y = 0;
  }
  
  
  mainShip.style.transform = "rotate(+" + degrees + "deg)";
  mainShip.style.left = "" + x + "px";
  mainShip.style.top = "" + y + "px";
  
  keyLog.innerHTML = "Key: " + e.code;
  degreeLog.innerHTML = "Degrees: " + degrees + "<sup>o</sup>";
  xLog.innerHTML = "x pos: " + Math.floor(x) + "px";
  yLog.innerHTML = "y pos: " + Math.floor(y) + "px";
}

document.addEventListener('keydown', moveShip);