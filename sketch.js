/////////////////////////////////////////////////////////////////////////////////
// PoolBool v0.3.5
let p;
let renderSize = 410;

let internalSize = renderSize;

let circlesRatio = 1.2;
let colorContrast = 80;

let invVelLim = 20; // top limit in map() = size / maxVel --> its inversely proportional
let nextVelFac = 0.962; // next v = actual v * (1 - [friction as a percentage]) --> factor
  
let dm, p1, p0, prep, evltr, table, curs;

const targets = [];
const pages = [];
const btn = [];

let nav = 1;
let motion = 0;
let turn = true;
let nrTurn = 1;

// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM

function renderSetup() {
  dm.extSize();
  // DOM
}

function setup() {
  p = new Po();
  dm = new Dimension(internalSize, circlesRatio, colorContrast, invVelLim);
  
  renderSetup();
  createCanvas(dm.size, dm.size);
  createCanvas(dm.size, dm.size);
  
  noCursor();

  p1 = new Player(true);
  p0 = new Player(false);
  evltr = new Evaluator();
  table = new Table();
  curs = new DotCursor();
  
  // 0 UL, 1 UR, 2 DR, 3 DL
  for (let i = 0; i < 4; i++) {
    targets[i] = new Target(i);  
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
    if (motion == 1) prep.update();
    else if (motion == 2) {
      p1.update(nextVelFac);
      p0.update(nextVelFac);
      evltr.ballCollision();
      evltr.targetCollision(); 
      evltr.velOver();
      if (evltr.endTurn()) motion = 3;
      else motion = 2;
    } 
    else if (motion == 3) {
      if (evltr.maxScore()) nav = 9;
      else {
        for (let i = 0; i < 4; i++) {
          targets[i].update();
        }
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
    /*
    else if (btn[3].is()) nav = 6;
    else if (motion == 0 && btn[0].is()) {
      prep = new Prepare();
      motion = 1;
    }
  }
  else {
    if (btn[1].is && btn[1].wP) pages[nav].btn1();
    if (btn[2].is && btn[2].wP) pages[nav].btn2();
    if (btn[3].is && btn[3].wP) pages[nav].btn3();
  }*/
}

function mouseMoved() {
  //motion = 0; ////////////////// TEST
  //curs.mov();
}

// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
  
function test() {
  push();
  background(130);
  for (let i = 0; i < 4; i++) {
    targets[i].display();  
  }
  p1.display();
  p0.display();
  if (motion == 1) prep.display(turn);
  pop();
  p.p("FINAL:sketch.test", "  nav: ", nav, "  motion: ", motion);
  // console.log("sketch.test:" + frameCount);
}


