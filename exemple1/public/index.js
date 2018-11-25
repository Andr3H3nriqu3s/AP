var socket = io();
var cc;
var ctx;
var width = screen.width;
var height = screen.height;
const isSafari = navigator.userAgent.indexOf("iPhone") != -1;

window.onload = () => {
  if (isSafari) {
    width = window.innerWidth;
    height = window.innerHeight;
  }
  cc = document.getElementById('cc');
  cc.width = width;
  cc.height = height;
  ctx = cc.getContext('2d');
  //cc.requestFullscreen();´
  defFont();
  background(0,0,0);
  setInterval(show, 1000/60);
};


var ftime = false;
var x = 0;
var y = 0;
var vx = 0;
var vy = 0;
var sColor = "black";

var slide = 0;
var lslide = -1;

socket.on('aslide', (msg) => slide = msg);

function show() {
  if (lslide != slide) {
    lslide = slide;
    ftime = true;
  }
  socket.emit('slide', '');
  if (slide == 0) {slide0();} 
  else if (slide == 1) {slide0();} 
  else if (slide == 2) {slide0();} 
  else if (slide == 3) {slide1();} 
  else if (slide == 4) {slide2();} 
  else if (slide == 5 || slide == 6) {slide3();} 
  else if (slide == 7) {slide4();} 
  else if (slide == 8) {slide5();}
  else if (slide == 9) {slide6();}
  else if (slide == 10) {slide7();}
  else if (slide == 11) {slide8();}
  else if (slide == 12) {slide9();}
  else if (slide == 13) {slide9();}
  else if (slide == 14) {slide9();}
  else if (slide == 15) {slide10();}
  else if (slide == 16) {slide11();}
  else if (slide == 17) {slide12();}
  else { slideNone();}
}

function slide0() {
  if (ftime)  {
    ftime = false;
    defFont();
    background(255);
    fill(0);
    text('Thanks You For Connecting', width/2 - getTextWidth('Thanks You For Wating')/2 , height/2 - 16);

    let img = new Image();
    img.onload = () => {
      ctx.scale(0.5,0.5);
      ctx.drawImage(img, width - img.width/2, height/2 - img.height/2);
      ctx.scale(2,2);
    };
    img.src = "logo.png";
    fill(0);
    defFont();
    t = 'Make a simple thing such as presentation magical!';
    text(t, width/2 - getTextWidth(t)/2, height/3 * 2 - 21);
  }
}

function slide1() {
  if (ftime) {
    ftime = false;
  }
  ctx.font = "64px Verdana";
  background(0,0,0);
  fill(255,255,255);
  text('3 Parts', width/2 -getTextWidth('3 Parts')/2, height/2 - 32);
}

function slide2() {
  if (ftime) {
    ftime = false;
  }
  ctx.font = "64px Verdana";
  background(0,0,0);
  fill(255,255,255);
  text('665 Lines', width/2 - getTextWidth('665 Lines')/2, height/2 - 32);
}

function slide3() {
  if (ftime) {
    ftime = false;
  }
  background(0,0,0);
  defFont();
  fill(255,255,255);
  text('Freedom', width/2 - getTextWidth('Freedomp')/2, height/2);
}

function slide4() {
  if(ftime) {
    ftime = false;
  }
  background(0,0,0);
  defFont();
  fill(255,255,255);
  text('Advanced Functionality', width/2 - getTextWidth('Advanced Functionality')/2, height/2 - 32);
}

function slide5() {
  if (ftime) {
    ftime = false;
    background(0,0,0);
    ctx.font = "32px Verdana";
    fill(255,255,255);
    text('Pixel per Pixel', width/2 -getTextWidth('Pixel per Pixel')/2, height/2 - 16);
  }
  fill(255,0,0);
  stroke = 0;
  for (let i = 0; i < 10;i++) {rect(Math.floor(Math.random() * width), Math.floor(Math.random() * height), 1,1);}
  stroke = 1;
}

function slide6() {
  if (ftime) {
    ftime = false;
  }
  background(0,0,0);
  fill(255,255,255);
  defFont();
  text('I\'m not moving', width/2 - getTextWidth('I\'m not moving')/2, height/2 - height/30);
}

function slide7() {
  if (ftime) {
    ftime = false;
    background(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
  }
}

function slide8() {
  background(0,0,0);
  fill(255);
  defFont();
  text('Just Like Magic', width/2 - getTextWidth('Just Like Magic')/2, height/2);
}

function slide9() {
  background(0,0,0);
  fill(255);
  defFont();
  text('Look Up!', width/2 - getTextWidth('Look up!')/2, height/2);
}

function slide10() {
  background(0,0,0);
  fill(255);
  defFont();
  text('Go get it', width/2 - getTextWidth('Look up!')/2, height/2);
}

function slide11() {
  background(0,0,0);
  fill(255);
  defFont();
  text('Free and you can change it!', width/2 - getTextWidth('Free and you can change it!')/2, height/2);
}

function slide12() {
  background(0,0,0);
  fill(255);
  defFont();
  text('Thank you!', width/2 - getTextWidth('Thank you!')/2, height/2);
}

function slideNone() {
  if (ftime) {
    ftime = false;
    x = 17;
    y = 10;
    vx = 5;
    vy = 5;
    background(0,0,0);
  }
  stroke = 0;
  if (x + vx > width || x + vx < 0) vx *= -1;
  if (y + vy > height || y + vy < 0) vy *= -1;
  x += vx;
  y += vy;
  fill(0, 0, 255);
  rect(x, y, 10, 10);
  stroke = 1;
}

var stroke = 0;
var lastFill = 'black';

function fill(r,g,b) {
  if (g == null || b == null) {
    g = r;
    b = r;
  }
  lastFill = ctx.fillStyle;
  ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
}

function sfill(s) {
  lastFill = ctx.fillStyle;
  ctx.fillStyle = s;
}

function background(r,g,b) {
  fill(r,g,b);
  let lstroke = stroke;
  stroke = 0;
  rect(0,0, width, height);
  stroke = lstroke;
  sfill(lastFill);
}

function sbackground(t) {
  sfill(t);
  let lstroke = stroke;
  stroke = 0;
  rect(0,0, width, height);
  stroke = lstroke;
  sfill(lastFill);
}

function rect(x,y, w,h) {
  fill(0,0,0);
  ctx.fillRect(x - stroke/2, y - stroke/2, w + stroke, h + stroke);
  sfill(lastFill);
  ctx.fillRect(x,y, w,h);
}

function text(t,x,y) {
  ctx.fillText(t, x, y);
}

function defFont() {
  ctx.font = height/15 + 'px Verdana'
  if (isSafari) ctx.font = 12 + 'px Verdana'
}

function getTextWidth(t) {
  return Math.round(ctx.measureText(t).width);
}