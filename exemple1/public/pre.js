var socket = io();
const width = screen.width;
const height = screen.height;
var pMode = true;
var logo;

function setup() {
  createCanvas(width, height);
  logo = loadImage("logo.png");
}

var slide = 0;
var lslide = 0;
var ftime = true;
var count = 0;
var x = 0;
var y = 0;
var vx = 0;
var vy = 0;
var t = [];
var t1 = [];

socket.on('aslide', (msg) => {if (pMode) slide = msg});

function draw() {
  if (pMode) {
    socket.emit('slide','');
  }
  if (slide != lslide) {
    lslide = slide;
    ftime = true;
    frameRate(60);
    count = 0;
  }
  if (slide == 0) {slide0();} 
  else if (slide == 1) {slide1();} 
  else if (slide == 2) {slide2();} 
  else if (slide == 3) {slide3();} 
  else if (slide == 4) {slide4();} 
  else if (slide == 5 || slide == 6) {slide5();}
  else if (slide == 7) {slide6();}
  else if (slide == 8) {slide7();} 
  else if (slide == 9) {slide8();} 
  else if (slide == 10) {slide9();}
  else if (slide == 11) {slide10();}
  else if (slide == 12) {slideSwitchColors();}
  else if (slide == 13) {RamdomDrawingslide();}
  else if (slide == 14) {slidePurpleRain();}
  else if (slide == 15) {slide11();}
  else if (slide == 16) {slide12();}
  else if (slide == 17) {slide13();}
  else if (slide == 18) {slide13();}
  else {slideRandomMover();}

}

function slide0() {
  if(ftime) ftime = false;
  background(255);
  fill(0);
  rect(width/2 - 5, 0, 10, height);
  image(logo, width/4 - logo.width/2, height/2 - logo.height/2);
  textSize(64);
  text('aP', width/4 - textWidth('ap') + width/100 * 3, height/2 - 32 - height/100 * 3);
  drawConnectionInfo();
}

function slide1() {
  background (255);
  textSize(50);
  fill (0);
  rect(width/2 - 5, 0, 10, height);
  text('Index', width/4 - textWidth('Index')/2, height/6 - 32);
  textSize(32);
  text('Basic Functionality', width/4 - textWidth('Basic Functionality')/2, height/3  - 32);
  text('Advanced Functionality', width/4 - textWidth('Advanced Functionality')/2, height/2 - 32);
  text('Exemples', width/4 - textWidth('Exemples')/2, height/3 * 2 - 32);
  text('Pricing', width/4 - textWidth('Pricing')/2, height/6 * 5 - 32);
  drawConnectionInfo();
}

function slide2() {
  if (ftime) {
    ftime = false;
    x = 0;
    vx = 5;
    y = 0;
    vy = 5;
  }
  background(255);
  fill(0);
  textSize(32);
  text('Basic Functionality', width/4 - textWidth('Basic Functionality') + x, height/2 - 16);
  push();
  translate(0,-y);
  drawConnectionInfo();
  pop();
  if (y < height/7) {
    y += vy;
    return;
  }
  x += vx;
  y += vy;
  if (x > width/3) x = width/3;
  if (y > height) y = height;
}

function slide3() {
  if (ftime) {
    ftime = false;
  }
  background(0);
  fill(255);
  textSize(64);
  text('Server', width/4 - textWidth('Server')/2, height/2 - 32);
  text('Presentaion', width/2 - textWidth('Presentaion')/2, height/2 - 32);
  text('Screens', width/4 * 3 - textWidth('Screens')/2, height/2 - 32);
}

function slide4() {
  if (ftime) {
    ftime = false;
  }
  background(0);
  textSize(64);
  fill(255);
  text('Text Based Presentation Software', width/2 - textWidth('Text Based Presentation Software')/2, height/3 - 32);
  text('640', width/2 - textWidth('640')/2, height/3 * 2 - 32);
}

function slide5() {
  if (ftime) {
    ftime = false;
    x = Math.random(0, 135);
    y = Math.random(0, 135);
    count = Math.random(0, 135);
    background(0);
  }
  background(0);
  fill(255);
  textSize(64);
  text('Advantages Of Line Based Presentaion', width/2 - textWidth('Advantages Of Line Based Presentaion')/2, height/2 - 32)
  if (slide == 6) {
    textSize(64);
    fill(x,y,count);
    text('Total Freedom', width/2 - textWidth('Total Fredom')/2, height/3 * 2 - 32);
    x = Math.floor(Math.random() * 255);
    y = Math.floor(Math.random() * 255);
    count = Math.floor(Math.random() * 255);
  }
}

function slide6() {
  if(ftime) {
    ftime = false;
  }
  background(0);
  textSize(32);
  fill(255);
  text('Advanced Functionality', width/2 - textWidth('Advanced Functionality')/2, height/2 - 32);
}

function slide7() {
  if(ftime) {
    ftime = false;
    background(0);
  }
  fill(255);
  textSize(64);
  text('Pixel per Pixel by Manipulation', width/2 - textWidth('Pixel per Pixel by Manipulation')/2, height/2 - 32);
  noStroke();
  for (let i = 0; i < 10;i++) {rect(Math.floor(Math.random() * width), Math.floor(Math.random() * height), 1,1);}
  stroke(1);
}

function slide8() {
  if (ftime) {
    ftime = false;
    x = width/2 - textWidth('Movement')/2;
    y = height/2 - 16;
    vx = 5;
    vy = 5;
  }
  background(0);
  fill(255);
  textSize(64);
  text('Movement', x, y);
  if(x + vx > width - textWidth('Movement') || x + vx < 0) vx *= -1;
  if(y + vy > height || y + vy < 0) vy *= -1;
  x += vx;
  y += vy;
}

