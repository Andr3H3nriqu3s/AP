var socket = io();

const width = screen.width;
const height = screen.height;

function setup() {
  createCanvas(width, height);
  frameRate(60);
}

let activeConnections = 1;
let slide = 0;

socket.on('aAc', (msg) => activeConnections = msg);
socket.on('aslide', (msg) => slide = msg);

let count = 0;
let t = [];
var wasPressed = false;
var fhg = 0;
var fhs = 0;
var minn = 0;
var auto = true;
var mcount = 0;

function draw(){
  socket.emit('getAc', '');
  if (count == 60) {
    count = -1;
    t.push(activeConnections);
    mcount += 1;
    if (slide > 11 && slide < 15 && mcount == 10)  {
      mcount = 0;
      socket.emit('adslide','');
    }
  }
  count++;
  background(0);
  fill(255);
  textSize(32);
  text(activeConnections + '',width/3 *2 - textWidth(activeConnections + ''), height/6 - 16);
  fill(0, 255, 255);
  text(slide + '',width/3 *2 + textWidth(activeConnections + '') * 2 - textWidth(slide + ''), height/6 - 16);
  fill(255);
  if (t.length > 50) {
    t.splice(0,1);
  }
  let higgher = 0;

  for (let a = 0; a < t.length; a++) {
    if (t[a] > higgher) {
      higgher = t[a];
    }
  }

  push();
  translate(0,height/3);
  fill(255, 0, 0);
  for (let a = 0; a < t.length; a++) {
    rect(width/100 * a + 16, -(height/3)/(higgher + 2) * t[a], 10, 10);
  }
  pop();

  if (wasPressed) fhg++;
  if (fhg == 60) {
      fhg = 0;
      fhs++;
      if (fhs == 60) {
          minn++;
          fhs = 0;
      }
  }
  textSize(64);
  let ts = minn + ":" + fhs + ":" + fhg;
  text(ts, width/6 - textWidth(ts)/2, height/4 * 3 - 32);
}

function keyPressed() {
  if (!wasPressed) {
    wasPressed = true;
  }
  if (keyCode == 39) {
    socket.emit('adslide','');
  } else if (keyCode == 37){
    socket.emit('rslide','');
  } else if (keyCode == 82) {
    wasPressed = false;
    minn = 0;
    fhs = 0;
    fhg = 0;
  } else  if (keyCode == 65) {auto = !auto;}
}
