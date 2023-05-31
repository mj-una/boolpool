/////////////////////////////////////////////////////////////////////////////////
// PoolBool v0.3.5
let p;
let renderSize;
let internalSize = 600;

const c1 = [84, 91, 119];
const c0 = [55, 66, 89];

let circlesRatio = 1.2;
let colorContrast = 80;

let randomTargets = true;

let invVelLim = 20; // top limit in map() = size / maxVel --> its inversely proportional
let nextVelFac = 0.962; // next v = actual v * (1 - [friction as a percentage]) --> factor
  
let dm, p1, p0, prep, evltr, table, curs;

const targets = [];
const areas = [];
const pages = [];
const btn = [];

let nav = 1;
let motion = 0;
let turn = true;
let nrTurn = 1;

// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM

function renderSetup() {

  if (windowWidth > windowHeight) renderSize = Math.trunc(windowHeight);
  else renderSize = Math.trunc(windowWidth);

  document.getElementById("cont").style.backgroundColor = "rgb(66, 46, 47)";
  document.getElementById("cont").style.width = "100vw";
  document.getElementById("cont").style.height = "100vh";
  document.getElementById("cont").style.margin = "0";
  document.getElementById("cont").style.padding = "0";
  document.getElementById("cont").style.display = "flex";
  document.getElementById("cont").style.justifyContent = "center";
  document.getElementById("cont").style.alignItems = "center";
  document.getElementById("cont").style.overflow = "hidden";

  document.getElementById("defaultCanvas0").style.height = renderSize + "px";
  document.getElementById("defaultCanvas0").style.width = renderSize + "px";
  document.getElementById("defaultCanvas0").style.margin = renderSize + "px";
  
}

function setup() {

  p = new Po();
  dm = new Dimension(internalSize, circlesRatio, colorContrast, invVelLim);
  
  createCanvas(dm.size, dm.size);
  renderSetup();
  
  noCursor();
  colorMode(RGB, 255);

  p1 = new Player(true);
  p0 = new Player(false);
  evltr = new Evaluator();
  table = new Table();
  curs = new DotCursor();
  
  // 0 UpLeft, 1 UpRight, 2 DownRright, 3 DownLeft
  for (let i = 0; i < 4; i++) {
    targets[i] = new Target(i);  
  }

  // 0 UpLeft, 1 UpRight, 2 DownRright, 3 DownLeft
  for (let i = 0; i < 4; i++) {
    areas[i] = new Area(i);  
  }
  
  // 0 intro, 1 game, 2 menu, 3 info2, 4 opc2, 5 tutor, 6 info1, 7 opc1*, 8 opc1, 9 vict
  for (let i = 0; i < 10; i++) { 
    pages[i] = new Page(i);
  } 
  
  // 0 all, 1 central, 2 left, 3 right
  for (let i = 0; i < 4; i++) {
    btn[i] = new Buton(i);
  }

  p.p("INIT:setup.test");
}

// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM

function draw() {
  
  if (nav == 1) {
    evltr.turn(turn);
    if (motion == 1) prep.update();
    else if (motion == 2) {
      p1.update(nextVelFac);
      p0.update(nextVelFac);
      evltr.ballCollision();
      for (let i = 0; i < 4; i++) {
        targets[i].collision(i, targets[i].x, targets[i].y);
      }
      evltr.velOver();
      if (evltr.endTurn()) motion = 3;
      else motion = 2;
    } 
    else if (motion == 3) {
      if (evltr.maxScore()) nav = 9;
      else {
        for (let i = 0; i < 4; i++) {targets[i].update(i);}
      }
      motion = 0;
      turn = !turn;
      nrTurn++;
    }
    table.display();
    if (motion == 1) prep.display(turn);
    btn[2].display(nav);
    btn[3].display(nav);
  }
  else {
    pages[nav].display();
  }
  test();
  curs.display();
}

// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM

function mousePressed() {
  if (nav == 1) {
    if (motion == 0 && evltr.isBtn(0)) {
      prep = new Prepare();
      motion = 1;
    }
  }
    
}

function mouseReleased() { 
  if (nav == 1) {
    if (motion == 1) {
      if (prep.cancel) motion = 0;
      else {
        prep.defShot(turn);
        motion = 2;
      }
    }
  }
}

function mouseMoved() {
  curs.mov();
}

function windowResized() {
    renderSetup();
    resizeCanvas(renderSize, renderSize);
    setup();
  }

// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
  
function test() {
  push();
  background(92, 137, 132);
  for (let i = 0; i < 4; i++) {
    targets[i].display(targets[i].x, targets[i].y);
    // p.p(targets[i].x, targets[i].y);
  }
  p1.display(c1);
  p0.display(c0);
  if (motion == 1) prep.display(turn);
  pop();
  p.p("FINAL:sketch.test", "  nav: ", nav, "  motion: ", motion);
  // console.log("sketch.test:" + frameCount);
}