function slide9() {
  if (ftime) {
    ftime = false;
  }
  background(0);
  fill(255);
  textSize(64);
  text('Diferent Screens Different Data', width/2 - textWidth('Diferent Screens Different Data')/2, height/2 - 32);
}

function slide10() {
  if (ftime) ftime = false;
  background(0);
  fill(255);
  textSize(40);
  t = 'Reusability';
  text(t, width/4 - textWidth(t)/2, height/2 - 20);
  drawConnectionInfo();
}

function slideSwitchColors() {
  if (ftime) {
    count = 1;
    ftime = false;
    x = false;
  }
  noStroke();
  frameRate(count);
  if (x) {fill(255,0,0);} else {fill(0,0,255)};
  rect(0,0, width, height);
  //if (!x) {fill(255,0,0);} else {fill(0,0,255)};
  //rect(width/2,0,width/2, height)
  if (count < 70) {
    count++;
  }
  x = !x;
  stroke(1);
}

function RamdomDrawingslide() {
  if (ftime) {
    background(0);
    x = Math.floor(random(20, width - 20));
    y = Math.floor(random(20, height -20));
    vx = 1;
    vy = 1;
    ftime = false;
  }

  let yx = vx * random(0, 20);
  let yy = vy * random(0, 20);


  if (x + yx > width || x + yx < 0) vx *= -1;
  if (y + yy > height || y + yy < 0) vy *= -1;

  x += yx;
  y += yy;
  noStroke();
  fill(random(0,255), random(0,255), random(0,255));
  ellipse(x,y,10,20);
  stroke(1);
}

function slidePurpleRain() {
  if (ftime) {
    ftime = false;
    background(0);
    count = 0;
    fill(255);
    t=[];
    for (let a = 0; a < 200; a++) {
      let tx = random(0,width);
      let ty = random(0,height);
      t.push([tx, ty, random(-10, 10), random(0, 5)]);
      rect(tx,ty,10,10);
    }
  }
  noStroke();
  background(0);
  t.forEach((e) => {
    let tx = e[0];
    let ty = e[1];
    let vx = e[2];
    let vy = e[3];
    if (tx + vx > width || tx + vx < 0) e[2] *= -1;
    if (ty + vy > height || ty + vy < 0) e[1] = 0;
    //e[0] += e[2];
    fill(124,0,255);
    e[1] += e[3];
    rect(e[0],e[1],5,15);
  });
  stroke(1);
}

function slide11() {
  background(0);
  fill(255);
  textSize(32);
  t = "Where to get?";
  text(t, width/2 - textWidth(t)/2,height/3 - 16);
  t = "https://github.com/Andr3H3nriqu3s/AP";
  text(t, width/2 - textWidth(t)/2,height/3 * 2 - 16);
}

function slide12() {
  t = 'This is an Open Source Project!';
  background(0);
  fill(255);
  textSize(42);
  text(t, width/2 - textWidth(t)/2, height/2 - 21);
}

function slide13() {
  background(0);
  fill(255);
  textSize(42);
  t = 'Make a simple thing such as presentation magical!';
  text(t, width/2 - textWidth(t)/2, height/2 - 21);
}

function slideRandomMover() {
  if (ftime) {
    background(255);
    ftime = false;
    x = width/2;
    y = height/2;
    vx = 0;
    vy = -1;
    t = [255,255,255];
    fill(t[0],t[1],t[2]);
    rect(x,y,8,8);
  }
  fill(0);
  image(logo, width/2 - logo.width/2, height/2 - logo.height/2);
  textSize(64);
  text('aP', width/2 - textWidth('ap') + width/100 * 3, height/2 - 32 - height/100 * 3);
  noStroke();
  count = Math.floor(Math.random() * 100);
  if (count <= 25) {
    vx = 0;
    vy = (!(y < 0)) ? -1 : 2;
  } else if (count > 25 && count <= 50) {
    vx = 0;
    vy = (!(y > height)) ? 1 : -2;
  } else if (count > 50 && count <= 75) {
    vx = (!(x > width)) ? 1 : -2;
    vy = 0;
  } else if (count > 75 && count <= 100) {
    vx = (!(x < 0)) ? -1 : 2;
    vy = 0;
  }
  x += vx * 8;
  y += vy * 8;
  fill(t[0], t[1], t[2]);
  rect(x,y,8,8);
  if (t[0] < 0) {
    t[0] = 260;
    t[1] += -10;
  } else if (t[1] < -5) {
    t[0] = 260;
    t[1] = 255;
    t[2] += -15;
  } else if (t[2] < -5) {
    t[0] = 260;
    t[1] = 255;
    t[2] = 255;
  }
  t[0] += -5;
  stroke(1); 
}

function drawConnectionInfo() {
    push();
    noStroke();
    translate(width/2 + 5,  0);
    fill(255);
    rect(0,0,width/2, height);
    stroke(1);
    fill(0);
    textSize(32);
    text('Connect to Aa Wi-fi Network', width/4 - textWidth('Connect to Aa Wi-fi Network') / 2, height/6 * 2 + 16);
    text('Go to your Browser and go to google.com', width/4 - textWidth('Go to your Browser and go to google.com')/2, height/7 * 4 + 16);
    pop();
}

function keyPressed() {
  if (keyCode == 80) {
    pMode = !pMode;
  } else if (keyCode == 39 && !pMode) {
    slide++;
  } else if (keyCode == 37 && !pMode){
    slide--;
  }
  console.log(keyCode);
}

function amap(x, in_min, in_max, out_min, out_max){
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}